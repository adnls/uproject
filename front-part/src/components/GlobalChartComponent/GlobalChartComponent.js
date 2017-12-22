import React, {Component} from 'react';
// Service de draw des graphs
import DrawPieChart from './service/DrawPieChart.service';

let visualizationDiv = null;

class GlobalChartComponent extends Component {
    componentDidMount() {
        DrawPieChart(visualizationDiv);
    }

    render() {
        return (
            <div className="container-fluid containerFluidForCard">
                <div className="col-md-8">
                    <canvas className="card cardPadding" ref={(thisDiv) => {
                        visualizationDiv = thisDiv;
                    }}>
                    </canvas>
                </div>
            </div>
        )
    }
}

export default GlobalChartComponent;