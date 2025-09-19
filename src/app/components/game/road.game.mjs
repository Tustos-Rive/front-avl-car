export default async function RoadGame() {
    const htmlRoad = await __getRoadHtml();

    return htmlRoad;
}

async function __getRoadHtml() {
    try {
        const req = await Helpers.fetchText('./app/assets/html/road.html');

        Toast.show({ message: 'Road loaded successfully!', mode: 'success' });

        return req;
    } catch (error) {
        Toast.show({ message: 'Error while trying load Road', mode: 'danger', error: error });
    }
}
