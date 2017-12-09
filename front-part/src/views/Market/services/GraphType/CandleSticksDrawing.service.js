class CandleSticksDrawingClass {
    constructor() {
        console.log('CandleSticksDrawingService constructor');
    }

    dataFormating () {
        console.log('CandleSticksDrawingService function');
    }

}
function DrawCandleSticksGraph() {
    const candleSticksDrawingClass = new CandleSticksDrawingClass();
    candleSticksDrawingClass.dataFormating();
}
module.exports = DrawCandleSticksGraph;