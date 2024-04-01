export const booleanToString = (value) => {
	if (value === true) {
		return 'on';
	} else if (value === false) {
		return 'null';
	}

	return value;
};

export function doesCookieExist(name) {
	// Get all cookies in a string
	const cookies = document.cookie;

	// Split the cookie string into key-value pairs
	const pairs = cookies.split(';');

	// Iterate over the pairs to check if the desired cookie exists
	for (let i = 0; i < pairs.length; i++) {
		const pair = pairs[i].trim(); // Remove leading and trailing whitespaces

		// Check if the cookie name is present at the beginning of the pair
		if (pair.indexOf(name + '=') === 0) {
			return true; // The cookie exists
		}
	}

	return false; // The cookie was not found
}

export function getCookie(name) {
	// Split the cookies string into an array
	const cookies = document.cookie.split(';');

	// Loop through each cookie
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();

		// Check if the cookie starts with the desired name
		if (cookie.startsWith(`${name}=`)) {
			// Return the value of the cookie
			return cookie.substring(name.length + 1);
		}
	}

	// Return null if the cookie is not found
	return null;
}

export function generateRandomNumber(maximum) {
	// Math.random() generates a number between 0 (inclusive) and 1 (exclusive)
	// We multiply it by the maximum value and use Math.floor() to round down
	return Math.floor(Math.random() * (maximum + 1));
}

// Mensagens padrões de resposta do servidor externo de incentivo
export function enumsResponseServer(code) {
	switch (code) {
		case 'Unknown':
			return {
				title: 'Ops, algo deu errado!',
				message: 'Verifique com o administrador do sistema.',
			};

		case 'UsernameAlreadyInUse':
			return {
				title: 'Ops, algo deu errado!',
				message: 'Este usuário já está em uso, tente outro e-mail.',
			};

		case 'UsernameAndPasswordRequired':
			return {
				title: 'Ops, algo deu errado!',
				message: 'Usuário ou senha inválidos.',
			};

		case 'InvalidEmail':
			return {
				title: 'Ops, algo deu errado!',
				message: 'Digite um E-mail válido.',
			};

		case 'InvalidPhone':
			return {
				title: 'Ops, algo deu errado!',
				message: 'Número de telefone inválido.',
			};

		case 'PhoneAlreadyInUse':
			return {
				title: 'Ops, algo deu errado!',
				message: 'Número de telefone já existe, tente outro.',
			};

		case 'DocumentAlreadyInUse':
			return {
				title: 'Ops, algo deu errado!',
				message: 'Número de CPF já cadastrado, tente outro.',
			};

		case 'InvalidDocument':
			return {
				title: 'Ops, algo deu errado!',
				message: 'Número de CPF inválido.',
			};

		case 'General':
			return {
				title: 'Ops, algo deu errado!',
				message: 'A senha é muito curta.',
			};

		case 'TokenNotCreated':
			return {
				title: 'Ops, algo deu errado!',
				message: 'Erro do Operador de Pagamento.',
			};

		case 'InvalidExpirationDate':
			return {
				title: 'Ops, algo deu errado!',
				message: 'Data de validade inválida, use "MM/AAAA"',
			};

		case 'PaymentAborted':
			return {
				title: 'Ops, algo deu errado!',
				message:
					'Houve um problema para finalizar o pagamento, tente novamente mais tarde!',
			};

		case 'Exception':
			return {
				title: 'Erro no operador de pagamento!',
				message:
					'O método de pagamento ou operador não foram configurados, contate o Administrador do Sistema!',
			};

		case 'UserNotFound':
			return {
				title: 'Ops, algo deu errado!',
				message: 'Usuário não encontrado, tente outro e-mail!',
			};

		default:
			return {
				title: 'Ops, algo deu errado!',
				message: 'Verifique com o administrador do sistema.',
			};
	}
}

// Menu scroll para mudar seu estilo
export function headerScrollStyle(idHeader, scrollDistance, animate) {
	let menu = document.getElementById(idHeader);

	window.addEventListener('scroll', function () {
		if (!menu) {
			return;
		}

		if (window.scrollY >= scrollDistance) {
			menu.classList.add('has-bg-color');
			menu.classList.add(animate);
		} else {
			menu.classList.remove('has-bg-color');
			menu.classList.remove(animate);
		}
	});
}

// Função usada para retornar qual é o valor do produto popular
export function searchValuePopular(numbers) {
	// Sort the array in ascending order
	const sortedNumbers = numbers.sort((a, b) => a - b);

	// The middle number will be the second element of the sorted array
	const middleNumber = sortedNumbers[1];

	return middleNumber;
}

// Cookie User Token Access
export const useTokenUser = () => useCookie('tokenUser', { /* shared options */ })

// Config Meta Pixel Code
export function initMetaPixelCode(instance, idCode) {
	instance.setPixelId(idCode);
	instance.enable();
}
