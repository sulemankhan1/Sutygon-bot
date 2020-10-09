import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { Link } from "react-router-dom";

import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import Loader from "../../layout/Loader";
import {getAllRentedProducts,deleteRentedProduct } from "../../../actions/rentproduct";
import { confirmAlert } from "react-confirm-alert";
import * as moment from 'moment'

import "react-confirm-alert/src/react-confirm-alert.css";
class Orders extends Component {

  async componentDidMount() {
    await this.props.getAllRentedProducts();
  }

  state = {
    search: ""
  }
   
 getTAble = () => {
    const { rentproducts } = this.props;
        let tbl_sno=1;
    if (rentproducts) {
      if (rentproducts.length === 0) {
        return (
          <tr>
            <td colSpan={8} className="text-center">
              No orders Found
            </td>
          </tr>
        );
      }
      return rentproducts.map((order,i) => (
        <tr key={i}>
           
           <td className="text-center text-muted">{tbl_sno++}</td>
           <td className="text-center">{""}</td>

          <td className="text-center">{order.customer ? order.customer.name : ""}</td>
          <td className="text-center">{order.barcodes ?  "ProductName?":""}</td>
          <td className="text-center">{this.getStatus(order.rentDate) === "Pending"
          ? <div className="badge badge-success">Pending</div>
          : this.getStatus(order.rentDate) === "Due" 
          ? <div className="badge badge-warning">Over Due</div>
          :<div className="badge badge-danger">Due Today</div>
        
        }</td>

          <td className="text-center">{moment(order.rentDate).format('DD/MMM/YYYY')}</td>

          <td className="text-center">{moment(order.returnDate).format('DD/MMM/YYYY')}</td>
          <td className="text-center">
      
            {/* <Link
              to={{ pathname: `/orders/${order._id}` }}
              className="success p-0">
              <i className="ft-edit-2 font-medium-3 mr-2"></i>
            </Link>  */}
            <Link to="/orders"
              onClick={() => this.onDelete(order._id)}
              className="danger p-0">
              <i className="ft-x font-medium-3 mr-2" title="Delete"></i>
            </Link>
          </td>

        </tr>
       ));
    }
  };
   
  getStatus=(date) =>{
    var deliveryDate = moment(date).format('MM/DD/YYYY');

    var currentdate = moment(new Date).format('MM/DD/YYYY');

    var status;
       if(moment(deliveryDate).isAfter(currentdate)){
    status="Pending"
  }
  if(moment(deliveryDate).isBefore(currentdate)){
     status = "Due"
  }
  if(moment(deliveryDate).isSame(currentdate)){
     status = "Due Today"
  }
   return status;
       };
  
  onDelete = (id) => {
    confirmAlert({
      title: "Cancel Order",
      message: "Are you sure you want to delete this record?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.deleteRentedProduct(id);
          },
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  };

  handleChange = (e, id = "") => {
    this.setState({ 'search': e.target.value });
  };

  async searchTable() {
        const searchVal = this.state.search;
        if(searchVal) {
            await this.props.findOrders(searchVal);
        } else {
            await this.props.getAllOrders();
        }
        
    }

    
  render() {
        const { auth   } = this.props;
        if (!auth.loading && !auth.isAuthenticated) {
          return <Redirect to="/" />;
        }

        // if (this.props.saved) {
        //     return <Redirect to="/dashboard" />;
        //   }

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
                        <section id="extended">
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="card">
                                <div className="card-header">
                                  <h4 className="card-title">Orders</h4>
                                </div>
                                <div className="card-content">
                                  <div className="card-body table-responsive">
                                    <Alert />
                                    <table className="table text-center">
                                      <thead>
                                        <tr>
                                          <th>#</th>
                                          <th></th>
                                          <th>Customer</th>
                                          <th>Product</th>
                                          <th>Status</th>
                                          <th>Rent Date</th>
                                          <th>Return Date</th>
                                          <th>Actions</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {this.getTAble()} 
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                      </div>
                    </div>
                    <footer className="footer footer-static footer-light">
                        <p className="clearfix text-muted text-sm-center px-2"><span>Powered by &nbsp;{" "}
                            <a href="https://www.alphinex.com" id="pixinventLink" target="_blank" className="text-bold-800 primary darken-2">Alphinex Solutions </a>, All rights reserved. </span></p>
                    </footer>
                </div>

            </React.Fragment>

        );
    }
}

Orders.propTypes = {
  auth: PropTypes.object,
  getAllRentedProducts: PropTypes.func.isRequired,
  deleteRentedProduct: PropTypes.func.isRequired,
  rentproducts: PropTypes.array,
  };

const mapStateToProps = (state) => ({
  rentproducts: state.rentproduct.rentproducts,
  auth: state.auth,

});
export default connect(mapStateToProps, {
  getAllRentedProducts,deleteRentedProduct
})(Orders);

