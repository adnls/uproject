import DrawCandleSticksGraph from './GraphType/CandleSticksDrawing.service';

class DrawClass {
    constructor() {
        // Call http service
        console.log('DrawClass constructor');
    }

    dataFormating() {
        console.log('DrawClassFunction');
    }

}
function DrawGraph() {
    const drawClass = new DrawClass();
    drawClass.dataFormating();
}
module.exports = DrawGraph;