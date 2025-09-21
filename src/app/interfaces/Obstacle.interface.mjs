import Road from '../models/Road.model.mjs';

export default class ObstacleI {
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

    /**
     * Is the road where are the obstacles
     *  @type {Road} */
    road;

    /**
     * @type function
     * @returns Boolean that indicates if the obstacle coordinates are OK
     */
    validateCoordinates() {}
}
