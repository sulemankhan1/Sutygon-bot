import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../layout/Alert";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";

class RentOrder extends Component {
  state = {
    id: "",
    customer: "",
    saving: false,
  };

  async componentDidMount() {
    // this.props.getAllProducts();
    // this.props.getAllCustomers();

  }
  //   handleChange = (e, id = "") => {
  //     this.setState({ [e.target.name]: e.target.value });
  //   };

  // getRentedQuantity = () => {
  //   const { products } = this.props.products;
  //   if (this.state.product) {
  //     const result = products.filter(record => record._id === this.state.product)
  //     if (result) {
  //       return result[0].rentedQuantity
  //     }
  //   }
  // }


  render() {
    console.log("data", this.props.location.data)
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
                          <form className="" action="index.html" method="post">
                            <div id="colors_box">
                              <div className="row color-row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <h3>SAM M.SIMTH #123456789</h3>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div id="sizes_box">
                                    <div className="row">
                                      <div className="left">
                                        <input
                                          type="text"
                                          className="form-control mm-input s-input"
                                          placeholder="Barcode"
                                          style={{ 'width': '60%' }}
                                          id="setSize1" />

                                        <input
                                          type="text"
                                          className="form-control mm-input s-input"
                                          placeholder="Price"
                                          id="setSize"
                                          value="$" />
                                      </div>
                                      <div className="right">
                                        <button
                                          type="button"
                                          className="btn btn-raised btn-sm btn-icon btn-danger mt-1"
                                        ><i className="fa fa-minus"></i>
                                        </button>
                                      </div>
                                      <div className="right">
                                        <button
                                          type="button"
                                          className="btn btn-raised btn-sm btn-success mt-1" >
                                          <i className="=ft ft-edit"></i>
                                        </button>
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="left">
                                        <input
                                          type="text"
                                          className="form-control mm-input s-input"
                                          style={{ 'width': '60%' }}
                                          placeholder="Barcode"
                                          id="setSize1" />

                                        <input
                                          type="text"
                                          className="form-control mm-input s-input"
                                          placeholder="Price"
                                          id="setSize"
                                          value="$" />
                                      </div>
                                      <div className="right">
                                        <button
                                          type="button"
                                          className="btn btn-raised btn-sm btn-icon btn-danger mt-1">
                                          <i className="fa fa-minus"></i>
                                        </button>
                                      </div>
                                      <div className="right">
                                        <button
                                          type="button"
                                          className="btn btn-raised btn-sm btn-success mt-1" >
                                          <i className="=ft ft-edit"></i>
                                        </button>
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="left">
                                        <input
                                          type="text"
                                          className="form-control mm-input s-input"
                                          placeholder="Barcode"
                                          style={{ 'width': '60%' }}

                                          id="setSize1" />

                                        <input
                                          type="text"
                                          className="form-control mm-input s-input"
                                          placeholder="Price"
                                          id="setSize"
                                          value="$" />
                                      </div>
                                      <div className="right">
                                        <button
                                          type="button"
                                          className="btn btn-raised btn-sm btn-icon btn-danger mt-1">
                                          <i className="fa fa-minus"></i>
                                        </button>
                                      </div>
                                      <div className="right">
                                        <button
                                          type="button"
                                          className="btn btn-raised btn-sm btn-success mt-1" >
                                          <i className="=ft ft-edit"></i>
                                        </button>
                                      </div>
                                    </div>

                                    <Link to="/product/addproduct"       
                                                                   className="btn "><i className="fa fa-plus"></i>
                                 Go Back To Add Products
                                 </Link>

                                 <br />

                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <div style={{ 'float': 'left' }}>

                                            <h4 id="padLeft">Total Without Tax</h4>
                                          </div>
                                          <div style={{ 'paddingLeft': '500px' }}>
                                            <input
                                              style={{ 'width': '65%' }}
                                              type="text"
                                              className="form-control mm-input s-input"
                                              placeholder="Total"
                                              id="setSizeFloat"
                                              value="$" />
                                          </div> 
                                          <br />
                                        </div> </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <div style={{ 'float': 'left' }}>
                                            <h4 id="padLeft">Enter tax % <span className="text-muted">(enter 0 if no tax)</span></h4>
                                          </div>
                                          <div style={{ 'paddingLeft': '500px' }}>
                                            <input
                                              style={{ 'width': '65%' }}
                                              type="text"
                                              className="form-control mm-input s-input"
                                              placeholder="Total"
                                              id="setSizeFloat"
                                              value="$" />
                                          </div>  </div>
                                      </div>
                                    </div>
                                    <br />

                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">

                                          <h4 id="arowDown"><i className="ft-arrow-down"></i></h4>
                                          <div style={{ 'paddingLeft': '500px' }}>
                                            <input
                                              style={{ 'width': '65%' }}
                                              type="text"
                                              className="form-control mm-input s-input"
                                              placeholder="Total"
                                              id="setSizeFloat"
                                              value="$" />
                                          </div>                             </div>
                                      </div>
                                    </div>
                                    <br />

                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <div style={{ 'float': 'left' }}>

                                            <h4 id="padLeft">Enter Insurance Amount</h4>
                                          </div>
                                          <div style={{ 'paddingLeft': '500px' }}>
                                            <input
                                              style={{ 'width': '65%' }}
                                              type="text"
                                              className="form-control mm-input s-input"
                                              placeholder="Total"
                                              id="setSizeFloat"
                                              value="$" />
                                          </div> 
                                        </div>
                                      </div>
                                    </div>
                                    <br />

                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <div style={{ 'float': 'left' }}>

                                            <h4 id="padLeft">Leave ID</h4>
                                          </div>
                                          <div style={{ 'float': 'right', 'padding-right': '170px' }}>

                                            <div class="custom-radio">
                                              <input
                                                type="radio"
                                                class="custom-control-input" />
                                              <label
                                                class="custom-control-label"
                                                for="customRadioInline1">YES</label>
                                            </div>
                                            <div class="custom-radio">
                                              <input
                                                type="radio"
                                                class="custom-control-input" />
                                              <label
                                                class="custom-control-label"
                                                for="customRadioInline2">NO</label>
                                            </div>                    </div>
                                        </div>
                                      </div>
                                    </div>

                                    <br />

                                    <div className="row text-center"
                                      style={{ 'paddingRight': '50px', 'paddingLeft': '40px' }}>
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <div
                                            style={{ 'float': 'left', 'paddingLeft': '120px' }}>

                                            <label
                                              for="issueinput3">Rent Date</label>
                                            <input
                                              type="date"
                                              id="issueinput3"
                                              className="form-control round"
                                              name="rentdate"
                                              data-toggle="tooltip"
                                              data-trigger="hover"
                                              data-placement="top"
                                              data-title="Rent Date" />
                                          </div>

                                          <div style={{ 'float': 'right', 'paddingRight': '160px' }}>
                                            <label
                                              id="setName">Return Date</label>
                                            <input
                                              type="date"
                                              id="issueinput4"
                                              className="form-control round"
                                              name="returndate"
                                              data-toggle="tooltip"
                                              data-trigger="hover"
                                              data-placement="top"
                                              data-title="Return Date" /></div>

                                        </div>
                                      </div>
                                    </div>

                                    <br />
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <div style={{ 'float': 'left' }}>
                                            <h4 id="padLeft">Total</h4>
                                          </div>
                                          <div style={{ 'paddingLeft': '500px' }}>
                                            <input
                                              style={{ 'width': '65%' }}
                                              type="text"
                                              className="form-control mm-input s-input"
                                              placeholder="Total"
                                              id="setSizeFloat"
                                              value="$" />
                                          </div> </div>
                                      </div>
                                    </div>
                                  </div>
                                  <br />
                                  <div className="row text-center">
                                    <div className="col-md-12 btn-cont">
                                      <div className="form-group">
                                        <button type="button"
                                          className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                                          id="btnSize2" ><i className="ft-check"></i> Submit</button>
                                      </div>
                                    </div>


                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>

                      </div>
                    </div></div>

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

RentOrder.propTypes = {
  saved: PropTypes.bool,
  //   addNewRentProduct: PropTypes.func.isRequired,
  //   getAllCustomers: PropTypes.func.isRequired,
  //   getAllProducts: PropTypes.func.isRequired,
  //   getProduct: PropTypes.func.isRequired,
  //   getCustomer: PropTypes.func.isRequired,

  //   updateProductQty: PropTypes.func.isRequired,
  auth: PropTypes.object,
  //   products: PropTypes.object,
  //   customers: PropTypes.object,
  //   product: PropTypes.object,
  //   customer: PropTypes.array,

};

const mapStateToProps = (state) => ({
  //   product: state.product.product,
  saved: state.rentproduct.saved,
  auth: state.auth,
  //   products: state.product,
  //   customers: state.customer,
  //   customer: state.customer.customer
});
export default connect(mapStateToProps, {

})(RentOrder);

