import CarI from '../interfaces/Car.interface.mjs';
import OwnUtils from '../utils/own/own.mjs';

export default class Car extends CarI {
    constructor(intialPos, aceleration, velocity, battery = 100, color = 'red') {
        super();

        this.aceleration = aceleration;
        this.velocity = velocity;
        this.battery = battery;
        this.sprite = this.getSVGCar();

        this.jumping = false;

        // Initial position, car not moves to right side in axis "X"
        this.position = intialPos; //{ x: 50, y: 100 }; //OwnUtils.getWindowSize() };
    }

    up() {
        // This should be send to back...
        this.position.y -= 10;
    }

    down() {
        // This should be send to back...
        this.position.y += 10;
    }

    checkCollision() {
        // send request to Car.service.js and ...
    }

    decreaseBattery(howBatteryDececrease) {
        super.decreaseBattery();
        // if (battery > 0) {
        //     this.battery -= howBatteryDececrease;
        //     // Check battery every time that decrease
        //     this.checkBattery();
        // }
    }

    // checkBattery() {
    //     super.checkBattery();
    //     if (this.battery <= 0) {
    //         // The event gameover to Dispatch
    //         const GAMEOVER_EVENT = new CustomEvent('gameover');
    //         // Dispatch the event
    //         document.dispatchEvent(GAMEOVER_EVENT);
    //     }
    // }

    getSVGCar(color1 = 'rgb(173, 0, 0)', color2 = 'rgb(184, 0, 0)', color3 = 'rgb(255, 196, 0)') {
        return `<svg id="car-svg" viewBox="0 0 500 300" preserveAspectRatio xmlns="http://www.w3.org/2000/svg" fill="#000000" width="100%" height="100%" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)" stroke="#000000" stroke-width="0.004200000000000001" data-app="Xyris">
            <defs></defs>
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.04"></g>
            <g id="SVGRepo_iconCarrier" transform-origin="center" style="transform-box: fill-box" transform="">
                <g id="car-sideways-right" transform="matrix(1.2699999809265137,0,0,1.2699999809265137,-104.15524291992188,-634.206241607666)" transform-origin="">
                    <path d="M 439.767 661.742 L 427.106 630.186 L 386.305 630.186 L 372.968 660.961" fill-rule="nonzero" fill="rgb(92, 95, 96)" transform=""></path>
                    <path d="M 215.984 661.742 L 203.322 630.186 L 162.521 630.186 L 149.184 660.961" fill-rule="nonzero" fill="rgb(92, 95, 96)" transform=""></path>
                    <path d="M 439.767 663.494 L 427.106 631.939 L 386.305 631.939 L 372.968 662.715" fill-rule="nonzero" fill="rgb(92, 95, 96)" transform=""></path>
                    <path d="M 215.984 663.494 L 203.322 631.939 L 162.521 631.939 L 149.184 662.715" fill-rule="nonzero" fill="rgb(92, 95, 96)" transform=""></path>
                    <path d="M 455.982 668.318 L 466.937 608.276 L 378.695 593.961 L 302.35 550.04 L 118.567 550.04 L 87.4386 599.805 L 98.3939 668.255 L 148.572 668.265 L 161.352 638.147 L 201.814 638.147 L 214.132 668.361 L 371.307 668.36 L 384.453 638.366 L 425.16 638.075 L 437.627 668.263 L 455.982 668.318 Z" fill-rule="nonzero" fill="${color1}" transform=""></path>
                    <path d="M 435.682 663.48 L 456.109 667.636 L 455.962 668.329 L 437.53 668.34" fill-rule="nonzero" fill="${color2}" transform=""></path>
                    <path d="M 371.309 668.372 L 211.968 668.457 L 202.034 638.147 L 161.352 638.147 L 148.278 668.268 L 98.3939 668.26 L 87.4027 599.694 L 122.058 599.656 L 378.71 651.885 L 371.309 668.372 Z" fill-rule="nonzero" fill="${color2}" transform=""></path>
                    <path d="M 87.4581 599.675 L 90.0684 616.491 L 115.7 616.507 L 122.041 599.529 L 87.4581 599.675 Z" fill-rule="nonzero" fill="${color3}" transform="">
                        <animate
                            attributeName="fill-opacity"
                            keyTimes="0; 0.09666666666666666; 0.17633333333333337; 0.26699999999999996; 0.36033333333333323; 0.4536666666666665; 0.5803333333333333; 0.6766666666666667; 0.7773333333333331; 0.8839999999999999; 1"
                            values="1;0.45;1;0.45;1;0.45;1;0.45;1;0.45;1"
                            begin="-0.00001"
                            dur="3.00002"
                            fill="freeze"
                            calcMode="spline"
                            keySplines="0.42 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1"
                            repeatCount="indefinite"
                        ></animate>
                    </path>
                    <path d="M 427.971 613.4 L 429.237 630.295 L 462.919 630.313 L 465.987 613.355 L 427.971 613.4 Z" fill-rule="nonzero" fill="${color3}" transform=""></path>
                    <path d="M 87.4212 599.602 L 88.1449 604.308 L 120.288 604.258 L 122.059 599.511 L 87.4212 599.602 Z" fill-rule="nonzero" fill="rgb(255, 238, 204)" transform=""></path>
                    <path d="M 366.718 593.673 L 300.4 554.52 L 167.015 554.52 L 144.408 592.894 L 366.718 593.673 Z" fill-rule="nonzero" fill="rgb(49, 49, 86)" transform=""></path>
                    <path d="M 115.78 554.523 L 135.755 554.52 L 92.7934 591.186 L 115.78 554.523 Z" fill-rule="nonzero" fill="rgb(49, 49, 86)" transform=""></path>
                    <path d="M 251.675 551.745 L 247.259 553.114 L 256.117 605.313 L 260.799 604.338 L 251.675 551.745 Z" fill-rule="nonzero" fill="${color1}" transform=""></path>
                    <path d="M 336.932 588.557 L 336.47 593.572 L 330.602 593.546 L 331.187 587.73 L 336.932 588.557 Z" fill-rule="nonzero" fill="rgb(255, 128, 0)" transform=""></path>
                    <path d="M 336.932 588.557 L 337.808 579.353 L 320.571 576.141 L 318.381 588.702 L 336.932 588.557 Z" fill-rule="nonzero" fill="${color1}" transform=""></path>
                    <g transform-origin="center" style="transform-box: fill-box" transform="translate(0, 5)">
                        <path d="M 163.828 666.077 C 163.828 675.192 171.218 682.582 180.334 682.582 C 189.45 682.582 196.84 675.192 196.84 666.077 C 196.84 656.96 189.45 649.57 180.334 649.57 C 171.218 649.57 163.828 656.96 163.828 666.077" fill-rule="nonzero" fill="rgb(255, 191, 0)" transform=""></path>
                        <path
                            d="M 164.846 665.911 C 164.846 657.706 171.497 651.055 179.701 651.055 C 187.905 651.055 194.556 657.706 194.556 665.911 C 194.556 674.115 187.905 680.766 179.701 680.766 C 171.497 680.766 164.846 674.115 164.846 665.911 M 155.745 665.91 C 155.745 679.138 166.47 689.865 179.701 689.865 C 192.931 689.865 203.657 679.138 203.657 665.91 C 203.657 652.679 192.931 641.954 179.701 641.954 C 166.47 641.954 155.745 652.679 155.745 665.91"
                            fill-rule="nonzero"
                            fill="rgb(42, 43, 42)"
                            transform=""
                        ></path>
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            begin="-0.00001"
                            dur="3.00002"
                            keyTimes="0; 0.08000000000000002; 0.17633333333333337; 0.26699999999999996; 0.36033333333333323; 0.47000000000000014; 0.5803333333333333; 0.6766666666666667; 0.7773333333333331; 0.8839999999999999; 1"
                            values="0, 5; 0, -2; 0, 5; 0, 5; 0, -2; 0, 5; 0, -2; 0, 5; 0, 5; 0, -2; 0, 5"
                            fill="freeze"
                            additive="sum"
                            keySplines="0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1"
                            repeatCount="indefinite"
                        ></animateTransform>
                    </g>
                    <g transform-origin="center" transform="translate(0, 5)" style="transform-box: fill-box">
                        <path d="M 389.025 666.077 C 389.025 675.192 396.415 682.582 405.531 682.582 C 414.647 682.582 422.037 675.192 422.037 666.077 C 422.037 656.96 414.647 649.57 405.531 649.57 C 396.415 649.57 389.025 656.96 389.025 666.077" fill-rule="nonzero" fill="rgb(255, 191, 0)" transform=""></path>
                        <path
                            d="M 390.043 665.911 C 390.043 657.706 396.694 651.055 404.898 651.055 C 413.102 651.055 419.753 657.706 419.753 665.911 C 419.753 674.115 413.102 680.766 404.898 680.766 C 396.694 680.766 390.043 674.115 390.043 665.911 M 380.942 665.91 C 380.942 679.138 391.667 689.865 404.898 689.865 C 418.128 689.865 428.854 679.138 428.854 665.91 C 428.854 652.679 418.128 641.954 404.898 641.954 C 391.667 641.954 380.942 652.679 380.942 665.91"
                            fill-rule="nonzero"
                            fill="rgb(42, 43, 42)"
                            transform=""
                        ></path>
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            begin="-0.00001"
                            dur="3.00002"
                            keyTimes="0; 0.08000000000000002; 0.17633333333333337; 0.26699999999999996; 0.36033333333333323; 0.47000000000000014; 0.5803333333333333; 0.6766666666666667; 0.7773333333333331; 0.8839999999999999; 1"
                            values="0, 5; 0, -2; 0, 5; 0, 5; 0, -2; 0, 5; 0, -2; 0, 5; 0, 5; 0, -2; 0, 5"
                            fill="freeze"
                            additive="sum"
                            keySplines="0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1"
                            repeatCount="indefinite"
                        ></animateTransform>
                    </g>
                </g>
                <line stroke="rgb(255, 255, 255)" stroke-width="10" transform-origin="center" x1="200.34869268742574" y1="118.33739471435547" x2="202.16105535832418" y2="70.61333465576172" style="transform-box: fill-box">
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        begin="-0.00001"
                        dur="3.00002"
                        keyTimes="0; 0.08000000000000002; 0.17666666666666667; 0.26666666666666666; 0.36033333333333323; 0.47000000000000014; 0.5803333333333331; 0.6766666666666667; 0.7773333333333333; 0.884; 1"
                        values="0, 0;-10, 0;-20, 0;-30, 0;-40, 0;-50, 0;-60, 0;-70, 0;-80, 0;-90, 0;0, 0"
                        fill="freeze"
                        additive="sum"
                        calcMode="spline"
                        keySplines="0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1;0 0 1 1"
                        repeatCount="indefinite"
                    ></animateTransform>
                    <animate attributeName="opacity" keyTimes="0; 0.47904191616766467; 0.895209580838323; 1" values="1; 0; 0; 1" begin="2.3319899999999993" dur="0.6680200000000006" fill="freeze" calcMode="spline" keySplines="0 0 1 1; 0 0 1 1; 0 0 1 1" repeatCount="indefinite"></animate>
                </line>
            </g>
        </svg>`;
    }
}
