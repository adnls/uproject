import React, { Component } from 'react';
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
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
          <NavItem className="px-3">
              <NavLink href="#/">"Notre logo"</NavLink>
          </NavItem>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarMinimize}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
          <Nav className="d-md-down-none mr-auto" navbar>
              <NavItem className="px-3">
                  <NavLink href="#/Profil">Profil</NavLink>
              </NavItem>
              <NavItem className="px-3">
                  <NavLink href="#/Market">Market</NavLink>
              </NavItem>
              <NavItem className="px-3">
                  <NavLink href="#Strategy">Strategy</NavLink>
              </NavItem>
          </Nav>
        <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>

      </header>
    )
  }
}

export default Header;
