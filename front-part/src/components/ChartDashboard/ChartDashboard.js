import React, {Component} from 'react';
import {
    Nav,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Badge
} from 'reactstrap';

class ChartDashboard extends Component {

    nativeHttpRequest(pathToFile) {
        let httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', pathToFile, true);
        httpRequest.send("success");
        console.log(JSON.stringify(httpRequest));
        return [httpRequest.status, httpRequest.response];
    };

    render() {
        /*let tickers_mock_data = this.nativeHttpRequest('../../../test/mock/tickers_5min.json');//../..//mock/tickers_5min.json
         console.log(tickers_mock_data.status);
         console.log(tickers_mock_data);*/
        return (
            <div className="container-fluid">
                <div className="card">
                    <p>Chart container</p>
                </div>
            </div>
        )
    }
}

export default ChartDashboard;
