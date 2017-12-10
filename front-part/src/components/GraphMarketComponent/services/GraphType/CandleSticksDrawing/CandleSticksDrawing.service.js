// Shared Data container service
import sharedData from '../data-container.service';
// Crud services for candleSticksGraph
// TODO: Répartir les function de la class clandleSticksDrawing dans le CRUD
import CreateCandleSticksService from './CRUD/CreateCandleSticksGraph.service';
import ReadCandleSticksService from './CRUD/ReadCandleSticksGraph.service.service';
import RemoveCandleSticksService from './CRUD/RemoveCandleSticksGraph.service.service';
import UpdateCandleSticksService from './CRUD/UpdateCandleSticksGraph.service.service';

// d3 library call for graph visualisation
import * as d3 from 'd3';


class CandleSticksDrawingClass {
    parseDate;
    margin;
    size;
    sizeWithMargin;

    constructor() {
        this.margin = sharedData.margin;
        this.parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%SZ');
        this.size = {
            windowWidth: element.offsetWidth,
            windowHeight: 540
        };
        this.sizeWithMargin = {
            windowWidthWithMargin: this.size.windowWidth - this.margin.left - this.margin.right,
            windowHeightWithMargin: this.size.windowHeight - this.margin.top - this.margin.bottom
        };
    }

    drawManagement(visualizationId) {
        console.log(visualizationId);
    }

    dataParser(data) {
        console.log(data);
        console.log(this.margin);
    }

    createScale(myData, sizeWithMargin) {
        const timeDomain = {
            start: this.parseDate('2017-03-01T00:00:00Z'),
            end: this.parseDate('2017-03-02T00:00:00Z')
        };

        const xAndYScale = {};
        xAndYScale['xScale'] = d3.scaleTime()
            .domain([timeDomain.start, timeDomain.end])
            .rangeRound([0, sizeWithMargin.windowWidthWithMargin]);

        // Found max value of employeeNumber for yScale domain
        const yMax = function () {
            const yMaxValue = Math.max.apply(null, myData.map(d => {
                return d.employeeNumber + 1;
            }));
            if (yMaxValue > 10) {
                return yMaxValue;
            } else {
                return 10;
            }
        };
        xAndYScale['yScale'] = d3.scaleLinear()
        // Domain en y: de 0 à la valeur maximum employeeNumber
            .domain([0, yMax()])
            .rangeRound([sizeWithMargin.windowHeightWithMargin, 0]);

        return xAndYScale;

    }


    createSvgAndContainer(visualizationId, size) {
        const svg = d3.select('.' + visualizationId)
            .append('svg')
            .attr('width', size.windowWidth)
            .attr('height', size.windowHeight)
            .style('background-color', 'white');
        const rectAndAxisContainer = svg.append('g')
            .attr('style', 'transform: translate(20px,20px)')
            .attr('width', size.windowWidth)
            .attr('height', size.windowHeight)
            .attr('class', 'rectAndAxisContainer');
        const rectContainer = rectAndAxisContainer.append('g')
            .attr('class', 'rectContainer');
        return {
            svg: svg,
            rectAndAxisContainer: rectAndAxisContainer,
            rectContainer: rectContainer
        };
    }

    createAndInstantiateAxis(visualizationId, xAndYScale, rectAndAxisContainer, size) {
        // Create x Axis
        const xAxis = d3.axisBottom(xAndYScale['xScale']);
        xAxis.tickArguments([d3.timeMinute.every(60)])
            .tickFormat(d3.timeFormat('%H'));
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

    }

    redrawChart() {

    }
}
function DrawCandleSticksGraph(visualizationId, data) {
    // Instantiation de la class
    const candleSticksDrawingClass = new CandleSticksDrawingClass();
    candleSticksDrawingClass.drawManagement(visualizationId);
    // Récupération des variables
    const margin = sharedData.margin;
    const parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%SZ');
    const size = {
        windowWidth: element.offsetWidth,
        windowHeight: 540
    };
    const sizeWithMargin = {
        windowWidthWithMargin: size.windowWidth - margin.left - margin.right,
        windowHeightWithMargin: size.windowHeight - margin.top - margin.bottom
    };
    let myData = candleSticksDrawingClass.dataParser(data);
    // Creation des scale x et y (nécessaire a la creation des axes)
    const xAndYScale = candleSticksDrawingClass.createScale(myData, sizeWithMargin);
    // Creation du svg et autres container
    const svgContainer = candleSticksDrawingClass.createSvgAndContainer(element, size);
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
module.exports = DrawCandleSticksGraph;