// d3 lib import
import * as d3 from 'd3';

// Shared Data container service
import sharedData from '../../data-container.service';

export default class CreateVolumeGraphService {
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
                    return d.volume24h_usd;
                })),
                ymin: Math.min.apply(null, myData.map(d => {
                    return d.volume24h_usd;
                }))
            };
        };
        const yValue = yMax();
        // TODO: Remplacer le domain par les valeurs en yMax et Ymin pour le candleStick
        xAndYScale['yScale'] = d3.scaleLinear()
            //.domain([yValue['yMin'], yValue['yMax']])
            .domain([1241780000, 1499760000])
            .rangeRound([sizeWithMargin.windowHeightWithMargin, 0]);
        console.log(xAndYScale['yScale'](yValue['yMin']));
        return xAndYScale;
    }

    createRectElement(oneData, svgContainer, xAndYScale, size) {
        // Data from shared Data
        const volumeStyle = {
            width: sharedData['volumeGraph']['candleWidth'],
            color: sharedData['volumeGraph']['candleColor'],
            strokeColor: sharedData['volumeGraph']['candleStrokeColor']
        };
        const rectContainer = svgContainer.volumeGraph.rectContainer;
        rectContainer.append('rect')
            .attr('x', () => {
                return -(volumeStyle.width / 2) + 'px';
            })
            .attr('y', () => {
                return size.windowHeightWithMargin - xAndYScale['yScale'](oneData['volume24h_usd']);
            })
            .attr('transform', () => {
                return 'translate(' + xAndYScale['xScale'](oneData['dateheure']) + ',0)';
            })
            .style('stroke', volumeStyle.strokeColor)
            .attr('rx', 2)
            .attr('ry', 2)
            .style('fill', volumeStyle.color)
            .attr('width', volumeStyle.width + 'px')
            .attr('height', () => {
                const height = xAndYScale['yScale'](oneData['volume24h_usd']);
                console.log(height);
                return height;
            });
    }
}