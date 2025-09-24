import ObstacleI from '../interfaces/Obstacle.interface.mjs';

export default class Obstacle extends ObstacleI {
    /**
     *
     * @param {ObstacleI} data
     */
    constructor(data = { id: '', x: -1, y: -1, type: '' }) {
        super();

        this.id = data.id;
        this.x = data.x;
        this.y = data.y;
        this.type = data.type;
    }

    // validateCoordinates() {
    //     let ok = true;
    //     let error = '';

    //     // Validations axis X
    //     const negativeX = this.x <= 0;
    //     const soCloseX = this.x - 50 <= 0;
    //     const greatherRoadWidth = this.x > this.road.getWidth();
    //     const soCloseRoadWidth = this.x + 50 > this.road.getWidth();

    //     // Validations axis Y
    //     const negativeY = this.y <= 0;
    //     const soCloseY = this.y - 10 <= 0;
    //     const greatherRoadHeight = this.y > this.road.getHeight();
    //     const soCloseRoadHeight = this.y + 10 > this.road.getHeight();

    //     if (negativeX || soCloseX || greatherRoadWidth || soCloseRoadWidth) {
    //         ok = false;
    //         error += '1. The coordinate X is not valid, sure that X is less that road Width and greather that 50';
    //     }

    //     if (negativeY || soCloseY || greatherRoadHeight || soCloseRoadHeight) {
    //         ok = false;
    //         error += '1. The coordinate Y is not valid, sure that Y is less that road Height and greather that 50';
    //     }

    //     return { ok, error };
    // }
}
