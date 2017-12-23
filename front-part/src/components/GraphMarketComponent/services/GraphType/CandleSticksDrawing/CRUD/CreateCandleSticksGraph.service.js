// d3 lib import
import * as d3 from 'd3';

// Shared Data container service
import sharedData from '../../data-container.service';

export default class CreateCandleSticksService {
    constructor() {
    }

    createScale(myData, sizeWithMargin, parseDate) {
        const timeDomain = {
            start: parseDate(sharedData['timeDomain']['start']),
            end: parseDate(sharedData['timeDomain']['end'])
        };

        const xAndYScale = {};
        xAndYScale['xScale'] = d3.scaleTime()
            .domain([timeDomain.start, timeDomain.end])
            .rangeRound([0, sizeWithMargin.windowWidthWithMargin]);

        // Found max value of employeeNumber for yScale domain
        const yMax = function () {
            return {
                yMax: Math.max.apply(null, myData.map(d => {
                    return d.max_usd;
                })), ymin: Math.min.apply(null, myData.map(d => {
                    return d.max_usd;
                }))
            };
        };
        const yValue = yMax();
        // TODO: Remplacer le domain par les valeurs en yMax et Ymin pour le candleStick
        xAndYScale['yScale'] = d3.scaleLinear()
        //.domain([yValue[yMin], yValue[yMax]])
            .domain([436, 445])
            .rangeRound([sizeWithMargin.windowHeightWithMargin, 0]);

        return xAndYScale;
    }

    createSvgAndContainer(visualizationElement, size) {
        const svg = d3.select(visualizationElement)
            .append('svg')
            .attr('width', size.windowWidth)
            .attr('height', size.windowHeight)
            .attr('style', 'padding-left: 2rem;background-color: white');
        const rectAndAxisContainer = svg.append('g')
            .attr('style', 'transform: translate(20px,20px)')
            .attr('width', size.windowWidth)
            .attr('height', size.windowHeight)
            .attr('class', 'rectAndAxisContainer');
        const rectContainer = rectAndAxisContainer.append('svg')
            .attr('class', 'rectContainer');
        const lineContainer = rectAndAxisContainer.append('svg')
            .attr('class', 'lineContainer');
        return {
            svg: svg,
            rectAndAxisContainer: rectAndAxisContainer,
            rectContainer: rectContainer,
            lineContainer: lineContainer
        };
    }

    createAndInstantiateAxis(xAndYScale, rectAndAxisContainer, size) {
        // Shared Data
        const xTicksAxis = sharedData['xTicksAxisEvery'];
        // Create x Axis
        const xAxis = d3.axisBottom(xAndYScale['xScale']);
        xAxis.tickArguments([d3[xTicksAxis['format']].every(xTicksAxis['every'])])
            .tickFormat(d3.timeFormat(xTicksAxis['tickFormat']));
        // Instantiate xAxis
        rectAndAxisContainer.append('g')
            .attr('transform', 'translate(0,' + size.windowHeightWithMargin + ')')
            .call(xAxis);
        // Create and instantiate y Axis
        rectAndAxisContainer.append('g')
            .attr('transform', 'translate(0,0)')
            .attr('x', function () {
                return '20px';
            })
            .call(d3.axisLeft(xAndYScale['yScale']));
    }

    createRectElement(oneData, svgContainer, xAndYScale) {
        // Data from shared Data
        const close = `close_${sharedData['usdOrBtc']}`;
        const open = `open_${sharedData['usdOrBtc']}`;
        const candleHeightWhenDiffNull = sharedData['candleStick']['candleHeightWhenDiffNull'];

        const candleStyle = {
            candleWidth: sharedData['candleStick']['candleWidth'],
            candleColor: sharedData['candleStick']['candleColor'],
            candleStrokeColor: sharedData['candleStick']['candleStrokeColor']
        };
        const rectContainer = svgContainer.rectContainer;
        rectContainer.append('rect')
            .attr('class', 'rectTest')
            .attr('id', () => {
                return oneData['av_supp'];
            })
            .attr('x', () => {
                return -(candleStyle.candleWidth / 2) + 'px';
            })
            .attr('y', () => {
                const openCloseDiff = oneData[close] - oneData[open];
                if (openCloseDiff < 0) {
                    return xAndYScale['yScale'](oneData[close]);
                } else {
                    return xAndYScale['yScale'](oneData[open])
                }
            })
            .attr('transform', () => {
                return 'translate(' + xAndYScale['xScale'](oneData['dateheure']) + ',0)';
            })
            .style('stroke', candleStyle.candleStrokeColor)
            .attr('dataValue', () => {
                return oneData[open] + '-' + oneData[close];
            })
            .attr('rx', 2)
            .attr('ry', 2)
            .style('fill', candleStyle.candleColor)
            .attr('width', candleStyle.candleWidth + 'px')
            .attr('height', () => {
                const openCloseDiff = oneData[close] - oneData[open];
                if (openCloseDiff < 0) {
                    return xAndYScale['yScale'](oneData[close]) - xAndYScale['yScale'](oneData[open]);
                } else if (openCloseDiff === 0) {
                    return candleHeightWhenDiffNull + 'px'
                } else {
                    return xAndYScale['yScale'](oneData[open]) - xAndYScale['yScale'](oneData[close]);
                }
            });
    }

    createLineElement(oneData, svgContainer, xAndYScale) {
        console.log('createlineElement');
        // Data from shared Data
        const close = `close_${sharedData['usdOrBtc']}`;
        const open = `open_${sharedData['usdOrBtc']}`;


        const candleStickLine = {
            xPosition: sharedData['candleSticksLine']['xPositionForCandleStickLine'],
            strokeWidth: sharedData['candleSticksLine']['strokeWidth'],
            candleStrokeColor: sharedData['candleSticksLine']['candleStrokeColor']
        };

        const lineContainer = svgContainer.lineContainer;
        lineContainer.append('line')
            .attr('class', 'rectTest')
            .attr('id', () => {
                return oneData['av_supp'];
            })
            .attr('x1', () => {
                return candleStickLine.xPosition + 'px';
            })
            .attr('y1', () => {
                const openCloseDiff = oneData[close] - oneData[open];
                if (openCloseDiff < 0) {
                    return xAndYScale['yScale'](oneData[close]);
                } else {
                    return xAndYScale['yScale'](oneData[open])
                }
            })
            .attr('x2', () => {
                return candleStickLine.xPosition + 'px';
            })
            .attr('y2', () => {
                const openCloseDiff = oneData[close] - oneData[open];
                if (openCloseDiff > 0) {
                    return xAndYScale['yScale'](oneData[close]);
                } else {
                    return xAndYScale['yScale'](oneData[open])
                }
            })
            .attr('transform', () => {
                return 'translate(' + xAndYScale['xScale'](oneData['dateheure']) + ',0)';
            })
            .attr('dataValue', () => {
                return oneData[open] + '-' + oneData[close];
            })
            .style('stroke', candleStickLine.candleStrokeColor)
            .style('stoke-width', candleStickLine.strokeWidth);
    }
}