import ObstacleI from '../interfaces/Obstacle.interface.mjs';
import SocketService from './Socket.service.js';

export default class TreeService extends SocketService {
    constructor() {
        super('AVLTree');
        // Call the event handlers
        this.on_connect();
        this.on_disconnect();
        this.on_obstacle_inserted();
        this.on_road_preorder();
        this.on_road_inorder();
        this.on_road_posorder();
        this.on_avl_tree_balanced();
        this.on_avl_reseted();
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
            // console.log('Obstacle inserted: ', ev);
        });
    }

    on_road_preorder() {
        this.socketio.on('preorder', (ev) => {
            const event = new CustomEvent('pre-order', { detail: ev.data });
            document.dispatchEvent(event);
        });
    }

    on_road_inorder() {
        this.socketio.on('inorder', (ev) => {
            const event = new CustomEvent('in-order', { detail: ev.data });
            document.dispatchEvent(event);
        });
    }

    on_road_posorder() {
        this.socketio.on('posorder', (ev) => {
            const event = new CustomEvent('pos-order', { detail: ev.data });
            document.dispatchEvent(event);
        });
    }

    on_avl_tree_balanced() {
        this.socketio.on('avl_tree_balanced', (ev) => {
            // console.log('AVL From Backend: ', ev);

            const data = ev.data ?? {};
            const event = new CustomEvent('avl_tree_balanced', { detail: data });
            document.dispatchEvent(event);
        });
    }

    on_avl_reseted() {
        this.socketio.on('avl_reseted', (ev) => {
            const data = ev.data ?? {};
            const event = new CustomEvent('avl_reseted', { detail: data });
            document.dispatchEvent(event);
        });
    }

    /**
     * Send event to the backend to add new obstacle
     * @param {ObstacleI} data
     */
    emit_insert_obstacle(data) {
        this.socketio.emit('insert_obstacle', data);
    }

    emit_get_road(road_name, data = {}) {
        this.socketio.emit(`road_${road_name}`, data);
    }

    emit_get_tree(data = {}) {
        this.socketio.emit('get_tree_avl', data);
    }

    emit_reset_avl(data = {}) {
        this.socketio.emit('reset_avl', data);
    }

    emit_remove_obstacle(data = {}) {
        this.socketio.emit('remove_obstacle', data);
    }
}
