import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import loadjs from 'loadjs';



class Header extends Component {
  state = {
      id:"",
  };

  componentDidMount() {
    loadjs(`${process.env.PUBLIC_URL}/assets/test.js`, () => {});
  }

  componentWillReceiveProps(nextProps) {
      const { user } = nextProps.auth;
      if(user != undefined) {
        this.setState({
        username: user.fullName,
        userType: user.type,
        id:user._id,
        avatar:user.avatar
      });
      }
     }
   
  
  render() {
  
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-faded header-navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" data-toggle="collapse" className="navbar-toggle d-lg-none float-left"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button><span className="d-lg-none navbar-right navbar-collapse-toggle"><a aria-controls="navbarSupportedContent" href="#" className="open-navbar-container black"><i className="ft-more-vertical"></i></a></span>
            <form className="navbar-form navbar-right mt-1">
              <div className="position-relative has-icon-right">
              </div>
            </form>
          </div>
          <div className="navbar-container">
            <div id="navbarSupportedContent" className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="dropdown nav-item">
                  <a id="dropdownBasic3" href="#" data-toggle="dropdown" className="nav-link position-relative dropdown-toggle"><i className="ft-user font-medium-3 blue-grey darken-4"></i>
                    <p className="d-none">User Settings</p></a>
                  <div ngbdropdownmenu="" aria-labelledby="dropdownBasic3" className="dropdown-menu text-left dropdown-menu-right">
                  
                      <a href={`/edituser/${this.state.id}`}
                       className="dropdown-item py-1"><i className="ft-edit mr-2"></i><span>Edit Profile</span></a>
                     
                    
                    <a
                          href="#"
                          onClick={() => this.props.logout()}
                          className="dropdown-item"
                        >
                          Logout
                        </a>
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



Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object,
};



const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
