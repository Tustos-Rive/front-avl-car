export default class DeleteObstacle {
    static #modal;
    static #avlCtrl;

    static init(avl) {
        DeleteObstacle.#avlCtrl = avl;

        DeleteObstacle.#modal = null;
        DeleteObstacle.#makeModal();
        DeleteObstacle.#addLiesteners();
    }

    static #makeModal() {
        const html = DeleteObstacle.#getHTML();

        DeleteObstacle.#modal = new Modal({
            modal: false,
            classes: Customs.classesModal, // En customs.mjs están las clases (Se repiten habitualmente)
            title: '<h5>Remove Obstacle</h5>',
            content: html,
            buttons: [
                { caption: cancelButton, classes: 'btn btn-secondary', action: () => DeleteObstacle.#closeMenu() },
                { caption: deleteButton, classes: 'btn btn-primary', action: async () => await DeleteObstacle.#delete() },
            ],
            doSomething: '',
        });

        DeleteObstacle.#modal.show();
    }

    static #addLiesteners() {}

    static #closeMenu() {
        DeleteObstacle.#modal.remove();
    }

    static async #delete() {
        try {
            if (!Helpers.okForm('#form-delete-obstacle')) {
                Customs.toastBeforeAddRecord();
                return;
            }

            const data = DeleteObstacle.#getFormData();

            const req = await Helpers.fetchJSON(`${URLAPI}/avl/node/remove`, {
                method: 'POST',
                body: data,
            });

            if (req.status === 200) {
                Toast.show({ message: req.message, mode: 'success' });
                // Remove obstacle in client (fron-tend data)
                DeleteObstacle.#avlCtrl.getRoadCtrl().getRoad().removeObstacle(data);

                // Redraw renderTree
                DeleteObstacle.#avlCtrl.getTree();

                // Close modal
                DeleteObstacle.#closeMenu();
            } else {
                Toast.show({ message: req.message, mode: 'danger', error: req.error });
            }
        } catch (error) {
            Toast.show({ message: 'Something happend, try again please.', mode: 'danger', error });
        }
    }

    static #getHTML() {
        const __html = `<form id="form-delete-obstacle">
                            <div class="row w-100">
                                <fieldset class="scheduler-border rounded-4 p-3">
                                    <legend class="float-none w-auto p-2 pb-0 mb-0 scheduler-border">Coordinate &lpar;Pixels&rpar;</legend>

                                    <div class="row">
                                        <!-- Coordinate X -->
                                        <div class="col">
                                            <label for="x" class="form-label">X:</label>
                                            <input type="number" id="obstacle-x" class="form-control rounded-1 d-inline-block w-75 bg-purple text-light" placeholder="100" required />
                                        </div>

                                        <!-- Coordinate Y -->
                                        <div class="col">
                                            <label for="y" class="form-label">Y:</label>
                                            <input type="number" id="obstacle-y" class="form-control rounded-1 d-inline-block w-75 bg-purple text-light" placeholder="50" required />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </form>`;

        return __html;
    }

    static #getFormData() {
        const idModal = DeleteObstacle.#modal.id;
        const valX = parseFloat(document.querySelector(`#${idModal} #obstacle-x`).value);
        const valY = parseFloat(document.querySelector(`#${idModal} #obstacle-y`).value);

        return { x: valX, y: valY };
    }
}
