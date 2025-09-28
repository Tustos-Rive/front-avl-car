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

    #handleRenderTree() {
        console.log('Already to handle renderTree event');
        document.addEventListener('renderTree', (ev) => {
            console.log('Handled renderTree event');

            console.log(ev);

            this.renderTree(ev.detail);
        });
    }

    renderTree(data) {
        this.g.selectAll('*').remove();

        // Not received any data
        if (!data || Object.keys(data).length === 0) return;

        this.root = d3.hierarchy(data);

        // cálculo dinámico de ancho según número de nodos
        const nodeCount = this.root.descendants().length;
        const dynamicWidth = Math.max(800, nodeCount * 60); // 60px por nodo (ajusta si quieres)
        this.containerTree.attr('width', dynamicWidth);

        const treeLayout = d3
            .tree()
            .size([dynamicWidth - 160, this.height - 160])
            .separation((a, b) => (a.parent === b.parent ? 1.4 : 2.2));

        treeLayout(this.root);

        // links
        this.g
            .selectAll('.link')
            .data(this.root.links())
            .join('path')
            .attr('class', 'link')
            .attr(
                'd',
                d3
                    .linkVertical()
                    .x((d) => d.x)
                    .y((d) => d.y)
            );

        // nodes
        const nodes = this.g
            .selectAll('.node')
            .data(this.root.descendants())
            .join('g')
            .attr('class', 'node')
            .attr('transform', (d) => `translate(${d.x},${d.y})`);

        nodes.append('circle').attr('r', 18);
        nodes.append('text').text((d) => d.data.name);
    }

    static extractKeysFromTree(node) {
        if (!node) return [];
        const res = [];

        const walk = (n) => {
            if (!n) return;
            if (n.name !== undefined) res.push(Number(n.name));
            if (Array.isArray(n.children)) {
                for (const c of n.children) walk(c);
            }
        };

        walk(node);
        return res;
    }
}
