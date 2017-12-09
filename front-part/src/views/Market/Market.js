import React, {Component} from 'react';
import GraphMarketComponent from '../../../src/components/GraphMarketComponent';
import DrawGraph from './services/DrawGraph.service';

class Market extends Component {

    render() {
        return (
            <div className="animated fadeIn">
                Hello Market page
                <GraphMarketComponent/>
            </div>
        )
    }
}
export default Market;
