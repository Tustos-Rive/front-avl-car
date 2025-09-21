import ObstaclesController from './Obstacles.controller.js';
import RoadController from './Road.controller.js';

export default class HomeController {
    #controllers;
    async init() {
        this.#controllers = {};

        // TODO: Load start screen, contains the initial menu
        // TODO: When click PLAY button, to start game, appears a menu that give the road width (Distance),
        // and if don't have obstacles, show menu to add obstacles!
        this.containerMain = document.querySelector('#start-screen');
        await this.#loadHML();

        this.elements = {};

        this.elements.btnSound = document.querySelector('#btn-toggle-sound');
        this.elements.btnInsertObstacles = document.querySelector('#btn-insert-obstacles');
        this.elements.btnCreateRoad = document.querySelector('#btn-create-road');

        this.#addListeners();
    }

    async #loadHML() {
        const html = await Helpers.fetchText('./app/assets/html/home.html');
        this.containerMain.innerHTML = html;
    }

    #addListeners() {
        try {
            this.#listenerBtnSound();
            this.#listernerBtnCreateRoad();
            this.#listernerBtnObstacles();
        } catch (e) {
            Toast.show({ message: 'Has happend something adding the listeners', mode: 'danger', error: e });
        }
    }

    #listenerBtnSound() {
        this.elements.btnSound.addEventListener('click', (ev) => {
            // TODO: Toggle Sound
            SOUND_ON = !SOUND_ON;
            const btn = ev.target;
            const stylesBtn = getComputedStyle(btn);
            const nameImg = stylesBtn.backgroundImage.includes('sound-on') ? 'sound-off' : 'sound-on';
            btn.style.cssText = `background-image: url('./app/assets/img/svg/${nameImg}.svg')`;
            console.log(SOUND_ON);
        });
    }

    #listernerBtnObstacles() {
        this.elements.btnInsertObstacles.addEventListener('click', async (ev) => {
            // FIXME: Make more clean this, see logic again!
            try {
                this.#controllers.Obstacles = new ObstaclesController();
                await this.#controllers.Obstacles.init(this.#controllers.Road);
            } catch (e) {
                Toast.show({ message: `${e.message}, first create a Road`, mode: 'warning', error: e });

                // Do click to btn to open Menu "Create Road"
                this.elements.btnCreateRoad.click();

                this.#listenerRoadCreated();
            }
        });
    }

    #listernerBtnCreateRoad() {
        this.elements.btnCreateRoad.addEventListener('click', async (ev) => {
            try {
                this.#controllers.Road = new RoadController();
                await this.#controllers.Road.init();

                this.#listenerRoadCreated();
            } catch (e) {}
        });
    }

    #listenerRoadCreated() {
        document.addEventListener('road-created', () => {
            // Do click to btn to open "Add Obstacles Menu"
            this.elements.btnInsertObstacles.click();
        });
    }
}
