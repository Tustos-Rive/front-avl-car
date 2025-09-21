import Obstacle from '../models/Obstacle.model.mjs';

export default class RoadI {
    /**
     * The road pos in Y (top)
     * @type {number} */
    top;

    /**
     * The road width (number)
     * @type {number} */
    width;

    /**
     * The road height (number)
     * @type {number} */
    height;

    /**
     * The road obstacles (Array)
     * @type {Obstacle[]} */
    obstacles;

    /**
     * Get the road width
     * @type function
     * @returns {Number} The road width
     */
    getWidth() {}

    /**
     * Get the road height
     * @type function
     * @returns {Number} The road height
     */
    getHeight() {}

    /**
     * Get the road width
     * @type function
     * @returns {Obstacle[]} The road obstacles
     */
    getObstacles() {}

    /**
     * Set sizes from json data
     * @type function
     * @param {RoadI} sizesObj The object to get properties
     */
    setSizes(sizesObj) {}

    /**
     * Set obstacles
     * @type function
     * @param {Obstacle[]} obstacles The list of obstacles to add
     */
    setObstacles(obstacles) {}

    /**
     * Set one obstacle
     * @type function
     * @param {Obstacle} obstacle The obstacle to add
     */
    setObstacle(obstacle) {}
}
