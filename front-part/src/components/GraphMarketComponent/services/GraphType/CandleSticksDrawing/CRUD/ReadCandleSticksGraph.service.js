export default class ReadCandleSticksService {
    constructor() {
    }

    dataParser(data, parseDate) {
        const myData = data[0]['1min']['tickers'][0]['ethereum'];
        myData.forEach(function (oneData) {
            /** xScale and xAxis **/
            oneData['dateheure'] = parseDate(oneData['dateheure']);
            /** CandleStick graph value **/
            oneData['close_usd'] = parseFloat(oneData['close_usd']);
            oneData['open_usd'] = parseFloat(oneData['open_usd']);
            /** Volume graph value **/
            oneData['volume24h_usd'] = parseInt(oneData['volume24h_usd']);
        });
        return myData;
    }
}