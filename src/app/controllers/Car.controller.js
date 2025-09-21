import Car from '../models/Car.model.mjs';
import OwnUtils from '../utils/own/own.mjs';

export default class CarController {
    async init(roadCtrl) {
        // To get easily the dimensions and others
        this.roadCtrlReference = roadCtrl;

        this.containerCar = document.querySelector('#ctn-car');
        const containerStyles = getComputedStyle(this.containerCar);
        const initialPosition = { x: OwnUtils.fromPixelsToNumber(containerStyles.left), y: OwnUtils.fromPixelsToNumber(containerStyles.top) };

        // Add battery percent into svg car
        this.carObj = new Car(initialPosition);
        this.carSVG = this.carObj.sprite;

        this.#innerCarToRoad();
        this.#catchKeyEvents();
    }

    #innerCarToRoad() {
        this.containerCar.innerHTML = this.carSVG;
    }

    #catchKeyEvents() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.#moveCar();
                    break;

                case 'ArrowDown':
                    this.#moveCar(false);
                    break;

                case ' ':
                    this.#carJump();
                    break;

                default:
                    break;
            }
        });
    }

    #carJump() {
        // fixme jump, when jump the axis y is move and incorrect

        this.containerCar.style.cssText = `transform: rotate(-15deg)`;
        this.carObj.jump();

        this.carSVG = this.carObj.sprite;
        this.#innerCarToRoad();

        let jumpTimeout = setTimeout(() => {
            this.containerCar.style.cssText = `transform: rotate(0deg)`;
            this.carObj.afterJump();

            // Get the new SVG again
            this.carSVG = this.carObj.sprite;
            // Inner SVG again
            this.#innerCarToRoad();

            // Remove timeout!
            jumpTimeout = null;
        }, 500);
    }

    #moveCar(up = true) {
        console.log(this.carObj.position);

        // Car isn't out of screen in up side
        if (this.#checkCarIsOutScreen().up === false && up === true) {
            this.carObj.up();
            const posY = this.carObj.position.y;

            // "Move" car in axis Y, or margin-vertical
            this.containerCar.style.cssText = `top: ${posY}px !important`;
        }
        // Car isn't out of screen in down side
        else if (this.#checkCarIsOutScreen().down === false && up === false) {
            // "Down" the Y axis and get again
            this.carObj.down();
            const posY = this.carObj.position.y;

            // "Move" to down
            this.containerCar.style.cssText = `top: ${posY}px !important`;
        }
    }

    #checkCarIsOutScreen() {
        let outUp = false;
        let outDown = false;

        // This changes to the road limit size!
        // const winSizeY = OwnUtils.getWindowSize().y;
        const roadHeight = this.roadCtrlReference.getHeight();

        // Out from up side
        if (this.carObj.position.y < 0) {
            outUp = true;
        }

        // Out from down side
        if (this.carObj.position.y + 50 > roadHeight) {
            outDown = true;
        }

        return { up: outUp, down: outDown };
    }
}
