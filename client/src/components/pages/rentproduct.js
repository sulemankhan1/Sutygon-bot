import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCustomer } from "../../actions/rentproduct";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";

class RentProduct extends Component {
  state = {
    id: "",
    customer: "",
    saving: false,
  };


  handleChange = (e, id = "") => {
    this.setState({ [e.target.name]: e.target.value });
  };
  CutomerBox = () => {
    const { customer } = this.props;
    return <>


      <div id="colors_box">

        <div className="row color-row">
          <div class="row">
            <div class="col-md-12">
              <h3>Is this the One</h3>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <input
                type="text"
                id="customer"
                className="form-control mm-input"
                style={{ 'color': '#495057' }}
                value={customer[0] ? customer[0].name : "No Customer Found"}
                readonly />
            </div>



          </div>
          <div className="col-md-12">
            <div id="sizes_box">
              <div className="row text-center">
                <div className="left">
                  <button
                    type="button"
                    className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                    onClick={(e) => this.tryAgain(e)}
                    id="btnSize" ><i className="ft-rotate-cw"></i> Try Again</button>

                  <Link to="/customer/addcustomer"
                    type="button"
                    target={"_blank"}

                    className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                    id="btnSize1"><i className="ft-user"></i> New Customer</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {customer[0] ?
          <div className="row color-row">
            <div className="col-md-12">
              <div className="form-group">
                <h3>Customer is on-File</h3>
              </div>
            </div>
            <div className="col-md-12">
              <div id="sizes_box">
                <div className="row">
                  <div className="left">
                    <input
                      type="text"
                      className="form-control mm-input "
                      style={{ 'color': '#495057' }}
                      value={customer[0].name}
                      readonly />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="left">
                    <input
                      type="number"
                      className="form-control mm-input "
                      style={{ 'color': '#495057' }}
                      value={customer[0].contactnumber}
                      readonly />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="left">
                    <textarea
                      type="text"
                      className="form-control mm-input "
                      style={{ 'color': '#495057' }}
                      value={customer[0].address}
                      placeholder="Address"
                      readonly></textarea>
                  </div>
                </div>
              </div>
              <br />
              <div className="row text-center">
                <div className="col-md-12 btn-cont">
                  <div className="form-group">
                    <Link
                      to={{
                        pathname: "/checkout",
                        data: this.props.customer[0],
                        // your data array of objects
                      }}
                      type="button"
                      className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                      id="btnSize2" ><i className="ft-check"></i> Next</Link>
                  </div>
                </div>
              </div>
            </div>
          </div> : ""
        }
      </div>
    </>
  }

  tryAgain = (e) => {
    e.preventDefault();

    var contactnumber = document.getElementById("number");
    var contact = document.getElementById("customer");

    contactnumber.focus();
    contactnumber.value = "";
    contact.value = "";

  }

  onSubmitCustomer = async (e) => {
    e.preventDefault();
    this.setState({ saving: true });

    const state = { ...this.state };
    await this.props.getCustomer(state.customer);
    this.setState({ saving: false });
  };


  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (this.props.saved) {
      return <Redirect to="/orders" />;
    }
    return (
      <React.Fragment>
        <Loader />
        <div className="wrapper menu-collapsed">
          <Sidebar location={this.props.location} >
          </Sidebar>
          <Header>
          </Header>
          <div className="main-panel">
            <div className="main-content">
              <div className="content-wrapper">
                <section id="form-action-layouts">
                  <div className="form-body">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Rent a Product</h4>
                      </div>
                      <div className="card-content">

                        <div className="card-body table-responsive">
                          <form onSubmit={(e) => this.onSubmitCustomer(e)}>

                            <div className="form-group">
                              <h3>Enter Customer 10-digit phone number</h3>
                              <div className="position-relative has-icon-right">
                                <input
                                  name="customer"
                                  type="number"
                                  placeholder="Search"
                                  className="form-control round"
                                  id="number"
                                  min="0"
                                  // max="10"
                                  ref="contactnumber"

                                  onChange={(e) => this.handleChange(e)}

                                />
                                <div className="form-control-position">
                                  <button
                                    type="submit"
                                    className="mb-2 mr-2 btn ft-search"
                                  >
                                  </button>
                                </div>
                              </div>
                            </div>

                          </form>
                          {this.props.customer ? this.CutomerBox() : ""}




                        </div>
                      </div>

                    </div>

                  </div>


                </section>

              </div>

            </div>
            <footer className="footer footer-static footer-light">
              <p className="clearfix text-muted text-sm-center px-2"><span>Powered by &nbsp;{" "}
                <a href="https://www.alphinex.com" id="pixinventLink" target="_blank" className="text-bold-800 primary darken-2">Alphinex Solutions </a>, All rights reserved. </span></p>
            </footer>

          </div>
        </div>
      </React.Fragment>

    );
  }
}

RentProduct.propTypes = {
  saved: PropTypes.bool,
  getCustomer: PropTypes.func.isRequired,
  auth: PropTypes.object,
  customer: PropTypes.array,

};

const mapStateToProps = (state) => ({
  saved: state.rentproduct.saved,
  auth: state.auth,
  customer: state.customer.customer
});
export default connect(mapStateToProps, {
  getCustomer,

})(RentProduct);

