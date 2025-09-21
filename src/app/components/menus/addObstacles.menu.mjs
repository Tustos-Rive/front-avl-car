class AddObstacles {
    async init() {
        const html = await this.#getHtml();

        return html;
    }

    async #getHtml() {
        const req = await Helpers.fetchText('./app/assets/html/addObstacles.html');
        return req;
    }
}

const menuAddObstacles = new AddObstacles();
export default menuAddObstacles;
