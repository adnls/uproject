import DrawCandleSticksGraph from './GraphType/CandleSticksDrawing/CandleSticksDrawing.service';
// Api Call
import currencyTickersCallService from '../../../services/apiCall/currencyTickers';
import currencyTickersFakeCallService from '../../../services/fakeApiCall/currencyTickers';


// Env
const useApi = false;

class DrawClass {
    constructor() {
        this.dataFromHttpCall = {};
        // Call http service
        // TODO: Virer tous les api call et utiliser des storages redux pour partager les données
        if (useApi) {
            const apiCallService = new currencyTickersCallService();
            this.dataFromHttpCall = apiCallService.getCurrencyTickers();
        } else {
            const fakeApiCallService = new currencyTickersFakeCallService();
            this.dataFromHttpCall = fakeApiCallService.getCurrencyTickers();
        }
    }

    allGraphDrawManagement(visualizationId) {
        // Création du candleSticks graph
        DrawCandleSticksGraph(visualizationId, this.dataFromHttpCall);
    }

}
export default function DrawGraph(visualizationElement) {
    const drawClass = new DrawClass();
    drawClass.allGraphDrawManagement(visualizationElement);
}
