import menuAddObstacles from '../components/menus/addObstacles.menu.mjs';

export default class AddObstaclesMenuController {
    async init() {
        this.container = document.querySelector('main');

        this.modal = null;

        this.html = await menuAddObstacles.init();

        this.#makeModal();
        this.#showMenu();
    }

    #makeModal() {
        this.modal = new Modal({
            modal: false,
            classes: Customs.classesModal, // En customs.mjs están las clases (Se repiten habitualmente)
            title: '<h5>Add Obstacles</h5>',
            content: this.html,
            buttons: [
                { caption: acceptButton, classes: 'btn btn-primary me-2', action: () => console.log() },
                { caption: cancelButton, classes: 'btn btn-secondary', action: () => console.log() },
            ],
            doSomething: '',
        });
    }

    #showMenu() {
        // this.container.insertAdjacentHTML('afterend', this.html);
        this.modal.show();
    }
}
