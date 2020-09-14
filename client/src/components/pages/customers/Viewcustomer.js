import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { deleteCustomer,getAllCustomers } from "../../../actions/customer";
import { Link } from "react-router-dom";

import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import Loader from "../../layout/Loader";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
class ViewCustomer extends Component {
  async componentDidMount() {
    await this.props.getAllCustomers();
  }
   
 getTAble = () => {
    const { customers } = this.props;
    

    let tbl_sno=1;
    if (customers) {
      if (customers.length === 0) {
        return (
          <tr>
            <td colSpan={6} className="text-center">
              No customer Found
            </td>
          </tr>
        );
      }
      return customers.map((customer,i) => (
        <tr key={i}>
          
           <td className="text-center text-muted">{tbl_sno++}</td>
           <td className="text-center">{""}</td>

          <td className="text-center">{customer.name}</td>
          <td className="text-center">{customer.contactnumber}</td>
          <td className="text-center">{customer.email}</td>
          <td className="text-center">{customer.address}</td>
          <td className="text-center">{customer.noOfOrders}</td>
          <td className="text-center">
            {/* <Link to="/customer/viewcustomer/view"
              className="info p-0">
              <i className="ft-user font-medium-3 mr-2"></i>
            </Link> */}
            {/* <Link
              to={{ pathname: `/edit/${customer._id}` }}
              className="success p-0">
              <i className="ft-edit-2 font-medium-3 mr-2"></i>
            </Link> */}
            <Link to="/customer/viewcustomer"
              onClick={() => this.onDelete(customer._id)}
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
      title: "Delete Customer",
      message: "Are you sure you want to delete this record?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.deleteCustomer(id);
          },
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  };


 
    render() {
        const { auth } = this.props;
        if (!auth.loading && !auth.isAuthenticated) {
          return <Redirect to="/" />;
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
                        <section id="extended">
  <div className="row">
    <div className="col-sm-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">All Customers</h4>
        </div>
        <div className="card-content">
          <div className="card-body table-responsive">
          <div className="row">
            <div className="col-md-12">
              <Link to="/customer/addcustomer" className="btn btn-primary pull-right"> <i className="fa fa-plus"></i> New Customer</Link>
            </div>
          </div>
            <Alert />
            <table className="table text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th></th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Address</th>
                  {/* <th>Phone</th> */}
                  <th>Email</th>
                  <th>No of Orders</th>
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

ViewCustomer.propTypes = {
  auth: PropTypes.object,
  getAllCustomers: PropTypes.func.isRequired,
     deleteCustomer: PropTypes.func.isRequired,
     customers: PropTypes.array,
  };
const mapStateToProps = (state) => ({
  customers: state.customer.customers,
  auth: state.auth,


});
export default connect(mapStateToProps, {
  getAllCustomers,deleteCustomer
})(ViewCustomer);

