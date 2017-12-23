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

    redrawChart() {

    }
}
function DrawCandleSticksGraph(visualizationElement, data) {
    const createCandleSticksService = new CreateCandleSticksService();
    const readCandleSticksService = new ReadCandleSticksService;
    const removeCandleSticksService = new RemoveCandleSticksService;
    const updateCandleSticksService = new UpdateCandleSticksService;

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

    let myData = readCandleSticksService.dataParser(data, parseDate);

    // Creation des scale x et y (nécessaire a la creation des axes)
    const xAndYScale = createCandleSticksService.createScale(myData, sizeWithMargin, parseDate);
    // Creation du svg et autres container
    const svgContainer = createCandleSticksService.createSvgAndContainer(visualizationElement, size);
    // Creation des axes
    createCandleSticksService.createAndInstantiateAxis(xAndYScale, svgContainer.rectAndAxisContainer, sizeWithMargin);
    // Creation des elements rectangulaires (bars de l'histogramme)
    // Tous les élements doivent etre crées dans le for (pour éviter de parcourir plusieurs fois l'array de data)
    myData.forEach((oneData) => {
        // Création des rectangle de candleStick
        createCandleSticksService.createRectElement(oneData, svgContainer, xAndYScale);
        // Création des lines au dessus des candleSticks
        createCandleSticksService.createLineElement(oneData, svgContainer, xAndYScale);
    })
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