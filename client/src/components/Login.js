import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/auth";
// import "../login.css";
import Alert from "./layout/Alert";
import {getShop} from "../actions/dashboard";
import { setAlert } from "../actions/alert";


const styles = {
  'padding': '0 !important',
  'padding-right': '0 !important',
  'padding-left': '0 !important',
}


class Login extends Component {


  state = {
    formData: {
      email: "",
      password: "",
    },
  };
  async componentDidMount() {
    this.props.getShop();

  }
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

  }

  render() {
    // Redirect if logged in
    if (this.props.AuthLoading === false && this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    const { shop } = this.props;
    const { user } = this.props.auth;

    if(user && user.type == "User") 
       if(shop && shop.status == "off"){
      if(shop.status == "off"){
        localStorage.clear();
        this.props.history.push("/");
        window.location.reload();
        setAlert("Shop is closed", "danger", 5000);
      }
      };
    return (

      <div className="wrapper menu-collapsed">
        <div className="main-panel">
          <div className="" style={styles} >
            <div className="" style={styles}>
              <section id="login" style={styles} >
                <div className="container-fluid" style={styles}>
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
                              <div className="logo-img text-center align-middle">
                                  <img src="assets/img/logos/logo.png" height={100} width={100} />
                                </div>
                                <h4 className="mb-2 card-title text-center align-middle" style={{  }}>Login</h4>
                                <p className="card-text mb-3 text-center align-middle">
                                  Welcome back, please login to your account.
                  </p>
                                <form onSubmit={(e) => this.onSubmit(e)}>
                                <Alert/>
                              

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

                                  <div className="fg-actions justify-content-between">

                                    <div className="recover-pass">
                                      <input
                                        className="btn btn-primary btn-lg btn-block"
                                        type="submit"
                                        value="login"
                                      />
                                    </div>
                                  </div>
                                </form>

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
  getShop:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  AuthLoading: state.auth.loading,
  auth: state.auth,
  shop: state.user.shop

});

export default connect(mapStateToProps, {
  login,getShop
})(Login);
