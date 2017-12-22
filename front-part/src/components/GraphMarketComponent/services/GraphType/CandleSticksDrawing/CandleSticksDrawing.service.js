// Shared Data container service
import sharedData from '../data-container.service';
// Crud services for candleSticksGraph
// TODO: Répartir les function de la class clandleSticksDrawing dans le CRUD
import CreateCandleSticksService from './CRUD/CreateCandleSticksGraph.service';
import ReadCandleSticksService from './CRUD/ReadCandleSticksGraph.service';
import RemoveCandleSticksService from './CRUD/RemoveCandleSticksGraph.service';
import UpdateCandleSticksService from './CRUD/UpdateCandleSticksGraph.service';

// d3 library call for graph visualisation
import * as d3 from 'd3';


class CandleSticksDrawingClass {

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

    createScale(myData, sizeWithMargin, parseDate) {
        const timeDomain = {
            start: parseDate('2017-12-01T12:40:00Z'),
            end: parseDate('2017-12-01T13:00:00Z')
        };

        const xAndYScale = {};
        xAndYScale['xScale'] = d3.scaleTime()
            .domain([timeDomain.start, timeDomain.end])
            .rangeRound([0, sizeWithMargin.windowWidthWithMargin]);

        // Found max value of employeeNumber for yScale domain
        const yMax = function () {

            const yMaxValue = Math.max.apply(null, myData.map(d => {
                return d.max_usd + 1;
            }));
            if (yMaxValue > 10) {
                return yMaxValue;
            } else {
                return 800;
            }
        };
        xAndYScale['yScale'] = d3.scaleLinear()
        // Domain en y: de 0 à la valeur maximum employeeNumber
        //.domain([440, yMax()])
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
        return {
            svg: svg,
            rectAndAxisContainer: rectAndAxisContainer,
            rectContainer: rectContainer
        };
    }

    createAndInstantiateAxis(xAndYScale, rectAndAxisContainer, size) {
        // Create x Axis
        const xAxis = d3.axisBottom(xAndYScale['xScale']);
        xAxis.tickArguments([d3.timeMinute.every(1)])
            .tickFormat(d3.timeFormat('%H:%M'));
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

    createRectElement(myData, svgContainer, xAndYScale, sizeWithMargin) {
        // const formatedData = myData[0]['1min']['tickers'][0]['ethereum'];
        const rectContainer = svgContainer.rectContainer;
        /*const rects = rectContainer
         .data(formatedData)
         .enter();
         */
        const rects = svgContainer.rectContainer.selectAll('.rectTest').data(myData).enter();
        rects.append('rect')
            .attr('class', 'rectTest')
            .attr('id', function (d) {
                return d['av_supp'];
            })
            .attr('y', function (d) {
                const openCloseDiff = d['close_usd'] - d['open_usd'];
                if (openCloseDiff < 0) {
                    return xAndYScale['yScale'](d['close_usd']);
                } else {
                    return xAndYScale['yScale'](d['open_usd'])
                }
            })
            .attr('transform', function (d) {
                return 'translate(' + xAndYScale['xScale'](d['dateheure']) + ',0)';
            })
            .style('stroke', 'black')
            .attr('dataValue', function (d) {
                return d['open_usd'] + '-' + d['close_usd'];
            })
            .attr('rx', 2)
            .attr('ry', 2)
            .style('fill', 'lightgrey')
            .attr('width', '20px')
            .attr('height', function (d) {
                const openCloseDiff = d['close_usd'] - d['open_usd'];
                /*
                 if (openCloseDiff === 0) {
                 return '2px';
                 } else {
                 console.log(Math.abs(openCloseDiff));
                 xAndYScale['yScale'](Math.abs(openCloseDiff));
                 return xAndYScale['yScale'](Math.abs(openCloseDiff));
                 }*/

                if (openCloseDiff < 0) {
                    return xAndYScale['yScale'](d['close_usd']) - xAndYScale['yScale'](d['open_usd']);
                } else if (openCloseDiff === 0) {
                    return "3px"
                } else {
                    return xAndYScale['yScale'](d['open_usd']) - xAndYScale['yScale'](d['close_usd']);
                }
            });
    }

    redrawChart() {

    }
}
function DrawCandleSticksGraph(visualizationElement, data) {
    // Instantiation de la class
    const candleSticksDrawingClass = new CandleSticksDrawingClass();
    // Récupération des variables
    const margin = sharedData.margin;
    const parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%SZ');
    const size = {
        windowWidth: visualizationElement.offsetWidth - 100,
        windowHeight: 540
    };
    const sizeWithMargin = {
        windowWidthWithMargin: size.windowWidth - margin.left - margin.right,
        windowHeightWithMargin: size.windowHeight - margin.top - margin.bottom
    };

    let myData = candleSticksDrawingClass.dataParser(data, parseDate);

    // Creation des scale x et y (nécessaire a la creation des axes)
    const xAndYScale = candleSticksDrawingClass.createScale(myData, sizeWithMargin, parseDate);
    // Creation du svg et autres container
    const svgContainer = candleSticksDrawingClass.createSvgAndContainer(visualizationElement, size);
    // Creation des axes
    candleSticksDrawingClass.createAndInstantiateAxis(xAndYScale, svgContainer.rectAndAxisContainer, sizeWithMargin);
    // Creation des elements rectangulaires (bars de l'histogramme)
    candleSticksDrawingClass.createRectElement(myData, svgContainer, xAndYScale, sizeWithMargin);

    // TODO: Event listener avec debouce a réparer
    // Gestion des Event listener permettant le resizing des graph a chaque resize de la fenetre de navigateur
    /*
     function eventListenerWithDebounce(redrawChartFunction, actualDayVariable) {
     // permet d'aviter l'accumulation d'eventListener avec les appel conssécutif à redrawChart.
     function removeEvent() {
     const timeout = setTimeout(() => {
     redrawChartFunction(actualDayVariable);
     }, 300);
     if (timeout) {
     clearTimeout(timeout);
     }
     window.removeEventListener('resize', removeEvent);
     }
     window.addEventListener('resize', removeEvent);
     }
     eventListenerWithDebounce(this.redrawChart);*/

}
export default DrawCandleSticksGraph;