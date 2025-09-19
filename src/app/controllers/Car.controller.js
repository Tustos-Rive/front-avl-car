import Car from '../models/Car.model.mjs';
import OwnUtils from '../utils/own/own.mjs';

export default class CarController {
    async init() {
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

                default:
                    break;
            }
        });
    }

    #moveCar(up = true) {
        console.log(this.carObj.position);

        if (this.#checkCarIsOutScreen() === false) {
            up === true ? this.carObj.up() : this.carObj.down();
            const posY = this.carObj.position.y;
            console.log(`${up === true ? 'UP' : 'DOWN'} => ${this.containerCar.style.cssText}`);

            // "Move" car in axis Y, or margin-vertical
            // this.containerCar.style.cssText = `margin: ${posY}px auto auto auto`;
            this.containerCar.style.cssText = `top: ${posY}px !important`;
        }
    }

    #checkCarIsOutScreen() {
        let out = false;
        const winSizeY = OwnUtils.getWindowSize().y;

        // FIX me: My mind is to explode!!!!!!!!!! BOOM! 1AM
        if (this.carObj.position.y < 0 || this.carObj.position.y > winSizeY) {
            out = true;
        }

        return out;
    }
}
