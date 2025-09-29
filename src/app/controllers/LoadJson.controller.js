import Obstacle from '../models/Obstacle.model.mjs';

export default class LoadJSONController {
    #html;
    #modal;
    #elements;
    #modalID;
    constructor(avl, home) {
        if (!avl) {
            throw new Error('Missing The AVL Controller!');
        }

        this.homeCtrl = home;
        this.avlCtrl = avl;
        this.roadCtrl = this.avlCtrl.getRoadCtrl();
        this.road = this.roadCtrl.getRoad();

        this.#html = null;
        this.#elements = {};
    }

    async init() {
        await this.#loadHTML();
        this.#makeModal();
        this.#showMenu();
        await this.#loadListeners();
    }

    async #makeModal() {
        this.#modal = new Modal({
            modal: false,
            classes: `${Customs.classesModal} dialog-load-json`, // En customs.mjs están las clases (Se repiten habitualmente)
            title: '<h5>Load Obstacles From JSON</h5>',
            content: this.#html,
            buttons: [
                { caption: cancelButton, classes: 'btn btn-secondary', action: () => this.#closeMenu() },
                { caption: acceptButton, classes: 'btn btn-primary', action: async () => await this.#sendJSON() },
            ],
            doSomething: '',
        });
    }

    #showMenu() {
        this.#modal.show();

        this.#modalID = this.#modal.id;
        this.#elements.inpLoadJSON = document.querySelector(`#${this.#modalID} #inp-load-json`);
        this.#elements.textarea = document.querySelector(`#${this.#modalID} #load-json-text`);
    }

    #closeMenu() {
        this.#modal.remove();

        this.#elements = {};
    }

    async #sendJSON() {
        try {
            // Reset tree i don't wanna do more!
            this.avlCtrl.service.emit_reset_avl();

            let content = this.#getTextAreaContent().content;

            if (!content) {
                Customs.toastBeforeAddRecord('No data to send!');
                return;
            }

            const data = JSON.parse(content);

            console.log(data);

            // TODO: Try send data to the backend!
            const req = await Helpers.fetchJSON(`${URLAPI}/avl/add/configs`, {
                method: 'POST',
                body: data,
            });

            if (req.status === 200) {
                Toast.show({ message: req.message, mode: 'success' });
                if (data.configs.total_distance) {
                    // Set road width
                    this.road.setWidth(data.configs.total_distance);
                }

                console.log(this.avlCtrl.getRoadCtrl().getRoad());

                this.#setObstaclesFromTextArea(req.data);
                // Call re-draw Tree event
                this.avlCtrl.getTree();

                // Enable buttons insert obstacles and watch roads
                const customsButtonsToEnable = ['btnInsertObstacles', 'btnWatchRoads'];
                this.homeCtrl.disableEnable(customsButtonsToEnable, true);

                // Close Menu
                this.#closeMenu();
            } else {
                Toast.show({ message: req.message, mode: 'warning' });
            }

            console.log(req);
        } catch (e) {
            console.error(e);
        }
    }

    #setObstaclesFromTextArea(obstaclesIDArray) {
        try {
            const element = this.#getTextAreaContent().element;

            // Length insuficient
            if (element.textLength < 50) {
                return;
            }

            const str = this.#getTextAreaContent().content;

            const json = JSON.parse(str);
            const obstaclesList = [];

            if (json && json.obstacles && obstaclesIDArray.length === json.obstacles.length) {
                for (let i = 0; i < json.obstacles.length; i++) {
                    const obs = json.obstacles[i];
                    const id = obstaclesIDArray[i];

                    // Uppercase First Type Obstacle to coincide backend types
                    obs.type = `${obs.type.slice(0, 1).toUpperCase()}${obs.type.slice(1, obs.type.length)}`;

                    const data = { id, ...obs, is_type_str: true };

                    // Create a new Obstacle here
                    const __obstacle = new Obstacle(data);
                    // And push it to my obstacles list!
                    obstaclesList.push(__obstacle);
                }

                // Then, add obstacles to Road Cliend Side (Front-End)
                this.road.setObstacles(obstaclesList);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async #loadListeners() {
        this.#elements.inpLoadJSON.addEventListener('change', this.#readJSON.bind(this));
    }

    #readJSON(ev) {
        try {
            const file = ev.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const contenido = e.target.result;

                this.#elements.textarea.textContent = contenido;
            };

            reader.onerror = (e) => {
                console.error('Error when trying read file:', e);
            };

            reader.readAsText(file);
        } catch (e) {
            console.error(e);
        }
    }

    async #loadHTML() {
        try {
            const req = await Helpers.fetchText('./app/assets/html/loadJSON.html');
            this.#html = req;
        } catch (error) {
            Toast.show({ message: 'Error loadin LoadJSON, try again.' });
        }
    }

    #getTextAreaContent() {
        const textArea = document.querySelector(`#${this.#modalID} #load-json-text`);
        return { element: textArea, content: textArea.value };
    }
}
