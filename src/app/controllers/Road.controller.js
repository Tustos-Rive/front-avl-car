import RoadGame from '../components/game/road.game.mjs';
import Road from '../models/Road.model.mjs';
import OwnUtils from '../utils/own/own.mjs';

export default class RoadController {
    #containerMain;
    #modalMenu;
    #roadWidth;

    constructor(treeService = null) {
        this.treeService = treeService;
        this.road = new Road();
    }

    async init(menu = true) {
        if (menu === true) {
            const menuHML = await Helpers.fetchText('./app/assets/html/roadAddMenu.html');
            // this.containerMain = document.querySelector('#road-game');
            // To can get container road HEIGHT
            await this.#innerRoad();

            this.#containerMain = document.querySelector('#road-container');
            // this.#roadDiv = document.querySelector('#road-container');

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

            // Prevent send when press enter or similar... enter dispatch "submit" event in forms
            document.querySelector(`#${this.#modalMenu.id} #form-create-road`).addEventListener('submit', (ev) => {
                ev.preventDefault();
            });
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

            Toast.show({ message: 'Road created succesfully!', mode: 'success' });
            this.road.setSizes(this.#getSizes());

            // Sent event to reset avl (to no confuse...)
            this.treeService.emit_reset_avl();

            console.log('Tree reseted!!!');

            // ROAD_MODEL.init(this.#getSizes);

            // Dispatch event to can continue with others proccess
            document.dispatchEvent(new CustomEvent('road-created'));
            this.#closeMenu();
        } catch (e) {
            Toast.show({ message: 'Has happend something when try create Road.', mode: 'danger', error: e });
        }
    }

    getRoad() {
        return this.road;
    }

    async #innerRoad() {
        try {
            const html = await Helpers.fetchText('./app/assets/html/road.html');
            document.querySelector('main').insertAdjacentHTML('afterbegin', html);
        } catch (error) {
            console.error(error);
        }
        // this.containerMain.innerHTML = this.roadHtml;
    }

    /**
     * Get the road sizes/measures
     * @returns An object that contains width, height and top sizes of road
     */
    #getSizes() {
        console.log(this.#containerMain);

        const containerMainStyles = getComputedStyle(this.#containerMain);

        const roadWidth = parseFloat(document.querySelector('#inp-road-width').value);
        const heightRoad = OwnUtils.fromPixelsToNumber(containerMainStyles.height);
        let topPositionRoad = OwnUtils.fromPixelsToNumber(containerMainStyles.top);

        if (isNaN(topPositionRoad)) {
            topPositionRoad = 0;
        }

        return { width: roadWidth, height: heightRoad, top: topPositionRoad };
    }
}
