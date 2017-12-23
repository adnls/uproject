const sharedData = {
    margin: {
        top: 40,
        bottom: 60,
        left: 100,
        right: 60
    },
    // use in CreateCandleSticksService.createScale
    timeDomain: {
        start: '2017-12-01T12:40:00Z',
        end: '2017-12-01T13:00:00Z'
    },
    // use in CreateCandleSticksService.createAndInstantiateAxis
    xTicksAxisEvery: {
        every: 1,
        format: 'timeMinute',
        tickFormat: '%H:%M'
    },
    // use in CreateCandleSticksService.createRectElement
    usdOrBtc: 'usd', // 'usd' or 'btc' (for open_usd and close_usd)
    candleStick: {
        candleHeightWhenDiffNull: '3',
        candleWidth: '20',
        candleColor: 'lightgrey',
        candleStrokeColor: 'black'
    },
    // used in CreateCandleSticksService.createLineElement
    candleSticksLine: {
        xPositionForCandleStickLine: 0,
        strokeWidth: 3,
        candleStrokeColor: 'black'
    }

};
export default sharedData;