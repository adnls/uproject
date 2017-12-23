import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
// Import de mes component
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

/** Import de mes views pour mon routing **/
// Import de Pages
import Dashboard from '../../views/Dashboard/';
import Profil from '../../views/Profil/';
import Strategy from '../../views/Strategy/';
// Import de Market Pages
import MarketCurrency from '../../views/market/Currency';
import MarketGlobalChart from '../../views/market/GlobalChart';
import MarketRank from '../../views/market/Rank';

class Full extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumb />
                        <Container fluid>
                            <Switch>
                                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                                /* Market Routes */
                                <Route path="/market/currency" name="MarketCurrency" component={MarketCurrency}/>
                                <Route path="/market/globalchart" name="MarketGlobalChart" component={MarketGlobalChart}/>
                                <Route path="/market/rank" name="MarketRank" component={MarketRank}/>
                                /* Profil and Strategy Routes*/
                                <Route path="/profil" name="Profil" component={Profil}/>
                                <Route path="/strategy" name="Strategy" component={Strategy}/>
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>
                        </Container>
                    </main>
                    <Aside />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Full;
