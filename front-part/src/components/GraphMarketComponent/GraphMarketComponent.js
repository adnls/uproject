import React, {Component} from 'react';

class GraphMarketComponent extends Component {

    render() {
        return (
            <div className="container-fluid containerFluidForCard">
                <div className="card cardPadding">
                    <h3>GraphMarketComponent Container for visualization Division</h3>
                    <p>visualization-id = js-d3MarketGraphId</p>
                </div>
                <div id="js-d3MarketGraphId">

                </div>
            </div>
        )
    }
}
export default GraphMarketComponent;