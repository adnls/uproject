import React, {Component} from 'react';
import {
    Nav,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Badge
} from 'reactstrap';

class Header extends Component {

    sidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    sidebarMinimize(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    }

    mobileSidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    asideToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('aside-menu-hidden');
    }

    render() {
        return (
            <header className="app-header navbar">
                <div style={{float: 'left'}}>
                    <NavbarToggler className="d-md-down-none" style={{transform: 'translateY(0.9rem)'}}
                                   onClick={this.sidebarMinimize}>
                        <span className="navbar-toggler-icon"></span>
                    </NavbarToggler>
                    <NavItem className="px-3" style={{transform: 'translate(3rem,-1.1rem)'}}>
                        <NavLink href="#/">"Notre logo"</NavLink>
                    </NavItem>

                </div>
                <NavbarToggler className="d-md-down-none" style={{float: 'right'}} onClick={this.asideToggle}>
                    <i className="fa fa-bell-o"></i>
                </NavbarToggler>

            </header>
        )
    }
}

export default Header;
