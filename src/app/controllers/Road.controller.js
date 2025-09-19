import RoadGame from '../components/game/road.game.mjs';

export default class RoadController {
    async init() {
        this.containerRoad = document.querySelector('#road-game');
        this.roadDiv = null;
        this.roadHtml = await RoadGame();

        this.#innerRoad();
    }

    #innerRoad() {
        this.containerRoad.innerHTML = this.roadHtml;
    }
}
