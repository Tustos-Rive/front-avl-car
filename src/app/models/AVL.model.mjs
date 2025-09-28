export default class AVL {
    /**@type {Node} */
    root;
    /**@type {Function} */
    insert;

    /**@type {Function} */
    delete;

    /**@type {Function} */
    to_dict;

    // constructor(treeContainerSelector) {
    constructor() {
        this.root = null;
        // this.containerTree = d3.select(treeContainerSelector);
        // this.width = parseInt(this.containerTree.style('width')) || 800;
        // this.height = parseInt(this.containerTree.style('height')) || 600;
        // this.g = this.containerTree.append('g').attr('transform', 'translate(40,40)');
        // // Handle the render tree event
        // this.#handleRenderTree();
    }
}
