import React, {Component} from 'react';
import ChartDashboard from '../../components/ChartDashboard/ChartDashboard';

class Dashboard extends Component {

    render() {
        return (
            <div className="animated fadeIn">
                Hello Dashboard
                <ChartDashboard/>
            </div>
        )
    }
}

export default Dashboard;
