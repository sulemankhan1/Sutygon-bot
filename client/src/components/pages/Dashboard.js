import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Loader from "../layout/Loader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllAppointments } from "../../actions/appointment";
import { getAllOrders } from "../../actions/order";
import { getAllRentedProducts} from "../../actions/rentproduct";
import { getAllProducts} from "../../actions/product";
import { changeShopStatus, getShop} from "../../actions/dashboard";
import * as moment from 'moment'
// import { getAllAppointments } from "../../actions/appointment";
// import { getAllAppointments } from "../../actions/appointment";

import "../../login.css"
import "../../dashbaord.css"

class Dashboard extends Component {

  async componentDidMount() {
    await this.props.getAllAppointments();
    await this.props.getAllOrders();
    await this.props.getAllRentedProducts();
    await this.props.getAllProducts();
    await this.props.getShop();
  }

  async changeShopStatus(status)  {
    await this.props.changeShopStatus(status);
    await this.props.getShop();
  }
  render() {

    const { user } = this.props.auth; 
console.log(user)
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
            <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <div className="card bg-primary">
                <div className="card-content">
                  <div className="card-body pt-2 pb-0">
                
                    <div className="media">
                      
                      <div className="media-body white text-left">
                        <h3 className="font-large-1 mb-0">$15,678</h3>
                        <span>Total Cost</span>
                      </div>
                      <div className="media-right white text-right">
                        <i className="icon-bulb font-large-1"></i>
                      </div>
                    </div>
                  </div>
                  <div id="Widget-line-chart" className="height-75 WidgetlineChart WidgetlineChartShadow mb-3">
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <div className="card bg-warning">
                <div className="card-content">
                  <div className="card-body pt-2 pb-0">
                    <div className="media">
                      <div className="media-body white text-left">
                        <h3 className="font-large-1 mb-0">$2156</h3>
                        <span>Total Tax</span>
                      </div>
                      <div className="media-right white text-right">
                        <i className="icon-pie-chart font-large-1"></i>
                      </div>
                    </div>
                  </div>
                  <div id="Widget-line-chart2" className="height-75 WidgetlineChart WidgetlineChartShadow mb-3">
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <div className="card bg-success">
                <div className="card-content">
                  <div className="card-body pt-2 pb-0">
                    <div className="media">
                      <div className="media-body white text-left">
                        <h3 className="font-large-1 mb-0">$45,668</h3>
                        <span>Total Sales</span>
                      </div>
                      <div className="media-right white text-right">
                        <i className="icon-graph font-large-1"></i>
                      </div>
                    </div>
                  </div>
                  <div id="Widget-line-chart3" className="height-75 WidgetlineChart WidgetlineChartShadow mb-3">
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <div className="card bg-danger">
                <div className="card-content">
                  <div className="card-body pt-2 pb-0">
                    <div className="media">
                      <div className="media-body white text-left">
                        <h3 className="font-large-1 mb-0">$32,454</h3>
                        <span>Total Earning</span>
                      </div>
                      <div className="media-right white text-right">
                        <i className="icon-wallet font-large-1"></i>
                      </div>
                    </div>
                  </div>
                  <div id="Widget-line-chart4" className="height-75 WidgetlineChart WidgetlineChartShadow mb-3">
                  </div>
                </div>
              </div>
            </div>
          </div>
          {user && user.type === "Admin" ?
      <>
          <div className="row">
            <div className="col-md-12">
            <div className="card">
              <div className="card-body">
            
                  <div className="row">
                    <div className="col-md-7 txt-sep">
                      <h2>Shop was {this.props.shop[0] && (this.props.shop[0].status == "on" ? "Opened" : "Closed")} on</h2>
                      <h1> <span className="badge badge-info">{this.props.shop[0] && moment(this.props.shop[0].shopStartTime).format('HH:mm a')}</span></h1>
                      <p><span className="badge badge-pill badge-light">{this.props.shop[0] && moment(this.props.shop[0].shopStartTime).format('DD-MMM-YY')}</span> </p>
                    </div>
                    <div className="col-md-3 txt-sep">
                      <h3 className="mt-1">Status</h3>
                      <p className="badge badge-pill badge-light">{this.props.shop[0] && (this.props.shop[0].status == "on" ? "Opened" : "Closed")}</p>
                    </div>
                    <div className="col-md-2">
                    <h3 className="mt-1">Action</h3>
                      {this.props.shop[0] && (this.props.shop[0].status == "on" ? (
                        <button type="button" onClick={() => this.changeShopStatus('off')} className="btn btn-link">Stop</button>
                      ) : (
                        <button type="button" onClick={() => this.changeShopStatus('on')} className="btn btn-link">Start</button>
                      ))}
                    </div>
                  </div>

              </div>
            </div>
            </div>
          </div> 
          </> : " "}

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

Dashboard.propTypes = {
  getAllAppointments: PropTypes.func.isRequired,
  getAllOrders: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  getAllRentedProducts: PropTypes.func.isRequired,
  changeShopStatus: PropTypes.func.isRequired,
  getShop: PropTypes.func.isRequired,
  auth: PropTypes.object,
  products: PropTypes.array,
  orders: PropTypes.array,
  rentedproducts:PropTypes.array,
  shop: PropTypes.array
//   deleteUser: PropTypes.func.isRequired,
//   blockUser: PropTypes.func.isRequired,
 };

const mapStateToProps = (state) => ({
  users: state.user.users,
  auth: state.auth,
  products: state.product.products,
  appointment: state.appointment.appointments,
  orders: state.order.orders,
  shop: state.dashboard.shop
// rentedproducts:state.rentedproduct.rentedproducts,


});
export default connect(mapStateToProps, {
   getAllAppointments, getAllOrders,getAllProducts,getAllRentedProducts, changeShopStatus, getShop
})(Dashboard);

