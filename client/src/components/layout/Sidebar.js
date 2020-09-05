import React, { Component } from "react";
import { Link } from "react-router-dom";
import { changePage } from "../../actions/pages";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class Sidebar extends Component {

  componentDidMount() {
    this.props.changePage(this.props.location.pathname.replace("/", ""));
 }
  getClassName = (name) => {
    const { pathname } = this.props.location;
    let { active } = this.props;
  
    const path = pathname.split("/");
    const activepath = active.split("/");

    if (activepath[0] === path[1]) {
     
      active = path[1];
    }

    if (active === name) {
      return "mm-active";
    }
    return "";
  };

  handleClick = (name) => {
    this.props.changePage(name);
  };
  render() {

    return (
      <div data-active-color="white" data-background-color="purple-bliss" data-image="assets/img/sidebar-bg/01.jpg" className="app-sidebar">

        <div className="sidebar-header">
          <div className="logo clearfix">
          <Link
                      to="/dashboard" className="logo-text float-left">
              <div className="logo-img text-center align-middle mt-n3 mb-2">
                <img src="assets/img/logo.png" height={70} width={70}/>
              </div>
              {/* <span className="text align-middle"></span> */}
</Link>            
          </div>
        </div>
        <div className="sidebar-content">
          <div className="nav-container">
            <ul id="main-menu-navigation"
             data-menu="menu-navigation" data-scroll-to-active="true" className="navigation navigation-main">
              <li className="nav-item">
              <Link
                      to="/dashboard"
                      onClick={() => this.handleClick("dashboard")}
                      className={this.getClassName("dashboard")}
                    >
                      <i className="ft-home" /> Dashboard
                </Link>
              </li>
              <li className="has-sub nav-item">
              <a href="#" className={this.getClassName("users")}>
                <i className="ft-users"></i>
                  <span className="menu-title">Users</span>
                </a>
                <ul className="menu-content">
                  <li >
                  <Link
                          to="/adduser"
                          onClick={() => this.handleClick("addusers")}
                          className={this.getClassName("addusers")}
                        >
                          <i className="menu-item" /> Add Users
                    </Link>
                  </li>
                  <li>
                  <Link
                          to="/viewuser"
                          onClick={() => this.handleClick("viewusers")}
                          className={this.getClassName("viewusers")}
                        >
                          <i className="menu-item" /> View Users
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="has-sub nav-item"><a href="#">
                <i className="icon-social-dropbox">
                </i><span className="menu-title">Products</span>
              </a>
                <ul className="menu-content">
                  <li>  <Link
                          to="/addproduct"
                          onClick={() => this.handleClick("addproduct")}
                          className={this.getClassName("addproduct")}
                        >
                          <i className="menu-item" /> Add Product
                    </Link>
                  </li>
                  <li> 
                    <Link
                          to="/viewproduct"
                          onClick={() => this.handleClick("viewproduct")}
                          className={this.getClassName("viewproduct")}
                        >
                          <i className="menu-item" /> View Product
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="has-sub nav-item">
                <a href="#"><i className="ft-user"></i>
                  <span className="menu-title">Customers</span>
                </a>
                <ul className="menu-content">
                  <li >
                       <Link
                          to="/addcustomer"
                          onClick={() => this.handleClick("addcustomer")}
                          className={this.getClassName("addcustomer")}
                        >
                          <i className="menu-item" />  Add Customer
                    </Link>
                  </li>
                  <li>
                       <Link
                          to="/viewcustomer"
                          onClick={() => this.handleClick("viewcustomer")}
                          className={this.getClassName("viewcustomer")}
                        >
                          <i className="menu-item" />  View Customer
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
              <Link
                      to="/rentproduct"
                      onClick={() => this.handleClick("rentproduct")}
                      className={this.getClassName("rentproduct")}
                    >
                      <i className="icon-basket-loaded" />  Rent a Product
                </Link>
              </li>
              <li className=" nav-item">
              <Link
                      to="/orders"
                      onClick={() => this.handleClick("orders")}
                      className={this.getClassName("orders")}
                    >
                      <i className="icon-bag" />  Orders
                </Link>
              </li>
              <li className=" nav-item">
              <Link
                      to="/appointments"
                      onClick={() => this.handleClick("appointments")}
                      className={this.getClassName("appointments")}
                    >
                      <i className="ft-activity" />  Add Fitting Appointment
                </Link>
              </li>
              <li className=" nav-item">
              <Link
                      to="/calender"
                      onClick={() => this.handleClick("calender")}
                      className={this.getClassName("calender")}
                    >
                      <i className="ft-calendar" />  Calender
                </Link>
              </li>
              <li className=" nav-item">
              <Link
                      to="/reports"
                      onClick={() => this.handleClick("reports")}
                      className={this.getClassName("reports")}
                    >
                      <i className="ft-clipboard" />  Report
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebar-background"></div>
      </div>


    );
  }
}

Sidebar.propTypes = {
  active: PropTypes.string,
  changePage: PropTypes.func,
  location: PropTypes.object,
  auth: PropTypes.object,

};

const mapStateToProps = (state) => ({
  active: state.pages.active,
  changePage: state.pages.changePage,
  auth: state.auth,

});

export default connect(mapStateToProps, {
changePage
})(Sidebar);
