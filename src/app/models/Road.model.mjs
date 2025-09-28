import RoadI from '../interfaces/Road.interface.mjs';

export default class Road extends RoadI {
    constructor(sizesObj) {
        super()
        this.top = 0;
        this.height = 0;
        this.width = 0;
        this.obstacles = [];
        this.setSizes(sizesObj);
    }

    setSizes(sizesObj) {
        this.top = sizesObj.top;
        this.width = sizesObj.width;
        this.height = sizesObj.height;
    }

    setObstacle(obstacle) {
        this.obstacles.push(obstacle);
    }

    setObstacles(obstacles) {
        this.obstacles = obstacles;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    getObstacles() {
        return this.obstacles;
    }

    // FIXME: This function not func... Fix, don't found nothing!
    getObstacleById(id) {
        let obstacle = null;

        // TODO: Find the obstacle!
        obstacle = this.obstacles.find((node) => node.id === id);

        return obstacle;
    }
}
