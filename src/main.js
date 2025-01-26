const isBrowserNotSupportDialog = window.HTMLDialogElement === undefined;

if (isBrowserNotSupportDialog) {
	const dialogElement = document.getElementById("modal");
	const {default: polyfill} = await import("dialog-polyfill");
	polyfill.registerDialog(dialogElement);
}

export default class CoralPopup {
	constructor(eventName = "renderModal") {
		this.dialog = this.createDialog();
		this.wrapper = this.createWrapper();
		this.poster = this.createElement("div", "coral-popup__poster");
		this.content = this.createElement("div", "coral-popup__content");

		this.wrapper.append(this.poster, this.content);
		this.dialog.append(this.wrapper);
		document.body.append(this.dialog);

		this.eventName = eventName;
		this.addCustomEvent();
	}

	createDialog() {
		const dialog = document.createElement("dialog");
		dialog.id = "coral-popup";
		dialog.classList.add("coral-popup");
		dialog.setAttribute("aria-labelledby", "popup-headline");
		dialog.setAttribute("aria-describedby", "popup-text");
		return dialog;
	}

	createWrapper() {
		const wrapper = document.createElement("div");
		wrapper.classList.add("coral-popup__wrapper");
		return wrapper;
	}

	createElement(tag, className) {
		const element = document.createElement(tag);
		element.classList.add(className);
		return element;
	}

	addCustomEvent() {
		document.addEventListener(this.eventName, (event) => {
			this.show(event.detail);
		});
	}

	createCloseButton() {
		const closeButton = this.createElement("button", "coral-popup__close-button");
		closeButton.setAttribute("aria-label", "Закрыть");
		closeButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.63319 3.63243C3.80405 3.46158 4.08105 3.46158 4.25191 3.63243L7.00076 6.38128L9.7496 3.63243C9.92046 3.46158 10.1975 3.46158 10.3683 3.63243C10.5392 3.80329 10.5392 4.0803 10.3683 4.25115L7.61948 7L10.3683 9.74885C10.5392 9.9197 10.5392 10.1967 10.3683 10.3676C10.1975 10.5384 9.92046 10.5384 9.7496 10.3676L7.00076 7.61872L4.25191 10.3676C4.08105 10.5384 3.80405 10.5384 3.63319 10.3676C3.46234 10.1967 3.46234 9.9197 3.63319 9.74885L6.38204 7L3.63319 4.25115C3.46234 4.0803 3.46234 3.80329 3.63319 3.63243Z" fill="#535353"></path>
            </svg>
        `;
		closeButton.addEventListener("click", () => this.close());
		this.wrapper.append(closeButton);
	}

	createHeadline(title) {
		const headline = this.createElement("h2", "coral-popup__headline");
		headline.id = "popup-headline";
		headline.innerText = title;
		this.content.append(headline);
	}

	createUnderline(slogan) {
		const sloganElement = this.createElement("p", "coral-popup__underline");
		sloganElement.innerText = slogan;
		this.content.append(sloganElement);
	}

	createPoster(posterUrl, erid) {
		this.poster.innerHTML = `
            <div class="coral-popup__video-box">
                <span class="coral-popup__ad-label">Реклама. ООО «ТО КОРАЛ ТРЕВЕЛ ЦЕНТР» Erid: ${erid}</span>
                <div data-vimeo="978023164"></div>
            </div>
            <img width="474" height="274" src="${posterUrl}" alt="Промо-изображение">
        `;
	}

	createText(underlineText) {
		const textElement = this.createElement("p", "coral-popup__text");
		textElement.id = "popup-text";
		textElement.innerHTML = underlineText;
		this.content.append(textElement);
	}

	createConditions(conditions) {
		const conditionsList = this.createElement("ul", "coral-popup__conditions");
		conditionsList.setAttribute("aria-label", "Условия акции");
		conditions.forEach((condition) => {
			const listItem = this.createElement("li", "coral-popup__condition");
			listItem.innerText = condition;
			conditionsList.append(listItem);
		});
		this.content.append(conditionsList);
	}

	createAttention(attentionNotes) {
		const attentionBlock = this.createElement("div", "coral-popup__attention");
		attentionNotes.forEach((note) => {
			const noteElement = this.createElement("p", "coral-popup__attention-note");
			noteElement.innerHTML = note;
			attentionBlock.append(noteElement);
		});
		this.content.append(attentionBlock);
	}

	createCollapse() {
		const collapseButton = this.createElement("button", "coral-popup__collapse");
		collapseButton.setAttribute("aria-expanded", "false");
		collapseButton.setAttribute("aria-controls", "popup-conditions");
		collapseButton.innerText = "Подробнее об условиях акции";
		collapseButton.addEventListener("click", ({currentTarget}) => {
			currentTarget.style.display = "none";
			const conditionsList = this.content.querySelector(".coral-popup__conditions");
			if (conditionsList) {
				conditionsList.style.display = "block";
			}
		});
		this.content.append(collapseButton);
	}

	createActionButton(action) {
		const actionButton = this.createElement("a", "coral-popup__action-button");
		actionButton.href = action.href;
		actionButton.innerText = action.name;
		this.content.append(actionButton);
	}

	bindGlobalEvents() {
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && this.dialog.open) {
				this.close();
			}
		});

		this.dialog.addEventListener("click", (event) => {
			if (event.target === this.dialog) {
				this.close();
			}
		});
	}

	checkExpirationDate(expirationTime) {
		const expirationDate = new Date(expirationTime);
		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		if (expirationDate.getTime() === currentDate.getTime()) {
			this.close();
		}
	}

	show(data) {
		console.log(data)
		this.createCloseButton();
		this.createPoster(data.poster, data.erid);
		this.createHeadline(data.headline);
		this.createUnderline(data.slogan);
		this.createText(data.underline);
		this.createActionButton(data.action);
		this.createCollapse();
		this.createConditions(data.conditions);
		this.createAttention(data.attention);

		this.dialog.showModal();
		this.wrapper.classList.add("coral-popup__wrapper--active");

		this.bindGlobalEvents();
		if (data.expirationTime !== '') {
			this.checkExpirationDate(data.expirationTime);
		}
		if (data.triggeredBy !== '') {
			this.show()
		}
	}

	close() {
		this.wrapper.classList.remove("coral-popup__wrapper--active");
		this.dialog.addEventListener(
			"transitionend",
			() => {
				this.dialog.close();
				this.dialog.remove();
			},
			{once: true}
		);
	}
}

