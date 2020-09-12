import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProduct, addNewRentProduct } from "../../actions/rentproduct";
import { getAllProducts, getProduct , updateProduct} from "../../actions/product";
import { getAllCustomers } from "../../actions/customer";
import moment from "moment"
import { setAlert } from "../../actions/alert";
import Alert from "../layout/Alert";
import Loader from "../layout/Loader";

class RentProduct extends Component {
  state = {
    id: "",
    orderNumber: `${"RP"}${Date.now()}`,
    trackingNumber: "",
    customer: "",
    product: "",
    orderedQuantity: "",
    orderedSize: "",
    emoloyee: "",
    deliveryDate:"",
    returnDate:"",
    image: "",
    saving: false,
  };

  async componentDidMount() {
    this.props.getAllProducts();
    this.props.getAllCustomers();

  }
  handleChange = (e, id = "") => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getavailableQuantity = () => {
    const { products } = this.props.products;
    if (this.state.product) {
      const result = products.filter(record => record._id === this.state.product)
      if (result) {
        return result[0].availableQuantity
      }
    }
  }
  getRentedQuantity = () => {
    const { products } = this.props.products;
    if (this.state.product) {
      const result = products.filter(record => record._id === this.state.product)
      if (result) {
        return result[0].rentedQuantity
      }
    }
  }
  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ saving: true });

    const state = { ...this.state };
    const { user } = this.props.auth;

    const product = {
      orderNumber: state.orderNumber,
      trackingNumber: state.orderNumber,
      product: state.product,
      customer: state.customer,
      employee: user._id,
      orderedSize:state.orderedSize,
      orderedQuantity:state.orderedQuantity,
      deliveryDate: state.deliveryDate,
      returnDate: state.returnDate,

      image: state.image
    };
    await this.props.addNewRentProduct(product);
    this.getProductQTY(e);

    this.setState({ saving: false });
  };

  getProductQTY = async (e) =>{
    e.preventDefault();
    if (this.state.product) {
      const { products } = this.props.products;
      let qty;
      let result;
      if (this.state.product) {
        result = products.filter(record => record._id === this.state.product)
        if (result) {
          qty = result[0].availableQuantity - this.state.orderedQuantity;
        }
      }
         const productQTY = {
       availableQuantity:qty,
       rentedQuantity:this.state.orderedQuantity

      };

this.setState({ saving: true });

     await this.props.updateProduct(productQTY,result[0]._id);

     this.setState({ saving: false });
     
      }
    }

  
  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (this.props.saved) {
      return <Redirect to="/dashboard" />;
    }

    const { product, customer } = this.state;
    const { customers } = this.props.customers;
    const { products } = this.props.products;
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
                        <h4 className="form-section"><i className="icon-basket-loaded"></i> Rent a Product</h4>
                      </div>
                      <div className="card-body">
                      <form onSubmit={(e) => this.onSubmit(e)}>
<Alert />
                          <div className="row">
                            <div className="form-group col-6 mb-2">
                              <label htmlFor="issueinput5">Select Customer</label>
                              <select
                                name="customer"
                                className="form-control"
                                onChange={(e) => this.handleChange(e)}
                              >
                                <option value="DEFAULT"> -- select -- </option>
                                {customers &&
                                  customers.map((record) => (
                                    <option
                                      key={record._id}
                                      value={record._id}
                                      selected={record._id === customer}
                                    >
                                      {record.name +
                                        " - " +
                                        record.email}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="form-group col-6 mb-2">
                              <label htmlFor="issueinput5">Select Product</label>
                              <select
                                name="product"
                                className="form-control"
                                onChange={(e) => this.handleChange(e)}
                                // onMouseOver={this.getavailableQuantity()}

                              >
                                <option value="DEFAULT"> -- select -- </option>
                                {products &&
                                  products.map((record) => (
                                    <option
                                      key={record._id}
                                      value={record._id}
                                      selected={record._id === product}
                                    >
                                      {record.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group col-md-6 mb-2">
                              <label htmlFor="projectinput4">Available Quantity</label>
                              <input type="text"
                                id="projectinput4"
                                className="form-control"
                                placeholder="Available Quantity"
                                name="availableQuantity"
                                value={this.getavailableQuantity() >= 0 ?  this.getavailableQuantity(): `Available Quantity`}
                                onChange={(e) => this.handleChange(e)}
                                readOnly
                              />
                            </div>
                            <div className="form-group col-md-6 mb-2">
                              <label htmlFor="projectinput4">Rented Quantity</label>
                    <input type="text"
                     id="projectinput4"
                      className="form-control"
                       placeholder="Rented Quantity" 
                       name="orderedQuantity"
                       value={this.getRentedQuantity() >= 0 ?  this.getRentedQuantity(): `Rented Quantity`}
                       onChange={(e) => this.handleChange(e)}
                       readOnly

                       />
                            </div>
                          </div>
                   
                          <div className="row">
                            <div className="form-group col-md-6 mb-2">
                              <label htmlFor="projectinput4">Size</label>
                              <input type="text"
                                id="projectinput4"
                                className="form-control"
                                placeholder="Size"
                                name="orderedSize"
                                value={this.state.orderedSize}
                                onChange={(e) => this.handleChange(e)}
                              
                              />
                            </div>
                            <div className="form-group col-md-6 mb-2">
                            <label htmlFor="projectinput4">Quantity</label>
                              <input type="text"
                                id="projectinput4"
                                className="form-control"
                                placeholder="Quantity"
                                name="orderedQuantity"
                                value={this.state.orderedQuantity}
                                onChange={(e) => this.handleChange(e)}
                              
                              />
                            
                            </div>
                          </div>
                   
                          <div className="row">
                            <div className="form-group col-md-6 mb-2">
                              <label
                                htmlFor="issueinput3"
                              >Start Date
                    </label>
                              <input
                                type="date"
                                id="issueinput3"
                                className="form-control"
                                name="deliveryDate"
                                data-toggle="tooltip"
                                data-trigger="hover"
                                data-placement="top"
                                data-title="Date Opened"
                                onChange={(e) => this.handleChange(e)}
                                value={this.state.deliveryDate}
                              />
                            </div>
                            <div className="form-group col-md-6 mb-2">
                              <label
                                htmlFor="issueinput3"
                              >
                                End Date
                      </label>
                              <input
                                type="date"
                                id="issueinput3"
                                className="form-control"
                                name="returnDate"
                                data-toggle="tooltip"
                                data-trigger="hover"
                                data-placement="top"
                                data-title="Date Opened"
                                onChange={(e) => this.handleChange(e)}
                                value={this.state.returnDate}
                              />
                            </div>
                          </div>
                          <div className="form-actions top">
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
                                <i className="ft-check" /> Create Order
                              </button>
                            )}

                           
                         
                          </div>
                        </form>
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

RentProduct.propTypes = {
  saved: PropTypes.bool,
  addNewRentProduct: PropTypes.func.isRequired,
  getAllCustomers: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  updateProduct:PropTypes.func.isRequired,
  auth: PropTypes.object,
  products: PropTypes.object,
  customers: PropTypes.object,
  product: PropTypes.object,

};

const mapStateToProps = (state) => ({
  product:state.product.product,
  saved: state.rentproduct.saved,
  auth: state.auth,
  products: state.product,
  customers: state.customer
});
export default connect(mapStateToProps, {
  getAllCustomers,
  getAllProducts,
  addNewRentProduct,
  deleteProduct,
  getProduct,
  updateProduct
})(RentProduct);

