import Road from '../models/Road.model.mjs';

export default class ObstacleI {
    /**
     * The "unique" ID
     * @type {String} */
    id;

    /**
     * The coordinate X
     * @type {Number} */
    x;

    /**
     * The coordinate Y
     * @type {Number} */
    y;

    /**
     * The obstacle type
     *  @type {String} */
    type;
}
