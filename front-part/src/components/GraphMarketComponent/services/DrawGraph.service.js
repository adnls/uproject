import DrawCandleSticksGraph from './GraphType/CandleSticksDrawing/CandleSticksDrawing.service';

// Env
const useApi = false;

// variable
let dataFromHttpCall = {};

class DrawClass {
    constructor() {
        // Call http service
        if (useApi)
            dataFromHttpCall = 'httpRequest';
        else
            dataFromHttpCall = 'd';
    }

    allGraphDrawManagement(visualizationId, data) {
        // Création du candleSticks graph
        DrawCandleSticksGraph(visualizationId, data);
    }

}
export default function DrawGraph(visualizationId) {
    const drawClass = new DrawClass();
    drawClass.allGraphDrawManagement(visualizationId, dataFromHttpCall);
}
