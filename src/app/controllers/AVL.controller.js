import TreeService from '../services/Tree.service.js';

export default class AVLController {
    constructor() {
        this.service = new TreeService();
    }
}
