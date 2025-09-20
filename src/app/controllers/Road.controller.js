import RoadGame from '../components/game/road.game.mjs';
import OwnUtils from '../utils/own/own.mjs';

export default class RoadController {
    #roadDiv;
    async init() {
        this.containerRoad = document.querySelector('#road-game');
        this.roadHtml = await RoadGame();

        this.#innerRoad();
        this.#roadDiv = document.querySelector('#road-container');
    }

    #innerRoad() {
        this.containerRoad.innerHTML = this.roadHtml;
    }

    getHeight() {
        console.log(this.#roadDiv);
        const roadDivStyles = getComputedStyle(this.#roadDiv);

        const heightRoad = OwnUtils.fromPixelsToNumber(roadDivStyles.height);
        return heightRoad;
    }
}
