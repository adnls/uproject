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
        /** CandleStick graph container **/
        const candleStickGraphContainer = rectAndAxisContainer.append('svg')
            .attr('id', 'candleStickGraphContainer');
        const rectContainer = candleStickGraphContainer.append('svg')
            .attr('class', 'rectContainer');
        const lineContainer = candleStickGraphContainer.append('svg')
            .attr('class', 'lineContainer');
        /** Volume graph container **/
        const volumeGraphContainer = rectAndAxisContainer.append('svg')
            .attr('id', 'volumeGraphContainer');
        svg.on('mousemove', () => {
            // TODO: Mettre un timeout pour éviter de surCall la la fct associée au mousemove
            /*if (mouseTimeout) {
             clearTimeout(mouseTimeout);
             }
             const mouseTimeout = setTimeout(() => {
             console.log('mousemove');
             }, 100);*/
            const mousePosition = d3.mouse(d3.event.currentTarget);
            const crossMouseLineContainerElement = document.getElementById('js-crossMouseLineId-candleStickGraph');
            if (crossMouseLineContainerElement) {
                crossMouseLineContainerElement.parentNode.removeChild(crossMouseLineContainerElement);
            }
            const crossMouseContainer = d3.select(d3.event.currentTarget)
                .append('g')
                .attr('id', 'js-crossMouseLineId-candleStickGraph');
            /*crossMouseContainer.prototype.remove = function() {
             this.parentElement.removeChild(this);
             };*/
            this.createCrossMouseLine(mousePosition, 'xLine', crossMouseContainer, size);
            this.createCrossMouseLine(mousePosition, 'yLine', crossMouseContainer, size);
        });
        return {
            svg: svg,
            rectAndAxisContainer: rectAndAxisContainer,
            candleStickGraph: {
                rectContainer: rectContainer,
                lineContainer: lineContainer
            },
            volumeGraph: {
                rectContainer: rectContainer
            }
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
        const rectContainer = svgContainer.candleStickGraph.rectContainer;
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
        // Data from shared Data
        const close = `close_${sharedData['usdOrBtc']}`;
        const open = `open_${sharedData['usdOrBtc']}`;


        const candleStickLine = {
            xPosition: sharedData['candleSticksLine']['xPositionForCandleStickLine'],
            strokeWidth: sharedData['candleSticksLine']['strokeWidth'],
            candleStrokeColor: sharedData['candleSticksLine']['candleStrokeColor']
        };

        const lineContainer = svgContainer.candleStickGraph.lineContainer;
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

    createCrossMouseLine(mousePosition, type, svgContainer, size) {
        // mousePosition[0] = mousePosition en x et mousePosition[1] en y
        svgContainer.append('line')
            .attr('class', 'rectTest')
            .attr('x1', () => {
                if (type === 'yLine') return '18px';
                else return mousePosition[0] + 'px';
            })
            .attr('y1', () => {
                if (type === 'xLine') return 0;
                else return mousePosition[1] + 'px';
            })
            .attr('x2', () => {
                if (type === 'yLine') return size['windowWidth'];
                else return mousePosition[0] + 'px';
            })
            .attr('y2', () => {
                if (type === 'xLine') return size['windowHeight'] - 20;
                else return mousePosition[1] + 'px';
            })
            .style('stroke', 'black');
        //.prototype.remove = function() {
        //   this.parentElement.removeChild(this);
    }
}