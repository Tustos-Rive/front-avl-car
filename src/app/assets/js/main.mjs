import * as Popper from '../../utils/popper/popper.min.js';
import * as bootstrap from '../../utils/bootstrap/js/bootstrap.bundle.min.js';
import Helpers from '../../utils/carlos-cuesta/helpers.js';
import * as Customs from '../../utils/own/customs.mjs';
import Toast from '../../utils/carlos-cuesta/toast.js';
import icons from '../../utils/carlos-cuesta/icons.js';
import Popup from '../../utils/carlos-cuesta/popup.js';

import TreeRender from '../../components/tree/TreeRender.mjs';
import AVL from '../../models/AVL.model.mjs';
import SocketService from '../../services/Socket.service.js';

// Controllers
import CarController from '../../controllers/Car.controller.js';
import RoadController from '../../controllers/Road.controller.js';
import ObstaclesController from '../../controllers/Obstacles.controller.js';
import HomeController from '../../controllers/Home.controller.js';

document.addEventListener('DOMContentLoaded', () => {
    // runMain();

    App.init();
});

class App {
    static async init() {
        App.#objectsReferences();
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

    static #objectsReferences() {
        window.Helpers = Helpers;
        window.icons = icons;
        window.Popper = Popper;
        window.Toast = Toast;
        window.Modal = Popup;
        window.Customs = Customs;
    }

    static async #globalVariables() {
        window.configs = await Helpers.fetchJSON('./app/assets/json/configs.json');
        window.URLAPI = configs.urlAPI;
        window.SOUND_ON = true;
    }

    static #buttonsReferences() {
        window.addButton = `${icons.plusSquare}&nbsp;&nbsp;<span>Add</span>`;
        window.deleteButton = `${icons.deleteWhite}<span>Remove</span>`;
        window.acceptButton = `${icons.done1}<span>Accept</span>`;
        window.cancelButton = `${icons.x}<span>Cancel</span>`;
    }
}

// Tests Socket
// let data = {};
// let socketMain;

// function runMain() {
//     const element1 = document.querySelector('#tree-render');
//     const btnShow = document.querySelector('#btn1');
//     const btnHide = document.querySelector('#btn2');

//     btnShow.addEventListener('click', () => {
//         showE(element1);
//     });

//     btnHide.addEventListener('click', () => {
//         hideE('#tree-render');
//     });
// }

// function showE(container) {
//     // Testing AVL, socket and others

//     // let data = {};
//     // const socketMain = new SocketService('#ws-connection', data);

//     socketMain = new SocketService('#ws-connection', data);
//     const html = TreeRender();

//     // Insert html inside index.html, before error
//     container.innerHTML = html;

//     const avlTree = new AVL('#tree-svg');
// }

// function hideE(selector) {
//     // Send close connection
//     socketMain = null;

//     const ctn = document.querySelector(`${selector}`);
//     ctn.innerHTML = '';
// }
