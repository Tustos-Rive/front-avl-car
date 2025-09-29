// TODO: Add button to return to Home

import DeleteObstacle from '../components/tree/deleteObstacle.mjs';

export default class WatchRoadsController {
    constructor(avlCtrl, homeCtrl) {
        if (!avlCtrl) {
            throw new Error('I need a Tree to work!');
        }

        this.avlCtrl = avlCtrl;
        this.homeCtrl = homeCtrl;

        this.main = document.querySelector('main');

        this.elements = {};
    }

    async init() {
        try {
            await this.__cleanMain();
            await this.__callRenderTree();
            this.__callListeners();
        } catch (e) {
            console.error(e);
        }
    }

    __callRenderTree() {
        try {
            this.avlCtrl.init();

            return new Promise((resolve, reject) => {
                // Emit event to the backend to get tree
                this.avlCtrl.getTree(); //.service.emit_get_tree();

                document.removeEventListener('avl_tree_balanced', () => {});
                // Await to backend emit event with the data
                document.addEventListener('avl_tree_balanced', (ev) => {
                    if (!ev) {
                        // Reject with error message
                        reject('Not data from backend!');
                    }

                    // Get elements from the HTML
                    this.__getElements();

                    // Resolve with the data!
                    resolve(ev);
                });
            });
        } catch (e) {
            console.error(e);
        }
    }

    // Clean main
    async __cleanMain() {
        try {
            const __html = await Helpers.fetchText('./app/assets/html/watchRoads.html');
            this.main.innerHTML = __html;
        } catch (e) {
            console.error(e);
        }
    }

    async __callListeners() {
        try {
            this.__addListener(this.elements.btnPreOrder, 'click', this.__pre.bind(this));
            this.__addListener(this.elements.btnInOrder, 'click', this.__in.bind(this));
            this.__addListener(this.elements.btnPosOrder, 'click', this.__pos.bind(this));
            this.__addListener(this.elements.btnBack, 'click', this.__goBack.bind(this));
            this.__addListener(this.elements.btnDelete, 'click', this.__deleteObstacle.bind(this));

            // Events From The Backend
            this.__addListener(document, 'pre-order', this.__eventRoadFocus.bind(this));
            this.__addListener(document, 'in-order', this.__eventRoadFocus.bind(this));
            this.__addListener(document, 'pos-order', this.__eventRoadFocus.bind(this));
        } catch (e) {
            console.error(e);
        }
    }

    __getElements() {
        try {
            const __allObstacles = this.avlCtrl.getRoadCtrl().getRoad().getObstacles();

            this.elements.obstacles = {};

            __allObstacles.forEach((obs) => {
                this.elements.obstacles[obs.id] = document.querySelector(`#_${obs.id}`);
            });

            this.elements.btnPreOrder = document.querySelector('#btn-pre');
            this.elements.btnInOrder = document.querySelector('#btn-in');
            this.elements.btnPosOrder = document.querySelector('#btn-pos');
            this.elements.btnBack = document.querySelector('#btn-back');
            this.elements.btnDelete = document.querySelector('#btn-del');
        } catch (e) {
            console.error(e);
        }
    }

    __addListener(element, event, callback) {
        try {
            // Listener
            element.addEventListener(event, (ev) => {
                callback(ev);
            });
        } catch (e) {
            console.error(e);
        }
    }

    // Get the data from event and set the element focus
    __eventRoadFocus(ev) {
        const data = ev.detail;
        this.__focusNodeInRoad(data);
    }

    // Remove all current classe from nodes visited
    __resetFocusAll() {
        const __keyID = Object.keys(this.elements.obstacles);

        __keyID.forEach((obs) => {
            const current = this.elements.obstacles[obs];
            const currentClasses = current.classList;
            if (currentClasses.contains('current')) {
                currentClasses.remove('current');
            }
        });
    }

    __pre(ev) {
        this.__resetFocusAll();
        this.avlCtrl.service.emit_get_road('preorder');
    }

    __in(ev) {
        this.__resetFocusAll();
        this.avlCtrl.service.emit_get_road('inorder');
    }

    __pos(ev) {
        this.__resetFocusAll();
        this.avlCtrl.service.emit_get_road('posorder');
    }

    __goBack(ev) {
        // Call home init to clean this section and simulate that go back!
        // The context varibales and others not lost! is the same...
        this.homeCtrl.init(true);
    }

    __deleteObstacle(ev) {
        this.deleteObstacle = DeleteObstacle.init(this.avlCtrl);
    }

    __focusNodeInRoad(id) {
        try {
            const __current = this.elements.obstacles[id];

            // Add class to focus element
            __current.classList.add('current');
            __current.focus();
        } catch (e) {
            console.error(e);
        }
    }
}
