import ObstacleI from '../interfaces/Obstacle.interface.mjs';

export default class Obstacle extends ObstacleI {
    /**
     *
     * @param {ObstacleI} data
     */
    constructor(data = { id: '', x: -1, y: -1, type: '', is_type_str: false }) {
        super();

        this.id = data.id;
        this.x = data.x;
        this.y = data.y;
        this.type = data.type;

        this.format_values(data.is_type_str);
    }

    format_values(is_type_str = false) {
        const __type = OBSTACLES_TYPES.find((obs) => {
            // Compare str values (type === type)
            if (is_type_str === true) {
                return obs.type === this.type;
            }
            // Compare type_id with type (int both!)
            else {
                return obs.id === this.type;
            }
        });

        const __type_name = __type.type;

        this.type = __type_name;
    }
}
