import DrawCandleSticksGraph from './GraphType/CandleSticksDrawing/CandleSticksDrawing.service';
// Api Call
import currencyTickersCallService from '../../../services/apiCall/currencyTickers';
import currencyTickersFakeCallService from '../../../services/fakeApiCall/currencyTickers';


// Env
const useApi = false;

// variable
let dataFromHttpCall = {};

class DrawClass {
    constructor() {
        // Call http service
        if (useApi) {
            const apiCallService = new currencyTickersCallService();
            dataFromHttpCall = apiCallService.getCurrencyTickers();
        } else {
            const fakeApiCallService = new currencyTickersFakeCallService();
            dataFromHttpCall = fakeApiCallService.getCurrencyTickers();
        }
    }

    allGraphDrawManagement(visualizationId, data) {
        // Création du candleSticks graph
        DrawCandleSticksGraph(visualizationId, data);
    }

}
export default function DrawGraph(visualizationElement) {
    const drawClass = new DrawClass();
    drawClass.allGraphDrawManagement(visualizationElement, dataFromHttpCall);
}
