import * as Popper from '../../utils/popper/popper.min.js';
import * as bootstrap from '../../utils/bootstrap/js/bootstrap.bundle.min.js';
import Helpers from '../../utils/carlos-cuesta/helpers.js';
import * as Customs from '../../utils/own/customs.mjs';
import Toast from '../../utils/carlos-cuesta/toast.js';
import icons from '../../utils/carlos-cuesta/icons.js';
import Popup from '../../utils/carlos-cuesta/popup.js';

import AVL from '../../models/AVL.model.mjs';
import SocketService from '../../services/Socket.service.js';

// Controllers
import CarController from '../../controllers/Car.controller.js';
import RoadController from '../../controllers/Road.controller.js';
import ObstaclesController from '../../controllers/Obstacles.controller.js';
import HomeController from '../../controllers/Home.controller.js';
import TreeService from '../../services/Tree.service.js';
import Road from '../../models/Road.model.mjs';
import Car from '../../models/Car.model.mjs';

document.addEventListener('DOMContentLoaded', () => {
    // runMain();

    App.init();
});

// TODO: The frontend ever begin from zero!, never get the backend data initial
// If user reload page, frontend data restart, backend have history data and not RESTART!

class App {
    static async init() {
        App.#uitlsReferences();
        // App.#modelsReferences();
        // App.#controllersReferences();
        App.#buttonsReferences();
        await App.#globalVariables();

        const homeController = new HomeController();
        await homeController.init();

        // Test load road...
        // const roadCtrl = new RoadController();
        // const carCtrl = new CarController();
        // const obstaclesCtrl = new ObstaclesController();

        // await roadCtrl.init();
        // await carCtrl.init(roadCtrl);
        // await obstaclesCtrl.init(roadCtrl);
    }

    static #uitlsReferences() {
        window.Helpers = Helpers;
        window.icons = icons;
        window.Popper = Popper;
        window.Toast = Toast;
        window.Modal = Popup;
        window.Customs = Customs;
        // window.io = io;
    }

    static async #globalVariables() {
        window.configs = await Helpers.fetchJSON('./app/assets/json/configs.json');
        window.URLAPI = configs.urlAPI;
        window.SOUND_ON = true;

        const response = await Helpers.fetchJSON(`${URLAPI}/data/json/obstacles_types.json`);
        window.OBSTACLES_TYPES = response.data;
    }

    static #buttonsReferences() {
        window.addButton = `${icons.plusSquare}&nbsp;&nbsp;<span>Add</span>`;
        window.deleteButton = `${icons.deleteWhite}<span>Remove</span>`;
        window.acceptButton = `${icons.done1}<span>Accept</span>`;
        window.cancelButton = `${icons.x}<span>Cancel</span>`;
    }
}
