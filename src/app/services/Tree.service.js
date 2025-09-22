import ObstacleI from '../interfaces/Obstacle.interface.mjs';
import SocketService from './Socket.service.js';

export default class TreeService extends SocketService {
    constructor() {
        super('AVLTree');

        // Call the event handlers
        this.on_connect();
        this.on_disconnect();
        this.on_obstacle_inserted();
    }

    on_connect() {
        this.socketio.on('connected', (ev) => {
            console.log('Socket is Connected! (AVLTree)');
        });
    }

    on_disconnect() {
        this.socketio.on('disconnected', (ev) => {
            console.log('Socket is Disconnected! (AVLTree)');
        });
    }

    on_obstacle_inserted() {
        this.socketio.on('obstacles_inserted', (ev) => {
            console.log('Obstacle inserted: ', ev);
        });
    }

    /**
     * Send event to the backend to add new obstacle
     * @param {ObstacleI} data
     */
    emit_insert_obstacle(data) {
        this.socketio.emit('insert_obstacle', data);
    }
}
