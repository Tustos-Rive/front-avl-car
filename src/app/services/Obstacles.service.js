export default class ObstacleService {
    constructor() {}
    // TODO: Check this logic and more!
    validateCoordinates(cooridates) {
        try {
            const req = Helpers.fetchJSON(`${URLAPI}/obstacles/validateCoordinates`, {
                method: 'POST',
                body: cooridates,
            });
        } catch (e) {}
    }
}
