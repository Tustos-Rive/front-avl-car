import TreeService from '../services/Tree.service.js';

export default class AVLController {
    constructor(roadCtrl) {
        this.service = new TreeService();
        this.roadController = roadCtrl;
    }

    // FIXME: Really I go here???
    async send_roads_to_backend(data) {
        try {
            const __ROAD = this.roadController.getRoad();

            if (__ROAD) {
                // const __OBSTACLES = { data: __ROAD.getObstacles() };

                // TODO: Send data to the backend, via API
                const req = await Helpers.fetchJSON(`${URLAPI}/avl/node/add`, {
                    method: 'POST',
                    body: data,
                });

                if (req.status == 200) {
                    Toast.show({ message: req.message, mode: 'success' });
                } else {
                    Toast.show({ message: req.message, mode: 'danger', error: req.error });
                }
                console.log(req);

                return req;
            }
        } catch (e) {
            console.log('Erro en catch!');
        }
    }
}
