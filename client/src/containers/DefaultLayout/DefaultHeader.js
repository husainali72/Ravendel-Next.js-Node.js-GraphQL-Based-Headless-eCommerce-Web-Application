import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem
} from "reactstrap";
import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
import logo from "../../assets/img/brand/logo.svg";
import sygnet from "../../assets/img/brand/sygnet.svg";

import { logoutAction } from "../../store/action/loginAction";

const DefaultHeader = props => {
  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logo, width: 89, height: 25, alt: "CoreUI Logo" }}
        minimized={{ src: sygnet, width: 30, height: 30, alt: "CoreUI Logo" }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />

      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav>
            <img
              src={"../../assets/img/avatars/6.jpg"}
              className="img-avatar"
              alt="admin@bootstrapmaster.com"
            />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header tag="div" className="text-center">
              <strong>Account</strong>
            </DropdownItem>

            <DropdownItem onClick={props.logoutAction}>
              <i className="fa fa-lock"></i> Logout test
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  logoutAction
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);
