import menuAddObstacles from '../components/menus/addObstacles.menu.mjs';
import Obstacle from '../models/Obstacle.model.mjs';
import ObstacleService from '../services/Obstacles.service.js';

// TODO: The road should be created before this, because this requires the fucking road width/height

export default class ObstaclesController {
    async init(roadCtrl, AVLCtrl) {
        if (!roadCtrl) {
            throw new Error('Missing Road');
        }

        if (!AVLCtrl) {
            throw new Error('Missing AVL');
        }

        this.roadController = roadCtrl;
        this.AVLController = AVLCtrl;

        // Obstacles instancies (model and service)
        this.obstacleObj = null;
        this.obstacleService = new ObstacleService();

        this.container = document.querySelector('main');

        this.modal = null;
        // The html elements that contains the modal
        this.elements = {};

        this.html = await menuAddObstacles.init();

        /* const response = [
            { id: '01', type: 'Cone' },
            { id: '02', type: 'Rock' },
            { id: '03', type: 'Tree' },
            { id: '04', type: 'Tire' },
            { id: '05', type: 'Nail' },
            { id: '06', type: 'Trunk' },
            { id: '07', type: 'Person' },
            { id: '08', type: 'Car' },
            { id: '09', type: 'Bicycle' },
            { id: '10', type: 'Chair' },
        ]; */

        const response = await Helpers.fetchJSON(`${URLAPI}/data/json/obstacles_types.json`);

        this.obstaclesTypesList = Helpers.toOptionList({
            items: response.data,
            value: 'id', // Is a number that identify a obstacle
            text: 'type', // Is the type name!
            firstOption: 'Select Type',
        });

        // Set a global variable to know obstacles type
        window.OBSTACLES_TYPES = response.data;

        this.#makeModal();
        this.#showMenu();
    }

    #makeModal() {
        this.modal = new Modal({
            modal: false,
            classes: Customs.classesModal, // En customs.mjs están las clases (Se repiten habitualmente)
            title: '<h5>Add Obstacles</h5>',
            content: this.html,
            buttons: [
                { caption: addButton, classes: 'btn btn-primary me-2', action: () => this.#addAction() },
                { caption: cancelButton, classes: 'btn btn-secondary', action: () => this.#closeMenu() },
                { caption: acceptButton, classes: 'btn btn-primary', action: () => this.#closeMenu() },
            ],
            doSomething: '',
        });
    }

    #showMenu() {
        // this.container.insertAdjacentHTML('afterend', this.html);
        this.modal.show();
        // Elements html
        const modalId = this.modal.id;
        const addBtn = document.querySelector(`#${modalId}-btn0`);
        const cancelBtn = document.querySelector(`#${modalId}-btn1`);
        const acceptBtn = document.querySelector(`#${modalId}-btn2`);
        const divError = document.querySelector(`#${modalId} #obstacle-error-p`);
        const typeSelect = document.querySelector(`#${modalId} #types-obtacles`);
        const maxXObstacle = document.querySelector(`#${modalId} #max-x-obstacle`);
        const maxYObstacle = document.querySelector(`#${modalId} #max-y-obstacle`);
        const minXObstacle = document.querySelector(`#${modalId} #min-x-obstacle`);
        const minYObstacle = document.querySelector(`#${modalId} #min-y-obstacle`);

        typeSelect.innerHTML = this.obstaclesTypesList;

        this.elements = { addBtn, cancelBtn, acceptBtn, divError, typeSelect, maxXObstacle, maxYObstacle, minYObstacle, minXObstacle };

        this.#listenTypeChanges(modalId);
        this.#addLimitsAttributtes();
    }

    /**
     * Close/Remove modal/popup from view
     */
    #closeMenu() {
        this.modal.remove();

        this.elements = {};
    }

    /**
     * Validate and call the service to send data to the backend
     */
    async #addAction() {
        try {
            // Validate form before somithing!
            if (!Helpers.okForm('#form-obstacles')) {
                this.#validateMinAndMax();
                Customs.toastBeforeAddRecord();
                return;
            }

            // Show to user information to wait...
            this.#showToastInfo();

            // Disable modal buttons temprally, when get answer from backend activate
            this.#disableEnableModalButtons();

            // Get the form data
            /**@type {Obstacle}*/
            const formData = this.#getFormData();

            // Instanciate the Obstacle object
            this.obstacleObj = new Obstacle(formData);

            // Call the backend validations
            // const coordinatesOK = this.obstacleObj.validateCoordinates();
            const coordinatesOK = { ok: true };
            // const coordinatesOK

            if (coordinatesOK.ok === true) {
                /**@type {Obstacle}*/

                // TODO: Call the this.roadController.addObstacle() to... add? :/
                // Send the "formData" the backend just answer True|False with the statusCode
                // 200 = True, other = False

                // Send data to backend
                const req = await this.#callServiceSendData(this.obstacleObj);

                // Validations of request
                if (req.status === 200) {
                    if (!this.elements.divError.classList.contains('visually-hidden')) {
                        this.elements.divError.classList.add('visually-hidden');
                    }

                    // Set the new tree
                    // Tell to AVLController that i add one obstacle
                    // And should get tree again (UPDATED)
                    this.AVLController.getTree();

                    // Set the ID obtained from the backend!
                    this.obstacleObj.id = req.data;

                    // FIXME: I think this is ok, but, fix after tests
                    this.roadController.getRoad().setObstacle(this.obstacleObj);

                    // await this.AVLController.send_roads_to_backend();

                    // Toast.show({ message: 'The obstacle was added!', mode: 'success' });
                } else {
                    Toast.show({ message: req.message, mode: 'danger' });
                    this.#showSpanError(req.error);
                }
            } else {
                this.#showSpanError(coordinatesOK.error);
            }

            // Enable to can add new obstacles
            this.#disableEnableModalButtons(true);
        } catch (e) {
            Toast.show({ message: 'Has happend something when try add the obstacle, try again.', mode: 'danger', error: e });
        }
    }

    #addLimitsAttributtes(needThisValues = false) {
        const __elements = this.#getFormElements();

        const __inputX = __elements.inpx;
        const __inputY = __elements.inpy;
        const __road = this.roadController.getRoad();

        // Min-Max axis X
        const __maxX = __road.getWidth() - 15;
        // I want 5%
        const __minX = parseInt(__maxX * 0.05);

        // Min-Max axis Y
        const __maxY = __road.getHeight();
        const __minY = 5;

        // Set both attributes
        __inputX.setAttribute('min', `${__minX}`);
        __inputX.setAttribute('max', `${__maxX}`);
        __inputY.setAttribute('min', `${__minY}`);
        __inputY.setAttribute('max', `${__maxY}`);

        // Add min and max to rules to user can see
        this.elements.maxXObstacle.textContent = __maxX;
        this.elements.maxYObstacle.textContent = __maxY;
        this.elements.minXObstacle.textContent = __minX;
        this.elements.minYObstacle.textContent = __minY;

        // Return only when i need :/
        if (needThisValues) {
            return { minx: __minX, miny: __minY, maxx: __maxX, maxy: __maxY };
        }
    }

    #validateMinAndMax() {
        const __elements = this.#getFormElements();
        let ok = true;
        let msg = '';

        const xValue = parseFloat(__elements.inpx.value);
        const yValue = parseFloat(__elements.inpy.value);
        const minAndMax = this.#addLimitsAttributtes(true);

        if (xValue > minAndMax.maxx) {
            ok = false;
            msg += `The value of <span class='text-warning'>X</span> should be less that <span class='text-warning'>${minAndMax.maxx}</span><br>`;
        } else if (xValue < minAndMax.minx) {
            ok += false;
            msg += `The value of <span class='text-warning'>X</span> should be greather that <span class='text-warning'>${minAndMax.minx}</span><br>`;
        }

        if (yValue > minAndMax.maxy) {
            ok = false;
            msg += `The value of <span class='text-warning'>Y</span> should be less that <span class='text-warning'>${minAndMax.maxy}</span><br>`;
        } else if (yValue < minAndMax.miny) {
            ok = false;
            msg += `The value of <span class='text-warning'>Y</span> should be greather that <span class='text-warning'>${minAndMax.miny}</span><br>`;
        }

        if (msg != '') {
            this.#showSpanError(msg);
        }

        return ok;
    }

    /**
     * Format data (Remove the road from formData)
     * @param {Object} data Data to format
     */
    #newObstacleWithoutRoad(data) {
        const newData = { x: data.x, y: data.y, type: data.type };
        return newData;
    }

    #showSpanError(error) {
        // Show the divError and add the ERROR
        this.elements.divError.classList.remove('visually-hidden');
        this.elements.divError.innerHTML = error;
    }

    /**
     * Disable or Enable all buttons inside Dialog/Popup/Modal
     * @param {boolean} enable Call me to enable buttons?
     */
    #disableEnableModalButtons(enable = false) {
        const modalId = this.modal.id;
        // Gets all buttons (modal > all buttons)
        const btnsInModalObstacles = document.querySelectorAll(`#${modalId} > * button`);

        // For each button enable or disable
        btnsInModalObstacles.forEach((btn) => {
            if (enable === false) {
                btn.setAttribute('disabled', true);
            } else {
                btn.removeAttribute('disabled');
            }
        });
    }

    /**
     * Call the service to send to the backend
     * @param {Obstacle} data The obstacle object
     * @returns
     */
    async #callServiceSendData(data) {
        return await this.AVLController.send_roads_to_backend(data);
    }

    #showToastInfo() {
        Toast.show({ message: "Tha data is sending to backend, <span class='text-info'>please wait</span>..." });
    }

    /**
     * This method change the obstacle image preview every time that change
     * @param {String} modalId
     */
    #listenTypeChanges(modalId) {
        this.elements.typeSelect.addEventListener('change', (ev) => {
            const preview = document.querySelector(`#${modalId} #obstacle-preview`);
            const txtType = this.elements.typeSelect.options[ev.target.selectedIndex].text.toLowerCase();

            // Change the img in the obstacle preview!
            if (txtType !== 'select type') {
                preview.style.cssText = `background-image: url("./app/assets/img/svg/${txtType}.svg")`;
            } else {
                preview.style.cssText = `background-image: url("./app/assets/img/svg/obstacle.svg")`;
            }
        });
    }

    #getFormElements() {
        const __inputX = document.querySelector('#obstacle-x');
        const __inputY = document.querySelector('#obstacle-y');
        const __types = document.querySelector('#types-obtacles');

        return { inpx: __inputX, inpy: __inputY, type: __types };
    }

    /**
     * Get the data from the obstacles form
     */
    #getFormData() {
        try {
            const __elements = this.#getFormElements();

            const valX = parseFloat(__elements.inpx.value);
            const valY = parseFloat(__elements.inpy.value);
            const typeObstacle = __elements.type;

            const typeIndex = typeObstacle.selectedIndex;

            // Get the "text" from the option selected
            const typeTxt = parseInt(typeObstacle.options[typeIndex].value);

            const data = { x: valX, y: valY, type: typeTxt };

            return data;
        } catch (e) {
            Toast.show({ message: 'Has happend something trying get the form data', mode: 'danger', error: e });
        }
    }
}
