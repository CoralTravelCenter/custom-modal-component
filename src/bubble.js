export default class PromoBubble {
	constructor(settings) {
		this.bubble = this.createElement("div", "coral-promo-bubble");
		this.settings = settings
		document.body.append(this.bubble);
		this.generateBubbleMarkup()
	}

	createElement(tag, className) {
		// Утилита для создания элемента с классом
		const element = document.createElement(tag);
		element.classList.add(className);
		return element;
	}

	generateBubbleMarkup() {
		// Генерация и добавление разметки в элемент
		this.bubble.innerHTML = ''; // Очищаем содержимое перед добавлением

		// Иконка
		const iconElement = document.createElement('div');
		iconElement.classList.add('coral-promo-bubble__icon');
		iconElement.innerText = '%';

		// Текст
		const textElement = document.createElement('div');
		textElement.classList.add('coral-promo-bubble__text');
		textElement.innerHTML = `<p>Получите <br> скидку ${this.settings.discount_size}</p>`;

		// Добавляем элементы в пузырек
		this.bubble.append(iconElement, textElement);
	}
}
