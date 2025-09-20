import * as Popper from '../../utils/popper/popper.min.js';
import * as bootstrap from '../../utils/bootstrap/js/bootstrap.bundle.min.js';
import Helpers from '../../utils/carlos-cuesta/helpers.js';
import Toast from '../../utils/carlos-cuesta/toast.js';
import icons from '../../utils/carlos-cuesta/icons.js';

import TreeRender from '../../components/tree/TreeRender.mjs';
import RoadController from '../../controllers/Road.controller.js';
import AVL from '../../models/AVL.model.mjs';
import SocketService from '../../services/Socket.service.js';
import CarController from '../../controllers/Car.controller.js';

document.addEventListener('DOMContentLoaded', () => {
    // runMain();

    App.init();
});

class App {
    static async init() {
        window.Helpers = Helpers;
        window.icons = icons;
        window.Popper = Popper;
        window.Toast = Toast;

        // Test load road...
        const roadCtrl = new RoadController();
        const carCtrl = new CarController();

        await roadCtrl.init();
        await carCtrl.init(roadCtrl);
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
