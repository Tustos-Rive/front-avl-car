import TreeService from '../services/Tree.service.js';
import AVLController from './AVL.controller.js';
import ObstaclesController from './Obstacles.controller.js';
import RoadController from './Road.controller.js';

export default class HomeController {
    #controllers;
    async init() {
        this.#controllers = {};
        this.treeService = new TreeService();

        // To try fix have 2 obstacles dialogs/menus
        // This controle if the event that creates road is ALREADY called or not
        this.alreadyListenRoadCreated = false;

        // TODO: Load start screen, contains the initial menu
        // TODO: When click PLAY button, to start game, appears a menu that give the road width (Distance),
        // and if don't have obstacles, show menu to add obstacles!
        this.containerMain = document.querySelector('#start-screen');
        await this.#loadHML();

        this.elements = {};

        this.elements.btnSound = document.querySelector('#btn-toggle-sound');
        this.elements.btnInsertObstacles = document.querySelector('#btn-insert-obstacles');
        this.elements.btnCreateRoad = document.querySelector('#btn-create-road');
        this.elements.btnWatchRoads = document.querySelector('#btn-watch-roads');

        this.#addListeners();

        // Reset backend AVL data
        this.__emitResetTree();
    }

    __emitResetTree() {
        this.treeService.emit_reset_avl();
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
            this.#listenerBtnWatchRoads();
        } catch (e) {
            Toast.show({ message: 'Has happend something adding the listeners', mode: 'danger', error: e });
        }
    }

    // FIXME: Fix this... Add emenu :/
    #listenerBtnWatchRoads() {
        this.elements.btnWatchRoads.addEventListener('click', async (ev) => {
            try {
                // Show menu to create obstacles (Don't have obstacles...)
                if (!this.#controllers.AVL) {
                    Toast.show({ message: 'First You should create the <span class="text-warning">Obstacles</span>. <span class="text-info">Opening Menu</span>...' });
                    this.elements.btnInsertObstacles.click();
                } else {
                    // By now, just get the road in order, after, create the menu ROADS!
                    // this.#controllers.AVL.service.emit_get_road('preorder');
                    this.#controllers.AVL.service.emit_get_road('inorder');
                    // this.#controllers.AVL.service.emit_get_road('posorder');
                }
            } catch (e) {}
        });
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
                if (!this.#controllers.AVL) {
                    this.#controllers.AVL = new AVLController(this.#controllers.Road);
                }

                if (!this.#controllers.Obstacles) {
                    this.#controllers.Obstacles = new ObstaclesController();
                }

                // Set the obstacle controller to the AVLController
                // this.#controllers.AVL.setObstacleController(this.#controllers.Obstacles);

                // Send AVL controller to Obstacles, every time add obstacle call...
                await this.#controllers.Obstacles.init(this.#controllers.Road, this.#controllers.AVL);
            } catch (e) {
                Toast.show({ message: `${e.message}, first create a Road`, mode: 'warning', error: e });

                // Do click to btn to open Menu "Create Road"
                this.elements.btnCreateRoad.click();

                // If this event IS NOT called, call...
                if (this.alreadyListenRoadCreated === false) {
                    this.alreadyListenRoadCreated = true;
                    this.#listenerRoadCreated();
                }
            }
        });
    }

    #listernerBtnCreateRoad() {
        this.elements.btnCreateRoad.addEventListener('click', async (ev) => {
            try {
                // Evit overwrite!
                if (!this.#controllers.Road) {
                    this.#controllers.Road = new RoadController(this.treeService);
                }

                await this.#controllers.Road.init();

                // If this event IS NOT called, call...
                if (this.alreadyListenRoadCreated === false) {
                    this.alreadyListenRoadCreated = true;
                    this.#listenerRoadCreated();
                }
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
