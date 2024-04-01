export const switchTextToBoolean = (value) => {
	if (String(value) === '1') {
		return true;
	} else if (String(value) === '0') {
		return false;
	}

	return value;
};

export const switchInputTextBoolean = (value) => {
	if (String(value).toUpperCase() === 'ON') {
		return '1';
	}

	return '0';
};

// check only text
export const hasOnlyText = /^[A-Za-z]+( [A-Za-z]+)*$/;

// First Letter Upercase in String
export function toLetterFisrtUperCase(str) {
	return str
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

// [0]: text, [1]: link, [2]: color, [3]: archive, [4]: icon, [5]: datatime, [6]: boolean, [7]: json
const { typesMedia } = useRuntimeConfig();

export const listSchemaDataMedia = [
	// Config
	{
		name: 'config_will_have_hotsite',
		description:
			'Utilizado para exibir a primeira página da aplicação, que será a landing page e outros elementos que só possuem no hotsite',
		value: '0',
		tag: 'config',
		type: typesMedia[6],
	},
	{
		name: 'config_will_have_raffle',
		description:
			'Utilizado para exibir elementos que só possuem em sites de rifas.',
		value: '0',
		tag: 'config',
		type: typesMedia[6],
	},
	{
		name: 'config_will_have_scratch_card',
		description:
			'Utilizado para exibir elementos que só fazem parte da raspadinha.',
		value: '1',
		tag: 'config',
		type: typesMedia[6],
	},
	{
		name: 'config_will_have_freemium_purchase',
		description:
			'Utilizado para exibir a opção de cadastramento sem a aquisição de um pacote (Freemium).',
		value: '1',
		tag: 'config',
		type: typesMedia[6],
	},
	{
		name: 'config_will_have_image_brand_session_hotsite',
		description:
			'Utilizado para exibir ou não a imagem da marca no conteúdo das telas da aplicação',
		value: '0',
		tag: 'config',
		type: typesMedia[6],
	},
	{
		name: 'config_text_email_contact',
		description: 'E-mail de contato e suporte.',
		value: 'falae@campanhapromocional.com.br',
		tag: 'config',
		type: typesMedia[0],
	},
	{
		name: 'config_will_email_contact',
		description: 'Utilizado para exibir ou não o e-mail de contato e suporte',
		value: '1',
		tag: 'config',
		type: typesMedia[6],
	},
	{
		name: 'config_text_phone_contact',
		description: 'Telefone de contato.',
		value: '(11) 91221 3445',
		tag: 'config',
		type: typesMedia[0],
	},
	{
		name: 'config_will_phone_contact',
		description:
			'Utilizado para exibir ou não o número de telefone de contato do WhatsApp',
		value: '1',
		tag: 'config',
		type: typesMedia[6],
	},
	{
		name: 'config_meta_pixel_code_id',
		description: 'ID utilizado na configuração e importação do Meta Pixel Code do Facebook.',
		value: '',
		tag: 'config',
		type: typesMedia[0],
	},
	{
		name: 'config_maintenance_will_have_app',
		description:
			'Utilizado para exibir a página de manutenção do site.',
		value: '0',
		tag: 'config',
		type: typesMedia[6],
	},
	{
		name: 'config_maintenance_text_description',
		description: 'Título/Descrição da página de manutanção da aplicação.',
		value: '<br>Estamos temporariamente fora do ar para atualizações e melhorias. <br>Fique tranquilo, voltaremos em breve, melhor do que nunca!',
		tag: 'config',
		type: typesMedia[0],
	},
	{
		name: 'config_meta_tags_page_seo_title',
		description: 'Título do site que aparece no title da página de toda a aplicação',
		value: 'Super Promo | Campanha de Incentivo - Mag3s Tecnologia',
		tag: 'config',
		type: typesMedia[0],
	},
	{
		name: 'config_meta_tags_page_seo_description',
		description: 'Descrição do site que aparece nas pesquisas de página de toda a aplicação',
		value: 'Descubra como nossa campanha de incentivo pode impulsionar a motivação e o desempenho da sua equipe. Oferecemos um template eficaz para criar uma campanha personalizada que recompensa e reconhece o esforço dos colaboradores, impulsionando o sucesso da sua empresa.',
		tag: 'config',
		type: typesMedia[0],
	},
	{
		name: 'config_meta_tags_page_seo_og_url',
		description: 'Link de OG para SEO',
		value: 'https://mag3s.com',
		tag: 'config',
		type: typesMedia[1],
	},
	{
		name: 'config_meta_tags_page_seo_favicon',
		description: 'Imagem de Favicon para SEO do site',
		placeholder: '/favicon.png',
		tag: 'config',
		type: typesMedia[3],
	},
	{
		name: 'config_meta_tags_page_seo_og_image',
		description: 'Imagem de OG para SEO',
		placeholder: '/og-image.png',
		tag: 'config',
		type: typesMedia[3],
	},

	// Brand
	{
		name: 'brand_image_one',
		description: 'Imagem do logo na página de carregamento.',
		placeholder: '/imgs/img_fiel_da_sorte.png',
		tag: 'brand',
		type: typesMedia[3],
	},
	{
		name: 'brand_image_two',
		description: 'Imagem do logo presente dentro do footer na página Hub.',
		placeholder: '/imgs/fiel.png',
		tag: 'brand',
		type: typesMedia[3],
	},
	{
		name: 'brand_image_three',
		description: 'Imagem principal da página de carregamento.',
		placeholder: '/imgs/img_loading.png',
		tag: 'brand',
		type: typesMedia[3],
	},
	{
		name: 'brand_image_session',
		description: 'Imagem de destaque do banner utilizado nas seções do site.',
		placeholder: '/imgs/lp/landing_cover_image.png',
		tag: 'brand',
		type: typesMedia[3],
	},

	// Login/Checkout
	{
		name: 'layout_background_colors_app_two',
		description: 'Cor de fundo utilizado em: login, checkout, etc..',
		value: '#FFBE00',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'layout_background_app_two',
		description: 'Imagem de fundo utilizado em: login, checkout, etc..',
		placeholder: '/imgs/lp/cover_banner_3.png',
		tag: 'login/checkout',
		type: typesMedia[3],
	},
	{
		name: 'layout_background_app_mobile_two',
		description:
			'Imagem de fundo versão mobile utilizado em: login, checkout, etc..',
		placeholder: '/imgs/lp/cover_banner_mobile_3.png',
		tag: 'login/checkout',
		type: typesMedia[3],
	},
	{
		name: 'login_text_title',
		description: 'Título da tela de login',
		value: 'Bem-vindo de volta!',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'purchase_tables_text_title',
		description: 'Título da tela de tabela de pacotes/preços',
		value: 'Escolha o seu pacote:',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'purchase_tables_text_description',
		description: 'Descrição da tela de tabela de pacotes/preços',
		value:
			'<strong>Lembre-se:</strong> Você pode comprar pacotes quando quiser! Quanto mais números da sorte você tiver no dia do sorteio, mais chances vai ter de ganhar. ;)',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'purchase_tables_images_list',
		description:
			'Lista das imagens dos pacotes e seus respectivos textos descritivos',
		value:
			'{"list":[{"one": "", "two": "pacote básico", "type": "archive"}, {"one": "", "two": "mais popular", "type": "archive"}, {"one": "", "two": "pacote premium", "type": "archive"}]}',
		tag: 'login/checkout',
		type: typesMedia[7],
	},
	{
		name: 'purchase_tables_text_title_qtd_order_bump',
		description:
			'Título da quantidade de vezes do card que é representado pelo order bump de escolha do pacote pelo usuário',
		value: '2x',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'purchase_tables_text_title_order_bump',
		description:
			'Título do card que é representado pelo order bump de escolha do pacote pelo usuário',
		value: 'Super Oferta!',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'purchase_tables_text_description_order_bump',
		description:
			'Descrição do card que é representado pelo order bump de escolha do pacote pelo usuário',
		value:
			'Receba o <strong>DOBRO</strong> de raspadinhas e o <strong>DOBRO</strong> de números da sorte por um adicional de apenas',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'purchase_tables_text_checkbox_order_bump',
		description:
			'Descrição para o checkbox do card que é representado pelo order bump de escolha do pacote pelo usuário',
		value: 'Sim, eu quero!',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'purchase_tables_background_colors_order_bump',
		description:
			'Cor de fundo do card que é representado pelo order bump de escolha do pacote pelo usuário',
		value: '#FFFFFF',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'purchase_tables_background_colors_order_bump_two',
		description:
			'Cor de fundo do texto de destaque que é representado pelo order bump de escolha do pacote pelo usuário',
		value: '#00F919',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'purchase_tables_text_colors_order_bump',
		description:
			'Cor de texto do card que é representado pelo order bump de escolha do pacote pelo usuário',
		value: '#061049',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'purchase_tables_text_colors_popular_product',
		description: 'Cor de texto do badge que destaca o produto mais popular',
		value: '#FFFFFF',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'purchase_tables_background_colors_package',
		description:
			'Cor de fundo do card que é representado pelo pacote a ser adiquirido pelo usuário',
		value: '#FFFFFF',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'purchase_tables_text_colors_package',
		description:
			'Cor de texto do card que é representado pelo pacote a ser adiquirido pelo usuário',
		value: '#061049',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'purchase_tables_background_colors_popular_product',
		description: 'Cor de fundo do badge que destaca o produto mais popular',
		value: '#00F919',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'layout_text_colors_login_and_checkout',
		description: 'Cor de texto da tela de login',
		value: '#061049',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'layout_colors_pregress_bar_bg_checkout',
		description:
			'Cor de fundo da barra de prograsso das etapas de compra do checkout',
		value: '#de9e00',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'layout_colors_pregress_bar_colorbase_checkout',
		description: 'Cor da barra de prograsso das etapas de compra do checkout',
		value: '#00F919',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'purchase_tables_colors_text_simple_package',
		description: 'Cor de texto para aquisição simples de pacote',
		value: '#FFFFFF',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'purchase_tables_colors_text_simple_package_dark',
		description:
			'Cor de texto para aquisição simples de pacote para fundos claros',
		value: '#061049',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'purchase_tables_colors_input_simple_package',
		description: 'Cor de estilo do input para aquisição simples de pacote',
		value: '#00F919',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'purchase_tables_colors_background_input_simple_package',
		description: 'Cor de estilo do input para aquisição simples de pacote',
		value: '#001736',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'login_user_text_title',
		description: 'Título da tela de login no checkout/login',
		value: 'Bem-vindo de volta!',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'create_user_text_title_one',
		description: 'Título da tela de cadastro no checkout (parte 1)',
		value: 'Pra gente começar, faça seu cadastro.',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'create_user_text_description_one',
		description: 'Descrição da tela de cadastro no checkout (parte 1)',
		value: 'Já tem um cadastro?',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'create_user_text_title_two',
		description: 'Título da tela de cadastro no checkout (parte 2)',
		value: 'Agora, seus dados pessoais.',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'create_user_text_description_two',
		description: 'Descrição da tela de cadastro no checkout (parte 2)',
		value: 'Assim a gente consegue te identificar quando ganhar um prêmio!',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'create_user_text_title_three',
		description: 'Título da tela de escolha da forma de pagamento no checkout',
		value: 'Agora, escolha uma forma de pagamento.',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'checkout_pix_text_title',
		description: 'Título da tela de pagamento via Pix',
		value: 'Agora você só precisa finalizar seu pagamento:',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'checkout_card_text_title',
		description: 'Título da tela de pagamento via Cartão de Crédito',
		value: 'Insira os dados do cartão de crédito:',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'checkout_pix_text_list_steps_description_three',
		description: 'Descrição da tela de pagamento via Pix',
		value:
			'{"list":[{"one": "1.", "two": "Abra o aplicativo do seu banco no celular;", "type": "text"}, {"one": "2.", "two": "Seleciona a opção de pagar com o Pix/Escanear QR Code;", "type": "text"}, {"one": "3.", "two": "Aponte sua câmera para o QR code e efetue o pagamento.", "type": "text"}]}',
		tag: 'login/checkout',
		type: typesMedia[7],
	},
	{
		name: 'checkout_feedback_text_title',
		description: 'Título da tela de feedback ao finalizar uma compra',
		value: 'Valeu e boa sorte!',
		tag: 'login/checkout',
		type: typesMedia[0],
	},
	{
		name: 'checkout_feedback_pix_text_list_description',
		description: 'Feedback de pagamento via Pix',
		value:
			'{"list":[{"one": "Importante:", "two": "seu pagamento via Pix pode levar até 5 minutos pra ser processado, aí você pode aproveitar seus conteúdos, suas raspadinhas digitais pra concorrer a prêmios na hora e seus números da sorte pro grande sorteio!", "type": "text"}, {"one": "Lembre-se:", "two": "Você pode comprar pacotes quando quiser! Quanto mais números da sorte você tiver no dia do sorteio, mais chances vai ter de ganhar.", "type": "text"}]}',
		tag: 'login/checkout',
		type: typesMedia[7],
	},
	{
		name: 'checkout_feedback_card_credit_text_list_description',
		description: 'Feedback de pagamento via Pix',
		value:
			'{"list":[{"one": "Lembre-se:", "two": "você pode comprar pacotes quando quiser! Quanto mais números da sorte você tiver no dia do sorteio, mais chances vai ter de ganhar.", "type": "text"}]}',
		tag: 'login/checkout',
		type: typesMedia[7],
	},
	{
		name: 'config_will_have_credit_card_payments',
		description:
			'Utilizado para exibir ou não a opção de pagamento via cartão de crédito',
		value: '1',
		tag: 'login/checkout',
		type: typesMedia[6],
	},

	// App
	{
		name: 'layout_background_app',
		description: 'Imagem de fundo da aplicação geral.',
		placeholder: '/imgs/bg_default.png',
		tag: 'app',
		type: typesMedia[3],
	},
	{
		name: 'layout_background_app_mobile',
		description: 'Imagem de fundo da aplicação geral versão mobile.',
		placeholder: '/imgs/bg_default_mobile.png',
		tag: 'app',
		type: typesMedia[3],
	},
	{
		name: 'layout_background_footer_app',
		description: 'Imagem de fundo referente ao modal da página Revelar-Prêmio',
		placeholder: '/imgs/fundo_modal_placeholder.png',
		tag: 'app',
		type: typesMedia[3],
	},
	{
		name: 'header_colors_background_app',
		description: 'cor de fundo padrão do header da aplicação',
		value: '#000000',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'header_colors_background_app_two',
		description: 'cor de fundo padrão do header da aplicação clara',
		value: '#FFBE00',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'header_colors_text_app',
		description: 'cor de text padrão do header da aplicação',
		value: '#FFFFFF',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'loading_border_colors_one',
		description: 'Cor de fundo utilizado no loading principal do app',
		value: '#FFFFFF',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'loading_border_colors_two',
		description: 'Cor de complemento utilizado no loading principal do app',
		value: '#E6E6E6',
		tag: 'login/checkout',
		type: typesMedia[2],
	},
	{
		name: 'sessions_image_one',
		description:
			'Imagem que representa o tipo de prêmio na seção de meus prêmios (Sorteio)',
		placeholder: '/imgs/trevo.png',
		tag: 'app',
		type: typesMedia[3],
	},
	{
		name: 'sessions_image_two',
		description:
			'Imagem que representa o tipo de prêmio na seção de meus prêmios (Rabiscadinha)',
		placeholder: '/imgs/rabiscadinha.png',
		tag: 'app',
		type: typesMedia[3],
	},
	{
		name: 'sessions_title_one',
		description: 'Título da seção de números premiados.',
		value: 'Número premiado de hoje:',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'sessions_title_two',
		description:
			'Título da seção de detalhes dos premios referente a rabiscadinha.',
		value: 'Rabiscadinha',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'sessions_title_three',
		description:
			'Título da seção de detalhes dos premios referente ao número premiado.',
		value: 'Número premiado:',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'sessions_subtitle_one',
		description:
			'Subtítulo da seção localizado na lista dos prêmios (sorteio) do ganhador.',
		value: 'Número da sorte',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'sessions_subtitle_two',
		description:
			'Subtítulo da seção localizado na lista dos prêmios (rabiscadinha) do ganhador.',
		value: 'Rabiscadinha',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'sessions_subtitle_three',
		description:
			'Subtítulo da seção localizado no detalhes-premios do ganhador.',
		value:
			'Lembre-se: mantenha seu cadastro sempre atualizado pra nossa equipe poder entregar seu prêmio!',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'sessions_subtitle_four',
		description:
			'Subtítulo da seção localizado no detalhes-premios do ganhador, como exemplo para dúvidas.',
		value: 'Dúvidas? É só entrar em contato:',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'sessions_subtitle_six',
		description:
			'Ultimo texto da seção localizado no detalhes-premios do ganhador.',
		value: '*Este item não é reembolsável.',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'sessions_button_label_one',
		description:
			'Texto de dentro dos botões de filtro para a tela de meus prêmios.',
		value: 'apenas rabiscadinhas',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'sessions_button_label_two',
		description:
			'Texto de dentro dos botões de filtro para a tela de meus prêmios.',
		value: 'apenas sorteios',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'sessions_button_label_three',
		description:
			'Texto de dentro dos botões de filtro para a tela de meus prêmios.',
		value: 'todos os sorteios',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'session_text_input_search',
		description: 'Placeholder do Campo Pesquisa',
		value: 'Qual sua dúvida?',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_background_card_one',
		description:
			'Imagem do Banner principal que está localizado como o primeiro banner da página.',
		placeholder: '/imgs/card_sorteio_atual_mobile.png',
		tag: 'app',
		type: typesMedia[3],
	},
	{
		name: 'banner_background_card_two',
		description: 'Imagem do Banner secundário, localizado na página Hub.',
		placeholder: '/imgs/fundo_card_2.png',
		tag: 'app',
		type: typesMedia[3],
	},
	{
		name: 'banner_background_card_three',
		description: 'Imagem do Card localizado ao lado esquerdo da página.',
		placeholder: '/imgs/card_sorteio_anterior_tablet.png',
		tag: 'app',
		type: typesMedia[3],
	},
	{
		name: 'banner_background_card_four',
		description: 'Imagem do Card localizado ao lado direito da página',
		placeholder: '/imgs/card_sorteio_futuro_mobile.png',
		tag: 'app',
		type: typesMedia[3],
	},
	{
		name: 'banner_image_card_one',
		description: 'Primeira imagem localizada dentro do Banner principal.',
		placeholder: '/imgs/Mosqueteiro_tablet.png',
		tag: 'app',
		type: typesMedia[3],
	},
	{
		name: 'banner_image_card_two',
		description:
			'Primeira imagem localizada dentro do Banner secundário, localizado na página Hub.',
		placeholder: '/imgs/gol.png',
		tag: 'app',
		type: typesMedia[3],
	},
	{
		name: 'banner_detach_image_card_hub',
		description: 'Imagem presente dentro do Banner destacado',
		placeholder: '/imgs/thumb_premios1.png',
		tag: 'app',
		type: typesMedia[3],
	},
	{
		name: 'banner_detach_link_card_description_hub',
		description: 'Link do Banner Destacado',
		value: '/app/meus-premios',
		tag: 'app',
		type: typesMedia[1],
	},
	{
		name: 'banner_detach_text_card_description_hub',
		description: 'Texto dentro do Banner Destacado',
		value:
			'Toque aqui pra visualizar os prêmios que você já ganhou no seu Fiel da Sorte.',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_detach_colors_text_hub',
		description: 'Cor de texto do Banner Destacado do Hub',
		value: '#FFFFFF',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'banner_detach_colors_background_hub',
		description: 'Cor de fundo do Banner Destacado do Hub',
		value: '#847248',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'banner_detach_position_image_left_hub',
		description: 'Habilitar Imagem do Banner Destacado no lado esquerdo',
		value: '0',
		tag: 'app',
		type: typesMedia[6],
	},
	{
		name: 'config_will_have_image_detach_banner_main',
		description:
			'Habilitar ou não a imagem de destaque do banner principal do hub',
		value: '1',
		tag: 'app',
		type: typesMedia[6],
	},
	{
		name: 'banner_image_card_scratchcard_two',
		description:
			'Imagem dentro no Banner secundário, localizada ao lado da quantidade de raspadinhas restantes.',
		placeholder: '/imgs/image_rasp.png',
		tag: 'app',
		type: typesMedia[3],
	},
	{
		name: 'banner_text_card_title_one',
		description: 'Título do Banner principal do hub.',
		value: 'Fique atento!',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_title_two',
		description:
			'Texto em primeira posição dentro do Banner secundário que contém raspadinhas.',
		value: 'Está com sorte?',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_title_three',
		description: 'Título localizado dentro do Card fixado ao lado esquerdo.',
		value: 'Último sorteio',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_title_four',
		description: 'Título localizado dentro do Card fixado ao lado direito.',
		value: 'Próximos sorteios',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_title_five',
		description: 'Título do banner que não contém raspadinhas disponíveis.',
		value: 'Sem Rabiscadinhas?',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_title_six',
		description:
			'Título do Banner principal do hub em que o próximo sorteio já tenha sido realizado.',
		value: 'O Prêmio já saiu!',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_subtitle_one',
		description: 'Subtitulo localizado dentro do Banner principal.',
		value: 'Acompanhe a contagem regressiva pro sorteio de hoje e boa sorte!',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_subtitle_two',
		description: 'Subtitulo localizado dentro do Banner secundário.',
		value: 'Você tem rabiscadinhas!',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_subtitle_three',
		description: 'Subtitulo do banner quando o usuário não possui raspadinhas.',
		value: 'Não se preocupe, logo mais você terá mais chances!',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_subtitle_four',
		description:
			'Subtitulo do banner dentro do Banner principal em que o próximo sorteio já tenha sido realizado.',
		value: 'Quer saber se você foi o sortudo? É só tocar pra revelar!',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_scratchcard_two',
		description:
			'Texto abaixo da imagem referente a quantidade de raspadinhas.',
		value: 'Rabiscadinhas',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_label_button_one',
		description:
			'Subtitulo do (clique de redirecionamento) dentro Card fixado ao lado esquerdo.',
		value: 'Revelar prêmio',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_label_button_two',
		description:
			'Ultimo texto de (clique de redirecionamento) localizado ao final do Banner secundário.',
		value: 'Rabiscar agora',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_label_button_three',
		description:
			'texto de (clique de redirecionamento) no botão do banner principal quando um sorteio já foi realizado.',
		value: 'Revelar agora',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_card_description_two',
		description:
			'Texto descritivo da data de expiração dentro do Banner Principal que revela o prêmio',
		value: 'Números válidos até',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_final_is_position_el_card_hub',
		description: 'Habilitar outro layout para o banner final do Hub',
		value: '0',
		tag: 'app',
		type: typesMedia[6],
	},
	{
		name: 'banner_final_text_description_card_hub',
		description: 'Texto localizado dentro do Banner Final do Hub.',
		value: 'Ganhadores do Fiel da Sorte: conheça suas histórias tocando aqui.',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'banner_final_link_card_hub',
		description:
			'Insira um link de redirecionamento, ficará fixado dentro do Banner Final do hub.',
		value: 'https://blog.fieldasorte.com.br/',
		tag: 'app',
		type: typesMedia[1],
	},
	{
		name: 'banner_link_before_prize_draw_card_hub',
		description:
			'Link de redirecionamento do banner responsável por exibir o final do sorteio no hub.',
		value: 'https://blog.fieldasorte.com.br/',
		tag: 'app',
		type: typesMedia[1],
	},
	{
		name: 'banner_final_image_card_hub',
		description: 'Imagem localizada dentro do Banner Final do Hub.',
		placeholder: '/imgs/selo_fiel.png',
		tag: 'app',
		type: typesMedia[3],
	},
	{
		name: 'banner_final_colors_text_card_hub',
		description: 'Cor do texto padrão utilizado no banner final do Hub.',
		value: '#FFFFFF',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'banner_final_colors_background_card_hub',
		description: 'Cor do fundo padrão utilizado no banner final do Hub.',
		value: '#000006',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_text_one',
		description: 'Cor do texto padrão utilizado na aplicação.',
		value: '#FFFFFF',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_text_banner_cards',
		description:
			'Cor do texto padrão utilizado nos banners cards da aplicação.',
		value: '#FFFFFF',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_text_one_dark',
		description:
			'Cor do texto padrão utilizado na aplicação para fundos claros.',
		value: '#000000',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_text_two',
		description: 'Cor do texto padrão utilizado na aplicação.',
		value: '#847248',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_text_button',
		description: 'Cor do texto interno do botão',
		value: '#FFFFFF',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_text_button_two',
		description: 'Cor do texto interno do botão do FAQ',
		value: '#847248',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_border_one',
		description:
			'Cor da borda que é compartilhada com outros componentes do site. Exemplo: Banner Blog, Números da Sorte e Campos de Pesquisa.',
		value: '#847248',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_border_two',
		description: 'Cor da borda do separador utilizado entre seções',
		value: '#FFBE00',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_background_one',
		description: 'Cor de fundo do Banner Blog.',
		value: '#000006',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_background_two',
		description: 'Cor de fundo do Banner Destacado',
		value: '#847248',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_background_three',
		description: 'Cor dos campos de números sorteados',
		value: '#DFA701',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_detach_one',
		description: 'Cor para destacar elementos gerais na aplicação.',
		value: '#FF0019',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_background_button',
		description: 'Selecione a cor padrão dos botões.',
		value: '#847248',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_carousel_pagination_background',
		description: 'Cor de fundo da paginação do slide que não está ativo.',
		value: '#FFFFFF',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'colors_emphasis_active_and_hover',
		description: 'Cor de destaque utilizado para chamar a atenção do usuário.',
		value: '#FF0019',
		tag: 'app',
		type: typesMedia[2],
	},
	{
		name: 'modal_text_prize_title_one',
		description:
			'Título principal do modal fixado dentro da página revelar prêmios.',
		value: 'Boa sorte!',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_title_two',
		description: 'Título informando retorno da raspadinha negativo.',
		value: 'Não foi dessa vez...',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_title_three',
		description: 'Título informando retorno da raspadinha positivo.',
		value: 'Parabéns!',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_subtitle_one',
		description: 'Subtitulo do modal fixado dentro da página revelar prêmios.',
		value:
			'Se a combinação dos números sorteados bater com algum dos seus números, você ganhou!',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_subtitle_two',
		description:
			'Subtitulo do modal da página revelar-premio com retorno negativo.',
		value:
			'Continue atento aos sorteios, aqui no Fiel da Sorte todo dia tem ganhador!',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_subtitle_three',
		description:
			'Subtitulo do modal da página revelar-premio com retorno positivo.',
		value:
			'Seu número da sorte foi contemplado! Lembre-se: Mantenha seu cadastro atualizado que nossa equipe vai entrar em contato em breve!',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_label_one',
		description: 'Texto dentro do botão da página revelar-premio.',
		value: 'Revelar resultado',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_label_two',
		description:
			'Texto dentro do botão da página revelar-premio com retorno negativo.',
		value: 'voltar',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'modal_text_prize_label_three',
		description:
			'Texto dentro do botão da página revelar-premio com retorno positivo.',
		value: 'ver detalhes',
		tag: 'app',
		type: typesMedia[0],
	},

	// Menu	Behaviour
	{
		name: 'menu_behaviour_background_colors',
		description: 'Cor de fundo do menu behaviour.',
		value: '#FFFFFF',
		tag: 'menu',
		type: typesMedia[2],
	},
	{
		name: 'menu_behaviour_icon_colors',
		description: 'Cor dos ícones do menu behaviour.',
		value: '#00F919',
		tag: 'menu',
		type: typesMedia[2],
	},
	{
		name: 'menu_behaviour_icon_hover_colors',
		description: 'Cor dos ícones do menu behaviour.',
		value: '#061049',
		tag: 'menu',
		type: typesMedia[2],
	},
	{
		name: 'menu_behaviour_text_colors',
		description: 'Cor dos texto dos ícones do menu behaviour.',
		value: '#061049',
		tag: 'menu',
		type: typesMedia[2],
	},

	// Termos
	{
		name: 'terms_and_condition_text_title',
		description: 'Título da seção de termos.',
		value: 'Termos de uso e política de privacidade',
		tag: 'termos',
		type: typesMedia[0],
	},
	{
		name: 'terms_and_condition_text_document',
		description: 'Texto referente aos termos de uso',
		value:
			'Mussum Ipsum, cacilds vidis litro abertis.  Interagi no mé, cursus quis, vehicula ac nisi. Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Eu nunca mais boto a boca num copo de cachaça, agora eu só uso canudis! Pellentesque nec nulla ligula. Donec gravida turpis a vulputate ultricies.',
		tag: 'termos',
		type: typesMedia[0],
	},
	{
		name: 'terms_and_condition_text_policy',
		description: 'Texto referente a Política de Privacidae',
		value:
			'Mussum Ipsum, cacilds vidis litro abertis.  Cevadis im ampola pa arma uma pindureta. Aenean aliquam molestie leo, vitae iaculis nisl. Interagi no mé, cursus quis, vehicula ac nisi. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.',
		tag: 'termos',
		type: typesMedia[0],
	},

	// Regulamento
	{
		name: 'regulation_text_title',
		description: 'Título do Regulamento.',
		value: 'Regulamento',
		tag: 'regulamento',
		type: typesMedia[0],
	},
	{
		name: 'regulation_text_document',
		description: 'Texto referente ao Regulamento',
		value:
			'Mussum Ipsum, cacilds vidis litro abertis.  Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Delegadis gente finis, bibendum egestas augue arcu ut est. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.',
		tag: 'regulamento',
		type: typesMedia[0],
	},

	// Hotsite
	{
		name: 'config_will_have_header_hotsite',
		description: 'Habilitar ou não o header do hotsite',
		value: '1',
		tag: 'hotsite',
		type: typesMedia[6],
	},
	{
		name: 'header_colors_background_hotsite',
		description: 'cor de fundo padrão do header',
		value: '#061049',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'header_button_label_hotsite',
		description: 'Texto localizado dentro do botão de login do header',
		value: 'Login',
		tag: 'hotsite',
		type: typesMedia[0],
	},
	{
		name: 'header_button_background_colors_hotsite',
		description: 'cor dentro do botão de login do header',
		value: '#00AEEF',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'header_button_text_colors_hotsite',
		description: 'cor de texto do botão de login do header',
		value: '#00AEEF',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'header_button_hover_text_colors_hotsite',
		description:
			'cor de texto do botão de login do header quando o usuário passar o mouse por cima dele',
		value: '#FFFFFF',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'brand_image_hotsite',
		description:
			'Imagem de logo principal utilizado na landing page e header da aplicação, etc.',
		placeholder: '/imgs/lp/logo_main.png',
		tag: 'hotsite',
		type: typesMedia[3],
	},
	{
		name: 'brand_dark_image_hotsite',
		description: 'Imagem versão dark do brand utilizado no header e footer.',
		placeholder: '/imgs/lp/logo_main_dark.png',
		tag: 'hotsite',
		type: typesMedia[3],
	},
	{
		name: 'brand_text_hotsite',
		description: 'Slogan de destaque do banner utilizado na landing page.',
		value: 'É você de nave na garagem e dinheiro no bolso!',
		tag: 'hotsite',
		type: typesMedia[0],
	},
	{
		name: 'banner_text_colors_hotsite',
		description: 'cor de texto do banner principal.',
		value: '#FFFFFF',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'layout_background_colors_hotsite',
		description: 'Cor de fundo da Imagem de fundo do hotsite.',
		value: '#061049',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'layout_background_hotsite',
		description: 'Imagem de fundo do hotsite.',
		placeholder: '/imgs/lp/cover_banner.png',
		tag: 'hotsite',
		type: typesMedia[3],
	},
	{
		name: 'layout_background_hotsite_mobile',
		description: 'Imagem de fundo do hotsite versão mobile.',
		placeholder: '/imgs/lp/cover_banner_mobile.png',
		tag: 'hotsite',
		type: typesMedia[3],
	},
	{
		name: 'layout_background_hotsite_two',
		description: 'Imagem de fundo das seções do hotsite.',
		placeholder: '/imgs/lp/cover_banner_2.png',
		tag: 'hotsite',
		type: typesMedia[3],
	},
	{
		name: 'layout_background_hotsite_mobile_two',
		description: 'Imagem de fundo das seções do hotsite versão mobile.',
		placeholder: '/imgs/lp/cover_banner_mobile_2.png',
		tag: 'hotsite',
		type: typesMedia[3],
	},
	{
		name: 'influencer_race_hotsite_stats_title',
		description: 'Título da página de estatísticas de cada influencer',
		value:
			'<br>Veja abaixo as estatísticas do seu <strong>influencer</strong> favorito:',
		tag: 'hotsite',
		type: typesMedia[0],
	},
	{
		name: 'influencer_race_hotsite_colors_stats_numbers',
		description: 'cor de destaque das informações referentes ao influencer',
		value: '#00F919',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'influencer_race_hotsite_stats_labels',
		description:
			'Label que identifica o título de cada estatística do influencer',
		value:
			'{"list":[{"one":"Perfil","two":"código do influencer buscado.","three":"profile","type":"text"},{"one":"Usuários Cadastrados","two":"Quantidade de usuário que se cadastraram pelo link patrocinado.","three":"createdUsers","type":"text"},{"one":"Vendas Realizadas","two":"Número de aquisições de tickets feitas pelos usuários (Quantidade de números da sorte).","three":"acquisitions","type":"text"},{"one":"Transações","two":"Transações realizadas dentro da plataforma.","three":"transactions","type":"text"},{"one":"Pontuação","two":"Pontuação atual do seu influencer favorito.","three":"score","type":"text"}]}',
		tag: 'hotsite',
		type: typesMedia[7],
	},
	{
		name: 'influencer_race_hotsite_list',
		description: 'Lista da corrida dos influencers',
		value:
			'{"list":[{"one": "", "two": "cremosinha", "type": "archive"}, {"one": "", "two": "cremosinho", "type": "archive"}]}',
		tag: 'hotsite',
		type: typesMedia[7],
	},
	{
		name: 'config_will_have_influencer_race',
		description: 'Habilitar ou não a corrida dos influencers',
		value: '0',
		tag: 'hotsite',
		type: typesMedia[6],
	},
	{
		name: 'config_will_have_effect_banner_main',
		description: 'Habilitar ou não o efeito do banner principal',
		value: '0',
		tag: 'hotsite',
		type: typesMedia[6],
	},
	{
		name: 'config_will_have_carousel_banner_main',
		description:
			'Habilitar ou não a possibilidade do banner principal do hub se transformar em um carousel',
		value: '0',
		tag: 'app',
		type: typesMedia[6],
	},
	{
		name: 'carousel_banner_main_qtd_items',
		description:
			'Quantidade de itens que serão exibidos no carousel do banner principal do hub',
		value: '3',
		tag: 'app',
		type: typesMedia[0],
	},
	{
		name: 'session_influencer_effect_colors_hotsite',
		description: 'cor de fundo do efeito do banner principal',
		value: '#FFBE00',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'session_influencer_text_colors_hotsite',
		description: 'cor de texto da seção do influencer após o banner principal',
		value: '#FFFFFF',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'session_influencer_border_colors_hotsite',
		description:
			'cor de borda da foto do influencer após o banner principal e seção de corrida dos influencers',
		value: '#FFBE00',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'register_steps_text_colors_hotsite',
		description: 'cor de texto da seção de etapas de cadastro.',
		value: '#FFFFFF',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'register_steps_background_colors_hotsite',
		description: 'cor de fundo da seção de etapas de cadastro.',
		value: '#FFBE00',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'register_steps_button_text_colors_hotsite',
		description:
			'cor de texto do número da "etapa" da seção de etapas de cadastro.',
		value: '#FFFFFF',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'register_steps_button_background_colors_hotsite',
		description:
			'cor de fundo do número da "etapa" da seção de etapas de cadastro.',
		value: '#061049',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'register_steps_title_hotsite',
		description: 'Título da seção de passo a passo para participar da promoção',
		value: 'Olha só como é fácil participar',
		tag: 'hotsite',
		type: typesMedia[0],
	},
	{
		name: 'register_steps_list_items_hotsite',
		description: 'Items dos passso a passo para participar da promoção',
		value:
			'{"list":[{"one": "Adiquira", "two": "você se cadastra rapidinho e já pode começar sua coleção de figurinhas.", "type": "text"}, {"one": "Concorra", "two": "Cada figurinha te dá números da sorte pra você concorrer a uma viagem até Miami e a chance conhecer seu artista favorito!", "type": "text"}, {"one": "Participe", "two": "Quanto mais figurinhas você colecionar, mais chances você vai ter no dia do sorteio!", "type": "text"}]}',
		tag: 'hotsite',
		type: typesMedia[7],
	},
	{
		name: 'session_text_colors_hotsite',
		description: 'cor de texto das demais seção do hotsite.',
		value: '#FFFFFF',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'session_text_title_hotsite_one',
		description: 'Título da seção do hotsite',
		value: 'R$200.000,00',
		tag: 'hotsite',
		type: typesMedia[0],
	},
	{
		name: 'session_text_title_hotsite_two',
		description: 'Título da seção do hotsite',
		value: 'Range Rover',
		tag: 'hotsite',
		type: typesMedia[0],
	},
	{
		name: 'session_text_title_hotsite_three',
		description: 'Título da seção do hotsite',
		value: 'Corrida de Influencers',
		tag: 'hotsite',
		type: typesMedia[0],
	},
	{
		name: 'session_text_description_hotsite_one',
		description: 'Descrição da seção do hotsite',
		value:
			'São mais de R$200.000,00 em prêmios nas raspadinhas digitais pra você descobrir direto na tela do seu computador e celular.',
		tag: 'hotsite',
		type: typesMedia[0],
	},
	{
		name: 'session_text_description_hotsite_two',
		description: 'Descrição da seção do hotsite',
		value:
			'Concorra a uma Range Rover no final da promoção com seus números da sorte!',
		tag: 'hotsite',
		type: typesMedia[0],
	},
	{
		name: 'session_text_description_hotsite_three',
		description: 'Descrição da seção do hotsite',
		value:
			'Quer saber a posição do seu influencer favorito? Acompanhe o ranking em tempo real:',
		tag: 'hotsite',
		type: typesMedia[0],
	},
	{
		name: 'session_image_hotsite_one',
		description: 'Imagem da seção do hotsite',
		placeholder: '/imgs/lp/session_placeholder.png',
		tag: 'hotsite',
		type: typesMedia[3],
	},
	{
		name: 'session_image_hotsite_two',
		description: 'Imagem da seção do hotsite',
		placeholder: '/imgs/lp/session_placeholder_2.png',
		tag: 'hotsite',
		type: typesMedia[3],
	},
	{
		name: 'session_background_colors_hotsite_one',
		description: 'cor de fundo da seção',
		value: '#E1F32D',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'session_colors_text_one',
		description: 'cor de texto da seção',
		value: '#061049',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'session_background_influencer_race_hotsite',
		description:
			'Imagem de fundo do primeiro colocado da corrida dos influencers',
		placeholder: '/imgs/lp/bg_ranking_influencers.png',
		tag: 'hotsite',
		type: typesMedia[3],
	},
	{
		name: 'footer_colors_background_hotsite',
		description: 'cor de fundo padrão do footer',
		value: '#061049',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'footer_colors_text_hotsite',
		description: 'cor de texto do footer',
		value: '#00AEEF',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'colors_background_button_hotsite',
		description: 'cor de fundo para botões',
		value: '#00F919',
		tag: 'hotsite',
		type: typesMedia[2],
	},
	{
		name: 'colors_text_button_hotsite',
		description: 'cor de fundo para botões',
		value: '#061049',
		tag: 'hotsite',
		type: typesMedia[2],
	},

	// Faq
	{
		name: 'faq_questions_list',
		description: 'Lista com perguntas e respostas do Faq',
		value:
			'{"list":[{"one": "Por que precisam do meu CPF?", "two": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate", "type": "text"},{"one": "Meus dados bancários estão seguros?", "two": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate", "type": "text"}]}',
		tag: 'faq',
		type: typesMedia[7],
	},
	{
		name: 'faq_text_tittle_footer',
		description: 'Título do Footer do faq.',
		value:
			'<strong>Dúvidas?</strong> É só entrar em contato com a gente através do WhatsApp ou pelo nosso e-mail. Estamos aqui pra te ajudar!',
		tag: 'faq',
		type: typesMedia[0],
	},
	{
		name: 'faq_text_placeholder_input_search',
		description: 'Placeholder do campo de pesquisa do faq',
		value: 'Qual é a sua dúvida?',
		tag: 'faq',
		type: typesMedia[0],
	},
];
