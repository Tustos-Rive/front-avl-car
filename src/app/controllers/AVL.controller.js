import AVL from '../models/AVL.model.mjs';
import TreeService from '../services/Tree.service.js';

import TreeRender from '../components/tree/treeRender.mjs';
import Obstacle from '../models/Obstacle.model.mjs';
import OwnUtils from '../utils/own/own.mjs';

export default class AVLController {
    constructor(roadCtrl) {
        this.avl = new AVL();
        this.service = new TreeService();
        this.roadController = roadCtrl;

        this.init();
    }

    init(isReload = false) {
        // this.__loadHTML();

        // this.obstacleController = null;

        this.html = TreeRender();
        this.__loadHTML();
        // Clean svg

        // this.containerTree = document.querySelector('#tree-wrap');

        this.renderedTreeContainer = document.querySelector('#tree-render');

        // this.renderedTreeContainer.innerHTML = this.htmlCtnSGVAVL;

        this.treeSVGContainer = document.querySelector('#tree-svg');
        this.treeSVGContainer.innerHTML = '';

        this.stylesTreeContainer = getComputedStyle(this.renderedTreeContainer);
        this.stylesTreeSVGCtn = getComputedStyle(this.treeSVGContainer);

        // Add listener to document for when get the tree
        this.listenGetTreeFromBackend();

        if (isReload === true) {
            this.getTree();
        }
    }

    __loadHTML() {
        const __main = document.querySelector('main');

        // Add only when don't already exists!
        if (!document.querySelector('#tree-render')) {
            __main.insertAdjacentHTML('afterbegin', this.html);
        }
    }

    async send_roads_to_backend(data) {
        const __ROAD = this.roadController.getRoad();

        if (__ROAD) {
            // const __OBSTACLES = { data: __ROAD.getObstacles() };

            // TODO: Send data to the backend, via API
            const req = await Helpers.fetchJSON(`${URLAPI}/avl/node/add`, {
                method: 'POST',
                body: data,
            });

            if (!req) {
                throw new Error("Don't was possible communicate with the backend!");
            }

            if (req.status == 200) {
                Toast.show({ message: req.message, mode: 'success' });
            } else {
                Toast.show({ message: req.message, mode: 'danger', error: req.error });
            }
            return req;
        }
    }

    listenGetTreeFromBackend() {
        document.addEventListener('avl_tree_balanced', () => {});
        document.addEventListener('avl_tree_balanced', (event) => {
            this.initDataTree(event);
        });
    }

    initDataTree(event) {
        // Validate if backend sent any data
        if (event.detail) {
            this.avl.root = null;
            // Root will be the node/obstacle ID
            this.avl.root = event.detail;

            // TODO: the obstacle is just id, should be a JSON/Object, x,y,type
            this.formatNodes();

            // TODO: render tree
            this.__renderTree(this.avl);
        }
    }

    formatNodes() {
        if (this.avl.root) {
            // console.log('AVL ROOT => ', this.avl.root);

            this.__formatNodes(this.avl.root);
        }
    }

    /**
     * Fomrat and set node.type to can preview it's image!
     * @param {*} current
     */
    __formatNodes(current) {
        const __obstacle = this.roadController.getRoad().getObstacleById(current.id);

        // The node exists!
        if (__obstacle) {
            // Get all values from these ID
            __obstacle.format_values(true);

            // Set it's type to can get image to node easy!
            // current.type = __obstacle.type;
            (current.x = __obstacle.x), (current.y = __obstacle.y), (current.type = __obstacle.type);

            // The backend sent me a "tree.to_dict()", this get every node.id and it's "childs" as a Obstacle list
            if (current.children) {
                current.children.forEach((child) => {
                    this.__formatNodes(child);
                });
            }
        }

        // return current;
    }

    getRoadCtrl() {
        return this.roadController;
    }

    /**
     * Send event get Tree to the backend
     */
    getTree() {
        this.service.emit_get_tree();
    }

    removeObstacleFromTree() {
        this.service.emit_remove_obstacle();
    }

    __renderTree(data) {
        //     // TODO: For tests, add a svg with the obstacle icon svg, to view if is functional!
        //     // TODO: sleep, i don't have that i'm doing!
        // const road = this.roadController.getRoad();

        if (data.root) {
            // this.containerTree.classList.remove('visually-hidden');

            // I hate javascript and python!
            // Clean container SVG
            this.treeSVGContainer.innerHTML = '';

            /* ---------- Renderizado del Árbol con D3.js ---------- */
            this.__elementoSVG = d3.select('#tree-svg');

            // this.__anchoSVG = parseInt(this.__elementoSVG.style('width')) || 800;
            // this.__altoSVG = parseInt(this.__elementoSVG.style('height')) || 600;

            // const ctnWidth = this.stylesTreeSVGCtn.width.replace('px', '');
            // const ctnHeight = this.stylesTreeSVGCtn.height.replace('px', '');

            this.__anchoSVG = parseInt(this.__elementoSVG.style('width'));
            this.__altoSVG = parseInt(this.__elementoSVG.style('height'));

            // Fix initial viewbox!
            // const flagViewBox = data.root.children ? { w: this.__anchoSVG, h: this.__altoSVG } : { w: 100, h: 200 };
            // this.__elementoSVG.attr('viewBox', [-10, -10, this.__anchoSVG, this.__altoSVG]); //flagViewBox.w, flagViewBox.h]);

            // 'g' es un elemento SVG de grupo, que funciona como un contenedor para otros elementos.
            const ctnWidth = OwnUtils.fromPixelsToNumber(this.stylesTreeContainer.width.replace('px', '')) || 1000;
            const ctnHeight = OwnUtils.fromPixelsToNumber(this.stylesTreeContainer.height.replace('px', ''));

            // Try get g element to not duplicates
            const existingG = this.__elementoSVG.select('g');

            // When call reloads or i sumulate "Go Back" can duplicates if not sure...
            if (existingG.empty()) {
                this.__grupoPrincipalSVG = this.__elementoSVG.append('g').attr('transform', `translate(${ctnWidth / 2 - 300}, 100)`);
            } else {
                this.__grupoPrincipalSVG = existingG;
            }

            this.__render(data.root);
        }
    }

    __render(data) {
        this.__grupoPrincipalSVG.selectAll('*').remove(); // Limpiamos el dibujo anterior.

        if (!data || Object.keys(data).length === 0) return;

        // D3 necesita una estructura jerárquica para poder dibujar el árbol.
        const raizJerarquia = d3.hierarchy(data);

        // Hacemos el SVG más ancho si el árbol tiene muchos nodos para que no se amontonen.
        const cantidadNodos = raizJerarquia.descendants().length;
        const anchoDinamico = Math.max(800, cantidadNodos * 60);
        const altoDinamico = Math.max(600, cantidadNodos * 2);
        this.__elementoSVG.attr('width', anchoDinamico);
        this.__elementoSVG.attr('height', altoDinamico);

        // Configuramos el layout del árbol para que D3 calcule las posiciones de cada nodo y línea.
        const treeDesign = d3
            .tree()
            .size([anchoDinamico - 160, altoDinamico - 160]) //this.__altoSVG - 400]) //this.__altoSVG - 160])
            .separation((a, b) => (a.parent === b.parent ? 1.4 : 2.2));

        treeDesign(raizJerarquia); // Aplicamos el layout a nuestros datos.

        // Dibujar las líneas (enlaces) entre nodos.
        this.__grupoPrincipalSVG
            .selectAll('.link')
            .data(raizJerarquia.links())
            .join('path')
            .attr('class', 'link')
            .attr(
                'd',
                d3
                    .linkVertical()
                    .x((nodo) => nodo.x)
                    .y((nodo) => nodo.y)
            );

        // Dibujar los nodos (círculos y texto).
        const nodosVisuales = this.__grupoPrincipalSVG
            .selectAll('.node')
            .data(raizJerarquia.descendants())
            .join('g')
            .attr('class', 'node')
            .attr('transform', (nodo) => `translate(${nodo.x},${nodo.y})`);

        nodosVisuales
            .append('circle')
            .attr('r', 25)
            .attr('id', (node) => `_${node.data.id}`);
        nodosVisuales.append('image').attr('xlink:href', (node) => `./app/assets/img/svg/${node.data.type.toLowerCase()}.svg`);
        nodosVisuales.append('text').text((nodo) => `(${nodo.data.x}, ${nodo.data.y})`);

        // nodosVisuales.append('text').text((nodo) => nodo.data.type);
    }
}
