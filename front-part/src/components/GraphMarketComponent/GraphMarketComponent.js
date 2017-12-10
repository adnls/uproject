import React, {Component} from 'react';
// Service de draw des graphs
import DrawGraph from '../../components/GraphMarketComponent/services/DrawGraph.service';

// Env variable
const visualisationId = 'js-d3MarketGraphId';

class GraphMarketComponent extends Component {

    render() {
        DrawGraph(visualisationId);
        return (
            <div className="container-fluid containerFluidForCard">
                <div className="card cardPadding">
                    <h3>GraphMarketComponent Container for visualization Division</h3>
                    <br/>
                    <h4>visualization-id = visualizationId</h4>
                </div>
                <div id={{visualisationId}}>
                </div>
            </div>
        )
    }
}

export default GraphMarketComponent;