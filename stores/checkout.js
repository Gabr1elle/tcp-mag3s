import { useStoreApp } from './app';
import { useStoreIncentive } from './incentive';

export const useStoreCheckout = defineStore('storeCheckout', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			packages: [],
			packageLoading: false,
			packageChosen: {
				id: null,
				isPopularProduct: false,
				image: '',
				price: '',
				qtd: null,
				items: [],
			},
			packageChosenOB: {
				id: null,
				isPopularProduct: false,
				image: '',
				price: '',
				items: [],
			},
			selectedOB: null,
			showingSteps: false,
			steps: [
				{ step: 1, label: 'Cadastro/Login', complete: false },
				{ step: 2, label: 'Pagamento', complete: false },
				{ step: 3, label: 'Confirmação', complete: false },
			],
			progressPurchaseStatus: 0,
			formRegister: {
				// Parte 1
				email: '',
				password: '',
				confirmPassword: '',
				terms: false,

				// Parte 2
				name: '',
				phone: '',
				cpf: '',
				loading: false,

				// payment
				optionsPayment: [
					{
						showing: true,
						value: 501,
						label: 'Pix',
						icon: 'i-ic-round-pix',
						path: '/checkout/pix',
					},
					{
						showing: true,
						value: 301,
						label: 'Cartão de crédito',
						icon: 'i-ic-baseline-credit-card',
						path: '/checkout/cartao',
					},
				],
				configPayment: {
					labelButton: '',
					choicePathTo: null,
				},
				creditCard: {
					number: '',
					name: '',
					validity: '',
					cvv: '',
					status: null,
				},

				// simple payment
				configSimplePayment: {
					labelButton: '',
					processPayment: false,
				},
				selectedPayment: null,
				paymentPix: null,
				feedbackPayment: null,
				isOpenModalCreditCardRemove: false,
			},
		};
	},

	getters: {
		// Form CreditCard
		hasCardCreditRegister: (state) => {
			const storeIncentive = useStoreIncentive();
			return storeIncentive.userAcountData.paymentMethods.status;
		},

		// Value Order Bump Price
		diferencePriceOrderBump: (state) => {
			const price = state.packageChosenOB.price - state.packageChosen.price;

			return price.toLocaleString('pt-br', {
				style: 'currency',
				currency: 'BRL',
				currencyDisplay: 'symbol',
			});
		},

		// Value package with multiple amount
		pricePackageMultipleAmout: (state) => {
			const price = state.packageChosen.price * state.packageChosen.qtd;

			return price.toLocaleString('pt-br', {
				style: 'currency',
				currency: 'BRL',
				currencyDisplay: 'symbol',
			});
		},

		// Qtd Tickets purchese simple
		qtdTicketsSimplePurchase: (state) => {
			if (state.packageChosen.qtd === 1) {
				return `${state.packageChosen.qtd} Ticket`;
			} else {
				return `${state.packageChosen.qtd} Tickets`;
			}
		},
	},

	actions: {
		// Loja
		async storePackages(useToast) {
			if (this.packages.length) return;
			const app = useStoreApp().contentApp;
			const toast = useToast();
			const { ApiIncentiveSystemContents } = useRuntimeConfig().public;

			this.packageLoading = true;
			try {
				const data = await $fetch(`${ApiIncentiveSystemContents}store`, {
					method: 'get',
					headers: {
						Authorization: `Bearer ${useCookie('tokenClient').value}`,
					},
				});

				// Obtendo o produto mais popular
				const prices = data[0].content.map((price) => price.price);
				const popularProduct = searchValuePopular(prices);

				// Obtendo a lista dos pacotes formatados a serem vendidos
				data[0].content.forEach((item, index) => {
					const hasPopularProduct = popularProduct === item.price;

					this.packages.push({
						id: item.id,
						isPopularProduct: hasPopularProduct,
						image: app.purchase_tables_images_list.list[index]
							? app.purchase_tables_images_list.list[index].one
							: '',
						qtd: 1,
						price: item.price,
						items: [
							{
								qtd: item.baseContent.amount,
								name: item.baseContent.name,
								description: item.baseContent.description,
							},
						],
					});
				});

				// Caso a aplicação seja uma rifa, escolher o único pacote
				if (app.config_will_have_raffle) {
					this.chosenPackage(this.packages[0].id);
					this.packageChosen.qtd = +app.purchase_tables_images_list.list[0].two;
				}
			} catch (error) {
				toast.add({
					id: 'error_client_token',
					title: `Opss... Algo de errado aconteceu!`,
					description: `${error}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}
			this.packageLoading = false;
		},

		// Compra do pacote escolhido
		purchasePackage(IDpkgChosen, IDpkgOB, pathTo) {
			this.chosenPackage(IDpkgChosen);
			this.packageOB(IDpkgOB);

			navigateTo({
				path: pathTo,
				query: {
					idPkg: IDpkgChosen,
					idOB: IDpkgOB ? IDpkgOB : '',
				},
			});
		},

		// Troca do pacote escolhido
		changePackage(idPkg, idPkgOB) {
			if (this.selectedOB) {
				this.packageChosen = this.packages.find((item) => item.id === idPkgOB);
			} else {
				this.packageChosen = this.packages.find((item) => item.id === idPkg);
			}
		},

		// escolha do pacote
		chosenPackage(id) {
			this.packageChosen = this.packages.find((item) => item.id === id);
		},

		// pacote do order bump
		packageOB(id) {
			this.packageChosenOB = id
				? this.packages.find((item) => item.id === id)
				: {
						id: null,
						isPopularProduct: false,
						image: '',
						price: '',
						items: [],
				  };
		},

		// Progresso da compra
		progressPurchase(stepsMod, progress, showStep) {
			this.steps.forEach((item, index) => {
				if (item.step === stepsMod[index].step) {
					item.complete = stepsMod[index].complete;
				}
			});

			this.progressPurchaseStatus = progress;
			this.showingSteps = showStep;
		},

		// Função resonsárvel por realizar o próximo passo do pagamento simplificado apenas no pix
		async purchaseOnlyPaymentMethod(IDpkgChosen, IDpkgOB, pathTo, newLabel) {
			const app = useStoreApp().contentApp;
			const storeIncentive = useStoreIncentive();
			const toast = useToast();

			// Caso tenha cartão de crédito habilitado no admin
			if (
				app.config_will_have_credit_card_payments ||
				!storeIncentive.userLoggedIn
			) {
				this.purchasePackage(IDpkgChosen, IDpkgOB, pathTo);
				return;
			}

			this.formRegister.configSimplePayment.processPayment = true;

			try {
				this.formRegister.selectedPayment = 501;
				this.formRegister.configSimplePayment.labelButton =
					'Aguarde o processamento';
				this.changeMethodPayment(this.formRegister.optionsPayment[0]);
				await this.paymentMethod(
					useToast,
					IDpkgChosen,
					IDpkgOB,
					this.formRegister.configPayment.choicePathTo
				);
			} catch (error) {
				toast.add({
					id: 'error_PaymentPixProcess',
					title: `Atenção!`,
					description: error,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}

			this.formRegister.configSimplePayment.labelButton = newLabel;
			this.formRegister.configSimplePayment.processPayment = false;
		},

		// Registro de Email
		async registerEmail(useToast, IDpkgChosen, IDpkgOB, pathTo) {
			const toast = useToast();
			this.formRegister.loading = true;

			const {
				ApiIncentiveSystemIdentity,
				ApiIncentiveClientId,
				ApiIncentiveClientSecret,
			} = useRuntimeConfig().public;
			const influencerCode = getCookie('influencerCode');

			try {
				const data = await $fetch(
					`${ApiIncentiveSystemIdentity}account/user/email`,
					{
						method: 'post',
						body: {
							clientId: ApiIncentiveClientId,
							clientSecret: ApiIncentiveClientSecret,
							userInfo: this.formRegister.email,
							password: this.formRegister.password,
							referral: influencerCode,
						},
						headers: {
							Authorization: `Bearer ${useCookie('tokenClient').value}`,
						},
					}
				);

				const cookieAuth = useCookie('tokenUser', {
					maxAge: +data.expires_in,
					sameSite: 'lax',
					httpOnly: false,
				});
				cookieAuth.value = data.access_token;

				this.purchasePackage(IDpkgChosen, IDpkgOB, pathTo);

				// Resetando dados do formulário assim que o cadastro for feito.
				this.formRegister.email = '';
				this.formRegister.password = '';
				this.formRegister.confirmPassword = '';
				this.formRegister.terms = false;
			} catch (error) {
				toast.add({
					id: 'error_getContentAppLoginUser',
					title: `${
						enumsResponseServer(error.response._data.request.code).title
					}`,
					description: `${
						enumsResponseServer(error.response._data.request.code).message
					}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}

			this.formRegister.loading = false;
		},

		// Registro de Nome, Telefone e CPF
		async registerOthersDatas(useToast, IDpkgChosen, IDpkgOB, pathTo) {
			const toast = useToast();
			this.formRegister.loading = true;

			const { ApiIncentiveSystemIdentity } = useRuntimeConfig().public;

			try {
				// Nome
				await $fetch(`${ApiIncentiveSystemIdentity}account/user/details`, {
					method: 'post',
					body: {
						name: this.formRegister.name,
						occupation: 'Sem Ocupação',
						monthlyIncome: '0',
					},
					headers: {
						Authorization: `Bearer ${useCookie('tokenUser').value}`,
					},
				});

				// Telefone
				await $fetch(`${ApiIncentiveSystemIdentity}account/user/phone`, {
					method: 'post',
					body: {
						phoneNumber: this.formRegister.phone.replace(/\D/g, ''),
						phoneType: 'Mobile',
						countryCode: 55,
					},
					headers: {
						Authorization: `Bearer ${useCookie('tokenUser').value}`,
					},
				});

				// CPF
				await $fetch(`${ApiIncentiveSystemIdentity}account/user/document`, {
					method: 'post',
					body: {
						documentType: 102,
						documentNumber: this.formRegister.cpf,
					},
					headers: {
						Authorization: `Bearer ${useCookie('tokenUser').value}`,
					},
				});

				this.purchaseOnlyPaymentMethod(
					IDpkgChosen,
					IDpkgOB,
					pathTo,
					'continuar para pagamento'
				);
			} catch (error) {
				toast.add({
					id: 'error_getContentAppLoginUser',
					title: `${
						enumsResponseServer(error.response._data.request.code).title
					}`,
					description: `${
						enumsResponseServer(error.response._data.request.code).message
					}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}

			this.formRegister.loading = false;
		},

		// Escolha do Método de Pagamento
		changeMethodPayment(method) {
			this.formRegister.configPayment.labelButton = `pagar com ${method.label}`;
			this.formRegister.configPayment.choicePathTo = method.path;
		},
		async paymentMethod(useToast, IDpkgChosen, IDpkgOB, pathTo) {
			// Caso a forma de pagamento não tenha sido selecionada
			if (!this.formRegister.selectedPayment) {
				const toast = useToast();
				toast.add({
					id: 'error_selectedPayment',
					title: `Atenção`,
					description: `Forma de pagamento não selecionada`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
				return;
			}

			if (this.formRegister.selectedPayment === 301) {
				// Caso o método seja cartão
				this.formRegister.selectedPayment = null;

				// Caso o usuário já possui cartão cadastrado, finalizar a compra direto
				if (this.hasCardCreditRegister) {
					return this.paymentCreditCard(
						useToast,
						IDpkgChosen,
						IDpkgOB,
						'/checkout/feedback',
						true,
						'escolha antes de continuar...'
					);
				} else {
					return this.purchasePackage(IDpkgChosen, IDpkgOB, pathTo);
				}
			}

			// Caso o método seja Pix
			if (this.formRegister.selectedPayment === 501) {
				await this.paymentPix(useToast, IDpkgChosen, IDpkgOB, pathTo);
			}
		},

		// Adicioando quantidade em um pacote (Compra Simplificada)
		setQtdPackageChosen(typeOperation, qtdAdd, clear) {
			if (clear) this.packageChosen.qtd = 0;

			this.changePackagePerQtd();

			switch (typeOperation) {
				case 'sub':
					if (+this.packageChosen.qtd > 5) {
						this.packageChosen.qtd = +this.packageChosen.qtd - qtdAdd;
						return;
					}
					this.packageChosen.qtd = qtdAdd;
					break;
				case 'add':
					if (+this.packageChosen.qtd < 995) {
						this.packageChosen.qtd = +this.packageChosen.qtd + qtdAdd;
						return;
					}
					this.packageChosen.qtd = qtdAdd;
					break;
			}
		},

		changePackagePerQtd() {
			let packageOnly = this.packages[0];

			// Se um usuário tiver mais que 200 números da sorte utilizar o id do produto mais barato
			if (this.packageChosen.qtd >= 200) {
				packageOnly = this.packages[1];
			}

			this.chosenPackage(packageOnly.id);
		},

		// Pagamento via Pix
		async paymentPix(useToast, IDpkgChosen, IDpkgOB, pathTo) {
			const toast = useToast();
			this.formRegister.configPayment.labelButton = `Aguarde o processamento`;
			this.formRegister.loading = true;

			const { ApiIncentiveSystemContents } = useRuntimeConfig().public;
			const influencerCode = getCookie('influencerCode');

			try {
				const data = await $fetch(
					`${ApiIncentiveSystemContents}store/content/${this.packageChosen.id}`,
					{
						method: 'post',
						body: {
							amount: +this.packageChosen.qtd,
							paymentType: 501,
							referral: influencerCode,
						},
						headers: {
							Authorization: `Bearer ${useCookie('tokenUser').value}`,
						},
					}
				);

				this.formRegister.paymentPix = {
					qrCode: `data:image/png;base64, ${data.paymentMessage}`,
					copyPaste: data.paymentCode,
				};

				this.purchasePackage(IDpkgChosen, IDpkgOB, pathTo);
			} catch (error) {
				console.log(error);
				toast.add({
					id: 'error_PaymentPix',
					title: `${
						enumsResponseServer(error.response._data.request.code).title
					}`,
					description: `${
						enumsResponseServer(error.response._data.request.code).message
					}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});

				throw new Error(error);
			}

			this.formRegister.loading = false;
			this.formRegister.selectedPayment = null;
		},

		// Cadastrar Cartão de Crédito
		async registerCreditCard(useToast) {
			const storeIncentive = useStoreIncentive();
			const toast = useToast();
			this.formRegister.configPayment.labelButton = `Cadastrando cartão, aguarde`;
			this.formRegister.loading = true;

			const { ApiIncentiveSystemIdentity } = useRuntimeConfig().public;

			try {
				await $fetch(`${ApiIncentiveSystemIdentity}account/user/payment`, {
					method: 'post',
					body: {
						brand: 'Visa',
						number: this.formRegister.creditCard.number,
						holder: this.formRegister.creditCard.name,
						expDate: this.formRegister.creditCard.validity,
						code: this.formRegister.creditCard.cvv,
						paymentOperator: 'brazil_nix',
						paymentType: '301',
					},
					headers: {
						Authorization: `Bearer ${useCookie('tokenUser').value}`,
					},
				});

				toast.add({
					id: 'credit_card_register_success',
					color: `green`,
					title: `Tudo certo!`,
					description: `Cartão cadastrado com sucesso.`,
					icon: 'i-ic-baseline-check',
					timeout: 3500,
				});
			} catch (error) {
				console.log(error);
				toast.add({
					id: 'error_Register_CreditCard',
					title: `${
						enumsResponseServer(error.response._data.request.code).title
					}`,
					description: `${
						enumsResponseServer(error.response._data.request.code).message
					}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}

			// Obter os dados do usuário
			storeIncentive.userAcountData.loading = false;
			await storeIncentive.userAccount(useToast);

			this.formRegister.loading = false;
		},

		// Deletar Cartão de Crédito cadastrado
		async deleteCreditCard(useToast) {
			const storeIncentive = useStoreIncentive();
			const toast = useToast();
			this.formRegister.loading = true;

			const { ApiIncentiveSystemIdentity } = useRuntimeConfig().public;

			try {
				await $fetch(
					`${ApiIncentiveSystemIdentity}account/user/payment/${storeIncentive.userAcountData.paymentMethods.id}`,
					{
						method: 'delete',
						headers: {
							Authorization: `Bearer ${useCookie('tokenUser').value}`,
						},
					}
				);

				this.formRegister.creditCard = {
					number: '',
					name: '',
					validity: '',
					cvv: '',
					status: null,
				};

				toast.add({
					id: 'credit_card_remove_success',
					color: `green`,
					title: `Tudo certo!`,
					description: `Cartão excluído com sucesso.`,
					icon: 'i-ic-baseline-check',
					timeout: 3500,
				});

				// Obtendo os dados do usuário
				storeIncentive.userAcountData.loading = false;
				await storeIncentive.userAccount(useToast);
			} catch (error) {
				console.log(error);
				toast.add({
					id: 'error_Remove_CreditCard',
					title: `${
						enumsResponseServer(error.response._data.request.code).title
					}`,
					description: `${
						enumsResponseServer(error.response._data.request.code).message
					}`,
					color: 'red',
					icon: 'i-material-symbols-warning-outline-rounded',
					timeout: 3500,
				});
			}

			this.formRegister.isOpenModalCreditCardRemove = false;
			this.formRegister.loading = false;
		},

		// Pagamento via Cartão de Crédito
		async paymentCreditCard(
			useToast,
			IDpkgChosen,
			IDpkgOB,
			pathTo,
			willHavePurchese,
			newLabel
		) {
			const storeIncentive = useStoreIncentive();
			const toast = useToast();

			// Caso não tenha cartão cadastrado, cadastrar um novo
			if (!storeIncentive.userAcountData.paymentMethods.status) {
				try {
					await this.registerCreditCard(useToast);
				} catch (error) {
					return error;
				}
			}

			if (willHavePurchese) {
				this.formRegister.configPayment.labelButton = `Aguarde o processamento`;
				this.formRegister.loading = true;

				const { ApiIncentiveSystemContents } = useRuntimeConfig().public;
				const influencerCode = getCookie('influencerCode');

				try {
					const data = await $fetch(
						`${ApiIncentiveSystemContents}store/content/${this.packageChosen.id}`,
						{
							method: 'post',
							body: {
								amount: +this.packageChosen.qtd,
								paymentMethodType: 'CreditCard',
								userPaymentMethodId:
									storeIncentive.userAcountData.paymentMethods.id,
								paymentType: 301,
								referral: influencerCode,
							},
							headers: {
								Authorization: `Bearer ${useCookie('tokenUser').value}`,
							},
						}
					);

					this.showFeedback(IDpkgChosen, IDpkgOB, pathTo, 'credit-card');
				} catch (error) {
					toast.add({
						id: 'error_PaymentCardCredit',
						title: `${enumsResponseServer(error.response._data.code).title}`,
						description: `${
							enumsResponseServer(error.response._data.code).message
						}`,
						color: 'red',
						icon: 'i-material-symbols-warning-outline-rounded',
						timeout: 3500,
					});
				}

				this.formRegister.loading = false;
				this.formRegister.configPayment.labelButton = newLabel;
			} else {
				this.formRegister.configPayment.labelButton = `salvar cartão`;
			}
		},

		// Feedback de pagamento
		showFeedback(IDpkgChosen, IDpkgOB, pathTo, typePayment) {
			this.formRegister.feedbackPayment = typePayment;

			this.purchasePackage(IDpkgChosen, IDpkgOB, pathTo);
		},

		// Finalizar compra
		finishPurchase() {
			const app = useStoreApp().contentApp;
			const incentive = useStoreIncentive();

			// Resetando o loading do inventário para solicitar novamente os dados atualizados
			incentive.inventory.loading = false;

			setTimeout(() => {
				this.formRegister.feedbackPayment = null;
			}, 5000);

			setTimeout(() => {
				// Caso a aplicação seja uma rifa, finalizar a compra voltando para a quantidade de pacotes inicial
				if (app.config_will_have_raffle) {
					this.packageChosen.qtd = +app.purchase_tables_images_list.list[0].two;
				}
			}, 500);

			navigateTo('/app/hub');
		},
	},
});
