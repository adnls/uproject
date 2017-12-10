import React, {Component} from 'react';
// Service de draw des graphs
import DrawGraph from '../../components/GraphMarketComponent/services/DrawGraph.service';

// Env variable
const visualisationId = 'js-d3MarketGraphId';
let visualizationDiv = null;
class GraphMarketComponent extends Component {
    componentDidMount() {
        DrawGraph(visualizationDiv);
    }

    render() {
        return (
            <div className="container-fluid containerFluidForCard">
                <div className="card cardPadding" ref={(thisDiv) => {
                    visualizationDiv = thisDiv;
                }}>
                </div>
            </div>
        )
    }
}

export default GraphMarketComponent;