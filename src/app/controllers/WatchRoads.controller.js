export default class WatchRoadsController {
    constructor(avlCtrl) {
        if (!avlCtrl) {
            throw new Error('I need a Tree to work!');
        }

        this.avlCtrl = avlCtrl;

        this.main = document.querySelector('main');

        this.elements = {};
    }

    async init() {
        try {
            await this.__cleanMain();
            await this.__callRenderTree();
            this.__getElements();
            console.log('Elemnts inside WatchRoads <=> ', this.elements);
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
                this.avlCtrl.service.emit_get_tree();

                // Await to backend emit event with the data
                document.addEventListener('avl_tree_balanced', (ev) => {
                    if (!ev) {
                        // Reject with error message
                        reject('Not data from backend!');
                    }

                    // Resolve with the data!
                    resolve(ev);
                });
            });

            // this.avlCtrl.__renderTree()
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
            console.log('calling listeners');

            this.__addListener(this.elements.btnPreOrder, 'click', this.__pre.bind(this));
            this.__addListener(this.elements.btnInOrder, 'click', this.__in.bind(this));
            this.__addListener(this.elements.btnPosOrder, 'click', this.__pos.bind(this));

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
            // TODO: Get all nodes from road, and for each by it's ID
            const __allObstacles = this.avlCtrl.getRoadCtrl().getRoad().getObstacles();

            // console.log(__allObstacles);
            this.elements.obstacles = {};

            __allObstacles.forEach((obs) => {
                this.elements.obstacles[obs.id] = document.querySelector(`#_${obs.id}`);
            });

            this.elements.btnPreOrder = document.querySelector('#btn-pre');
            this.elements.btnInOrder = document.querySelector('#btn-in');
            this.elements.btnPosOrder = document.querySelector('#btn-pos');
        } catch (e) {
            console.error(e);
        }
    }

    __addListener(element, event, callback) {
        try {
            console.log('Element <=> ', element);
            console.log('Event <=> ', event);
            console.log('Callback <=> ', callback);

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
