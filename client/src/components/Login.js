import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import "../login.css";
import Alert from "./layout/Alert";

class Login extends Component {
  
  state = {
    formData: {
      email: "",
      password: "",
    },
  };

  onChange = (e) => {
    let { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  };

  onSubmit = async (e) => { 
    e.preventDefault();
    const { login } = this.props;
    const { email, password } = this.state.formData;
    login(email, password);

  };

  render() {
    // Redirect if logged in
    if (this.props.AuthLoading === false && this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="wrapper nav-collapsed menu-collapsed">
        <div className="main-panel">
          <div className="main-content">
            <div className="content-wrapper">
              <section id="login">
                <div className="container-fluid">
                  <div className="row full-height-vh m-0">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                      <div className="card mx-5">
                        <div className="card-content">
                          <div className="card-body login-img">
                            <div className="row m-0">
                              <div className="col-lg-6 d-lg-block d-none py-2 text-center align-middle mt-5 mb-n5 img-block">
                                <img alt=""
                                  className="img-fluid imglogin"
                                  width="400"
                                  height="230">
                                </img>
                              </div>
                              <div className="col-lg-6 col-md-12 bg-white px-4 pt-3">
                                <h4 className="mb-2 card-title">Login</h4>

                                <p className="card-text mb-3">
                                  Welcome back, please login to your account.
                  </p>
                                <form onSubmit={(e) => this.onSubmit(e)}>

                                  <input type="text"
                                    className="form-control mb-3"
                                    placeholder="Email"
                                    onChange={(e) => this.onChange(e)}
                                    name="email" />
                                  <input type="password"
                                    className="form-control mb-1"
                                    placeholder="Password"
                                    onChange={(e) => this.onChange(e)}
                                    name="password" />
                                  <div className="d-flex justify-content-between mt-2">
                                    <div className="remember-me">
                                      <div className="custom-control custom-checkbox custom-control-inline mb-3">
                                        <input type="checkbox"
                                          id="customCheckboxInline1"
                                          name="customCheckboxInline1"
                                          className="custom-control-input"

                                        />
                                        <label className="custom-control-label" htmlFor="customCheckboxInline1">
                                          Remember Me
                        </label>
                                      </div>
                                    </div>
                                    <div className="forgot-password-option">
                                      <a href="forgot-password-page.html"
                                        className="text-decoration-none text-primary">Forgot Password
                        ?</a>
                                    </div>
                                  </div>
                         

                                  <div className="fg-actions d-flex justify-content-between">
                                    <div className="login-btn">
                                      <button className="btn btn-outline-primary">
                                        <a href="register-page.html"
                                          className="text-decoration-none">Register</a>
                                      </button>
                                    </div>
                                    <div className="recover-pass">
                                      <input
                                        className="btn btn-primary"
                                        type="submit"
                                        value="login"
                                      />
                                    </div>
                                  </div>
                                  </form>

                                  <hr className="m-0"></hr>
                                  <div className="d-flex justify-content-between mt-3">
                                    <div className="option-login">
                                      <h6 className="text-decoration-none text-primary">Or Login With</h6>
                                    </div>
                                    <div className="social-login-options">
                                      <a href="www.facebook.com" className="btn btn-social-icon mr-2 btn-facebook">
                                        <span className="fa fa-facebook"></span>
                                      </a>
                                      <a href="www.twitter.com" className="btn btn-social-icon mr-2 btn-twitter">
                                        <span className="fa fa-twitter"></span>
                                      </a>
                                    </div>
                                  </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  AuthLoading: state.auth.loading,
  auth: state.auth,

});

export default connect(mapStateToProps, {
  login,
})(Login);
