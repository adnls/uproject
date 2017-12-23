// Api Call
import currencyTickersCallService from '../../../services/apiCall/currencyTickers';
import currencyTickersFakeCallService from '../../../services/fakeApiCall/currencyTickers';

// Shared Data container service
import sharedData from './GraphType/data-container.service';
// Crud services for candleSticksGraph
// TODO: Répartir les function de la class clandleSticksDrawing dans le CRUD
import CreateCandleSticksService from './GraphType/CandleSticksDrawing/CRUD/CreateCandleSticksGraph.service';
import ReadCandleSticksService from './GraphType/CandleSticksDrawing/CRUD/ReadCandleSticksGraph.service';
import RemoveCandleSticksService from './GraphType/CandleSticksDrawing/CRUD/RemoveCandleSticksGraph.service';
import UpdateCandleSticksService from './GraphType/CandleSticksDrawing/CRUD/UpdateCandleSticksGraph.service';
// Crud services for volume graph
import CreateVolumeGraphService from './GraphType/VolumeGraphDrawing/CRUD/CreateVolumeGraph.service';

// d3 library call for graph visualisation
import * as d3 from 'd3';

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

    DrawCandleSticksGraph(visualizationElement, data) {
        // Instantiation des class de création du candleSticks
        const createCandleSticksService = new CreateCandleSticksService();
        const readCandleSticksService = new ReadCandleSticksService;
        const removeCandleSticksService = new RemoveCandleSticksService;
        const updateCandleSticksService = new UpdateCandleSticksService;
        // Instantiation des class de création du graph volume
        const createVolumeGraphService = new CreateVolumeGraphService();

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
        const xAndYScaleForCandleStick = createCandleSticksService.createScale(myData, sizeWithMargin, parseDate);
        const xAndYScaleForVolume = createVolumeGraphService.createScale(myData, sizeWithMargin, parseDate);
        // Creation du svg et autres container
        const svgContainer = createCandleSticksService.createSvgAndContainer(visualizationElement, size);
        // Creation des axes
        createCandleSticksService.createAndInstantiateAxis(xAndYScaleForCandleStick, svgContainer.rectAndAxisContainer, sizeWithMargin);
        // Creation des elements rectangulaires (bars de l'histogramme)
        // Tous les élements doivent etre crées dans le for (pour éviter de parcourir plusieurs fois l'array de data)
        myData.forEach((oneData) => {
            /** Candlestick graph elements creation **/
            // Création des rectangle de candleStick
            createCandleSticksService.createRectElement(oneData, svgContainer, xAndYScaleForCandleStick);
            // Création des lines au dessus des candleSticks
            createCandleSticksService.createLineElement(oneData, svgContainer, xAndYScaleForCandleStick);
            /** Volume graph elements creation **/
            createVolumeGraphService.createRectElement(oneData, svgContainer, xAndYScaleForVolume, sizeWithMargin)
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

    allGraphDrawManagement(visualizationId) {
        // Création du candleSticks graph
        this.DrawCandleSticksGraph(visualizationId, this.dataFromHttpCall);
    }
}
export default function DrawGraph(visualizationElement) {
    const drawClass = new DrawClass();
    drawClass.allGraphDrawManagement(visualizationElement);
}
