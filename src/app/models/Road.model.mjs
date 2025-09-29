import RoadI from '../interfaces/Road.interface.mjs';

export default class Road extends RoadI {
    constructor(sizesObj) {
        super();
        this.top = 0;
        this.height = 300;
        this.width = 500;
        this.obstacles = [];

        if (sizesObj) {
            this.setSizes(sizesObj);
        }
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

    setWidth(w) {
        this.width = w;
    }

    removeObstacle(coordinates) {
        // const __obstacle = this.getObstacleById(id)
        const __index = this.obstacles.findIndex((obs) => obs.x === coordinates.x && obs.y === coordinates.y);

        if (__index >= 0) {
            this.obstacles.splice(__index, 1);
        }
    }

    // FIXME: This function not func... Fix, don't found nothing!
    getObstacleById(id) {
        let obstacle = null;

        // TODO: Find the obstacle!
        obstacle = this.obstacles.find((node) => node.id === id);

        return obstacle;
    }
}
