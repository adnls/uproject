import React, {Component} from 'react';
// Service de draw des graphs
import DrawPieChart from './service/DrawPieChart.service';

let visualizationDiv = null;

class GlobalChartComponent extends Component {
    componentDidMount() {
        DrawPieChart();
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

export default GlobalChartComponent;