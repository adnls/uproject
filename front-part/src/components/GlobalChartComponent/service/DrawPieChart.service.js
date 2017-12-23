// Api Call
import currencyTickersCallService from '../../../services/apiCall/currencyTickers';
import currencyTickersFakeCallService from '../../../services/fakeApiCall/currencyTickers';

// Chart.js lib call
import Chart from 'chart.js';

// Env
const useApi = false;

class DrawClass {
    constructor() {
        // variable
        this.dataFromHttpCall = {};
        this.globalData = {};
        this.pieChartDataArray = [];
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

    foundArrayOfData() {
        this.globalData = this.dataFromHttpCall[0]['1min']['global'].pop();
        const totalmc = this.globalData['totalmc'];
        this.pieChartDataArray.push(parseFloat(this.globalData['btcpct']));
        let actualCrypto = this.dataFromHttpCall[0]['1min']['tickers'][0]['ethereum'].pop()['mc_usd'];
        this.pieChartDataArray.push((actualCrypto * 100) / totalmc);
        this.pieChartDataArray = this.pieChartDataArray.map(function (oneData) {
            return Math.round(oneData * 100) / 100;
        });
        this.pieChartDataArray.push(4.12);
    }

    drawPieChart(visualizationElement) {
        this.foundArrayOfData();
        // Instanciation de la class issue de la lib chart.js
        const myChart = new Chart(visualizationElement.getContext('2d'), {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: this.pieChartDataArray,
                    backgroundColor: [
                        '#9b59b6',
                        '#3498db',
                        '#D93240'
                    ]
                }],
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Bitcoin',
                    'Ethereum',
                    'Bliblou'
                ]
            }
        });

    }

}
export default function DrawPieChart(visualizationElement) {
    const drawClass = new DrawClass();
    drawClass.drawPieChart(visualizationElement);
}
