export default class ReadCandleSticksService {
    constructor() {
    }

    dataParser(data, parseDate) {
        const myData = data[0]['1min']['tickers'][0]['ethereum'];
        myData.forEach(function (oneData) {
            oneData['dateheure'] = parseDate(oneData['dateheure']);
            oneData['close_usd'] = parseFloat(oneData['close_usd']);
            oneData['open_usd'] = parseFloat(oneData['open_usd']);
        });
        return myData;
    }
}