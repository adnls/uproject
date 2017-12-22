import React, {Component} from 'react';
import GraphMarketComponent from '../../../components/GraphMarketComponent/GraphMarketComponent';

class MarketCurrency extends Component {
    render() {
        return (
            <div className="animated fadeIn">
                Hello MarketCurrency page
                <GraphMarketComponent/>
            </div>
        )
    }
}
export default MarketCurrency;
