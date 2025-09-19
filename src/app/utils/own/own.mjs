export default class OwnUtils {
    static getWindowSize() {
        const windowSize = { x: window.innerWidth, y: window.innerHeight };

        return windowSize;
    }

    static fromPixelsToNumber(pixels) {
        const number = parseFloat(pixels.replace('px', ''));
        return number;
    }
}
