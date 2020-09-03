import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Header extends Component {
  
  
  render() {
  
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-faded header-navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" data-toggle="collapse" className="navbar-toggle d-lg-none float-left"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button><span className="d-lg-none navbar-right navbar-collapse-toggle"><a aria-controls="navbarSupportedContent" href="#" className="open-navbar-container black"><i className="ft-more-vertical"></i></a></span>
            <form role="search" className="navbar-form navbar-right mt-1">
              <div className="position-relative has-icon-right">
                <input type="text" placeholder="Search" className="form-control round"/>
                <div className="form-control-position"><i className="ft-search"></i></div>
              </div>
            </form>
          </div>
          <div className="navbar-container">
            <div id="navbarSupportedContent" className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item mr-2 d-none d-lg-block"><a id="navbar-fullscreen" href="#" className="nav-link apptogglefullscreen"><i className="ft-maximize font-medium-3 blue-grey darken-4"></i>
                    <p className="d-none">fullscreen</p></a></li>
                <li className="dropdown nav-item"><a id="dropdownBasic3" href="#" data-toggle="dropdown" className="nav-link position-relative dropdown-toggle"><i className="ft-user font-medium-3 blue-grey darken-4"></i>
                    <p className="d-none">User Settings</p></a>
                  <div ngbdropdownmenu="" aria-labelledby="dropdownBasic3" className="dropdown-menu text-left dropdown-menu-right"><a href="../../../html/html/ltr/chat.html" className="dropdown-item py-1"><i className="ft-message-square mr-2"></i><span>Chat</span></a><a href="../../../html/html/ltr/user-profile-page.html" className="dropdown-item py-1"><i className="ft-edit mr-2"></i><span>Edit Profile</span></a><a href="../../../html/html/ltr/inbox.html" className="dropdown-item py-1"><i className="ft-mail mr-2"></i><span>My Inbox</span></a>
                    <div className="dropdown-divider"></div><a href="../../../html/html/ltr/login-page.html" className="dropdown-item"><i className="ft-power mr-2"></i><span>Logout</span></a>
                  </div>
                </li>
     
              </ul>
            </div>
          </div>
        </div>
      </nav>

  );
  }
}


export default Header;
