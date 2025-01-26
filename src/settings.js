import CoralPopup from './main.js';

window._popUpManager = {
	headline: "Только сейчас:",
	slogan: "промокод на тур и проживание!",
	action: {
		href: '',
		name: 'Продолжить бронирование'
	},
	discount_size: "3%",
	poster: "https://b2ccdn.coral.ru/content/popup_tolko_seychas.jpg",
	erid: "2W5zFHKHT8c",
	vimeo: "978023164",
	underline: "Скидка 3% от стоимости тура или только проживания по промокоду <strong>ЗИМА</strong><br> на бронирование онлайн на сайте coral.ru",
	conditions: [
		"Направления: любые",
		"Даты начала путешествия: любые",
		"Сроки действия акции: с 24.01.2025 г. по 27.01.2025 г."
	],
	attention: [
		"* Акция не суммируется с другими акциями Coral Travel<br>",
		"** На GDS билеты в составе пакетного тура скидка не распространяется<br>",
		"*** Акция распространяется только на новые неоплаченные бронирования пакетных туров или отелей."
	],
	expirationTime: '',

	//	Настройка, для страницы акций - чтобы открыть попап по клику на баннер
	triggeredBy: '#promo-name'
}

const modal = new CoralPopup()
document.querySelector('.coral-popup-trigger button').addEventListener('click', () => modal.show())
document.dispatchEvent(
	new CustomEvent("renderModal", {
		detail: window._popUpManager
	})
);

