import RoadGame from '../components/game/road.game.mjs';
import Road from '../models/Road.model.mjs';
import OwnUtils from '../utils/own/own.mjs';

export default class RoadController {
    #roadDiv;
    #modalMenu;
    #roadWidth;

    async init(menu = true) {
        if (menu === true) {
            const menuHML = await Helpers.fetchText('./app/assets/html/roadAddMenu.html');
            this.containerRoad = document.querySelector('#road-game');
            this.#roadDiv = document.querySelector('#road-container');

            this.#modalMenu = new Modal({
                modal: false,
                classes: 'dialog position-absolute top-50 start-30 translate-middle bg-dark col-4', // En customs.mjs están las clases (Se repiten habitualmente)
                title: '<h5>Create Road</h5>',
                content: menuHML,
                buttons: [
                    { caption: cancelButton, classes: 'btn btn-secondary', action: () => this.#closeMenu() },
                    { caption: acceptButton, classes: 'btn btn-primary', action: () => this.#addActionMenu() },
                ],
            });

            this.#modalMenu.show();
        } else {
            // this.roadHtml = await RoadGame();
            // this.#innerRoad();
            // TODO: Do visible elements road and others
            console.log('Loading Road');
        }
    }

    #closeMenu() {
        this.#modalMenu.remove();
    }

    async #addActionMenu() {
        try {
            if (!Helpers.okForm('#form-create-road')) {
                Customs.toastBeforeAddRecord();
                return;
            }

            this.#roadWidth = parseFloat(document.querySelector('#inp-road-width').value);
            Toast.show({ message: 'Road created succesfully!', mode: 'success' });

            // Dispatch event to can continue with others proccess
            document.dispatchEvent(new CustomEvent('road-created'));
            this.#closeMenu();

            this.road = new Road(this.#getSizes());
        } catch (e) {
            Toast.show({ message: 'Has happend something when try create Road.', mode: 'danger', error: e });
        }
    }

    getRoad() {
        return this.road;
    }

    #innerRoad() {
        this.containerRoad.innerHTML = this.roadHtml;
    }

    /**
     * Get the road sizes/measures
     * @returns An object that contains width, height and top sizes of road
     */
    #getSizes() {
        const roadDivStyles = getComputedStyle(this.#roadDiv);

        const heightRoad = OwnUtils.fromPixelsToNumber(roadDivStyles.height);
        let topPositionRoad = OwnUtils.fromPixelsToNumber(roadDivStyles.top);

        if (isNaN(topPositionRoad)) {
            topPositionRoad = 0;
        }

        return { width: this.#roadWidth, height: heightRoad, top: topPositionRoad };
    }
}
