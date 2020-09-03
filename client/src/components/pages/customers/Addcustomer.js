import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import {addNewCustomer, getCustomer } from "../../../actions/customer";

import { Link } from "react-router-dom";

import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
class AddCustomer extends Component {
    state = {
        id: "",
        name: "",
        contactnumber: "",
        email: "",
        address: "",
        noOfOrders: "",
        saving: false,
    };


    handleChange = (e, id = "") => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ saving: true });

        const state = { ...this.state };

        const customer = {
            name: state.name,
            email: state.email,
            contactnumber: state.contactnumber,
            address: state.address,
            noOfOrders: state.noOfOrders,
        };
        if (state.id === "") {
            await this.props.addNewCustomer(customer);
      
          } 
          // else {
          //   await this.props.updateCustomer(customer, state.id);
          // }

          this.setState({ saving: false });
    }
    render() {
        const { auth } = this.props;
        if (!auth.loading && !auth.isAuthenticated) {
          return <Redirect to="/" />;
        }

        if (this.props.saved) {
            return <Redirect to="/dashboard" />;
          }

        return (
            <React.Fragment>
                <div className="wrapper nav-collapsed menu-collapsed">
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
                <h4 className="form-section"><i className="ft-user"></i>  
                   
                         Add New Customer
                         </h4>
            </div>
            <Alert />

            <div className="card-body">
              <form onSubmit={(e) => this.onSubmit(e)}>

                <div className="row">
                  <div className="form-group col-md-6 mb-2">
                    <label htmlFor="projectinput1">Name</label>
                    <input type="text" id="projectinput1"
                     className="form-control" 
                     placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={(e) => this.handleChange(e)}

                      />
                  </div>
                  <div className="form-group col-md-6 mb-2">
                    <label htmlFor="projectinput4">Contact Number</label>
                    <input type="number"
                     id="projectinput4"
                      className="form-control"
                       placeholder="Contact Number"
                        name="contactnumber"
                        value={this.state.contactnumber}
                        onChange={(e) => this.handleChange(e)}

                        />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6 mb-2">
                    <label htmlFor="projectinput3">E-mail</label>
                    <input type="text"
                     id="projectinput3"
                      className="form-control" 
                      placeholder="E-mail"
                       name="email"
                       value={this.state.email}
                       onChange={(e) => this.handleChange(e)}
                       />
                  </div>
                  
                </div>
                <div className="row">
                   <div className="form-group col-md-6 mb-2">
                    <label htmlFor="projectinput1">Address</label>
                    <input type="text"
                     id="projectinput1"
                      className="form-control" 
                      placeholder="Address" 
                      name="address"
                      value={this.state.address}
                      onChange={(e) => this.handleChange(e)}
                      
                      />
                  </div>
                  <div className="form-group col-md-6 mb-2">
                    <label htmlFor="projectinput4">No. Of Orders</label>
                    <input type="number"
                     id="projectinput4"
                      className="form-control" 
                      placeholder="No. Of Orders" 
                      name="noOfOrders"
                      value={this.state.noOfOrders}
                      onChange={(e) => this.handleChange(e)}
                      />
                  </div>
                </div>
                
              <div className="form-actions top">
              {this.state.id === ""
                          ? <>
                          
                          {this.state.saving ? (
                            <button
                              type="button"
                              className="mb-2 mr-2 btn btn-raised btn-primary"
                            >
                              <div
                                className="spinner-grow spinner-grow-sm "
                                role="status"
                              ></div>
                                &nbsp; Adding
                            </button>
                          ) : (
                              <button
                                type="submit"
                                className="mb-2 mr-2 btn btn-raised btn-primary"
                              >
                                <i className="ft-check" /> Add Customer
                              </button>
                            )}
                          </>
                          :
                           ""
                          }     
              </div>
            </form>
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

AddCustomer.propTypes = {
  saved: PropTypes.bool,
  addNewCustomer: PropTypes.func.isRequired,
  getCustomer: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
    saved: state.customer.saved,
    auth: state.auth,

});
export default connect(mapStateToProps, {
  addNewCustomer,getCustomer
})(AddCustomer);

