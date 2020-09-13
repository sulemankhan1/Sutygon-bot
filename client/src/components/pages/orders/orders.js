import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { Link } from "react-router-dom";

import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import Loader from "../../layout/Loader";
import { deleteOrder,getAllOrders, findOrders } from "../../../actions/order";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
class Orders extends Component {

  async componentDidMount() {
    await this.props.getAllOrders();
  }

  state = {
    search: ""
  }
   
 getTAble = () => {
    const { orders } = this.props;
     console.log(orders)
        let tbl_sno=1;
    if (orders) {
      if (orders.length === 0) {
        return (
          <tr>
            <td colSpan={6} className="text-center">
              No orders Found
            </td>
          </tr>
        );
      }
      return orders.map((order,i) => (
        <tr key={i}>
           
           <td className="text-center text-muted">{tbl_sno++}</td>
           <td className="text-center">{""}</td>

          <td className="text-center">{order.customer ? order.customer.name : ""}</td>
          <td className="text-center">{order.product ?  order.product.name:""}</td>
          <td className="text-center">{order.status}</td>

          <td className="text-center">{order.deliveryDate}</td>

          <td className="text-center">{order.returnDate}</td>
          <td className="text-d">
      
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
   
  
  onDelete = (id) => {
    confirmAlert({
      title: "Cancel Order",
      message: "Are you sure you want to delete this record?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.deleteOrder(id);
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
                  <th>Start Date</th>
                  <th>End Date</th>
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
  getAllOrders: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  findOrders: PropTypes.func.isRequired,
     orders: PropTypes.array,
  };

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  auth: state.auth,

});
export default connect(mapStateToProps, {
  getAllOrders,deleteOrder, findOrders
})(Orders);

