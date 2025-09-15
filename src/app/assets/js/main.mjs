import TreeRender from '../../components/tree/TreeRender.mjs';
import AVL from '../../models/AVL.model.mjs';
import SocketService from '../../services/Socket.service.js';

document.addEventListener('DOMContentLoaded', () => {
    runMain();
});

let data = {};
let socketMain;

function runMain() {
    const element1 = document.querySelector('#tree-render');
    const btnShow = document.querySelector('#btn1');
    const btnHide = document.querySelector('#btn2');

    btnShow.addEventListener('click', () => {
        showE(element1);
    });

    btnHide.addEventListener('click', () => {
        hideE('#tree-render');
    });
}

function showE(container) {
    // Testing AVL, socket and others

    // let data = {};
    // const socketMain = new SocketService('#ws-connection', data);

    socketMain = new SocketService('#ws-connection', data);
    const html = TreeRender();

    // Insert html inside index.html, before error
    container.innerHTML = html;

    const avlTree = new AVL('#tree-svg');
}

function hideE(selector) {
    // Send close connection
    socketMain = null;

    const ctn = document.querySelector(`${selector}`);
    ctn.innerHTML = '';
}
