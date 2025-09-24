import AVL from '../models/AVL.model.mjs';

// TODO: refactorice

export default class SocketService {
    // constructor(selectorInfoContainer, objectResultReference) {
    constructor(channel = '/') {
        this.socketURL = channel === '/' ? `${configs.urlSOCKET}/` : `${configs.urlSOCKET}/${channel}`;
        this.socketio = io(this.socketURL);
        /* this.objData = objectResultReference;

        this.WS_URL = 'ws://localhost:6789';
        this.ws = new WebSocket(this.WS_URL);
        this.statusSpan = document.querySelector(selectorInfoContainer);

        this.wsOnOpen();
        this.wsOnClose();
        this.wsOnError();
        this.wsOnMessage(); */
        this.on_connect_error();
    }

    on_connect() {}

    on_disconnect() {}

    on_connect_error() {
        this.socketio.on('connect_error', (error) => {
            if (this.socketio.active) {
                // temporary failure, the socket will automatically try to reconnect
            } else {
                // the connection was denied by the server
                // in that case, `socket.connect()` must be manually called in order to reconnect
                console.log(error.message);
            }
        });
    }

    /* wsOnOpen() {
        this.ws.onopen = () => {
            this.statusSpan.textContent = 'Server: Connected';
            this.statusSpan.style.color = '#8f8';
        };
    }
    wsOnClose() {
        this.ws.onclose = () => {
            this.statusSpan.textContent = 'Server: Disconnected';
            this.statusSpan.style.color = '#f88';
        };
    }
    wsOnError() {
        this.ws.onerror = (e) => {
            this.statusSpan.textContent = 'Server: Error';
            console.error(e);
        };
    }

    wsOnMessage() {
        this.objData.lastServerTree = {}; // latest received tree
        this.objData.treeKeys = new Set(); // claves actualmente en el árbol (strings or numbers)
        this.objData.assignedKeys = new Set(); // claves que ya están spawneadas como obstáculo

        this.ws.onmessage = (ev) => {
            try {
                const msg = JSON.parse(ev.data);

                if (msg.type === 'tree') {
                    this.objData.lastServerTree = msg.tree || {};

                    // actualizar treeKeys a partir del tree completo
                    this.objData.treeKeys = new Set(AVL.extractKeysFromTree(this.objData.lastServerTree).map((k) => String(k)));

                    // quitar de assignedKeys las que ya no estén en treeKeys
                    for (const a of Array.from(this.objData.assignedKeys)) {
                        if (!this.objData.treeKeys.has(String(a))) {
                            this.objData.assignedKeys.delete(a);
                        }
                    }

                    // Dispatch event to render new Tree
                    const eventToDispatch = new CustomEvent('renderTree', { detail: this.objData.lastServerTree });
                    document.dispatchEvent(eventToDispatch);

                    // Create this method in AVL model
                    // renderTree(lastServerTree);
                } else {
                    // info messages (p. ej. insert_ignored)
                    if (msg.type === 'info') console.log('server info:', msg.msg);
                    else console.log('mensaje no manejado del servidor', msg);
                }
            } catch (e) {
                console.error('msg inválido', e);
            }
        };
    } */
}
