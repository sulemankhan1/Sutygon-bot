import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import {

  getProductById,
  getAllProducts,
  updateProduct,
  barcodeUpdateProduct,
} from "../../actions/product";
import { getCustomer } from "../../actions/customer";
import { addNewRentProduct } from "../../actions/rentproduct";
import * as moment from 'moment'

import { OCAlertsProvider } from '@opuscapita/react-alerts';
import { OCAlert } from '@opuscapita/react-alerts'
import shortid from "shortid";

class RentOrder extends Component {
  state = {
    id: "",
    orderNumber: "",
    barcode_Array: [],
    customer_id: "",
    product_Array: "",
    total_amt: "",
    taxper: "",
    tax: "",
    insAmt: "",
    rentDate: "",
    returnDate: "",
    total: "",
    saving: false,
    leaveID: "",
    barcodesRented: false
  };

  async componentDidMount() {
    await this.props.getAllProducts();

    const { data } = this.props.location;
    if (data) {
      this.setState({
        customer_id: data.customer_id,
        barcode_Array: data.barcode,
      });
    }
    await this.props.getCustomer(this.state.customer_id);
  }
returnDateValidity = ()=>{
  const {rentDate,returnDate} = this.state;
 if(moment(moment(returnDate).format('MM/DD/YYYY')).isBefore(rentDate)){
  OCAlert.alertError('Return Date should be after rent date');
 }
}

rentDateValidity = ()=>{
  const {rentDate} = this.state;
  var currentdate = moment(new Date).format('MM/DD/YYYY');
  console.log(moment(rentDate).format('MM/DD/YYYY'))
  console.log(currentdate)

 if(moment(moment(rentDate).format('MM/DD/YYYY')).isBefore(currentdate)){
  OCAlert.alertError(`Rent Date should be after today's date`);

 }

}

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ saving: true });

    const state = { ...this.state };
    const { user } = this.props.auth;
    const { customer } = this.props;

    const { barcode_Array } = this.state;
    let barcodeArr = [];
    barcode_Array.forEach((element) => {
      barcodeArr.push(element.barcode);
    });

    const product = {
      orderNumber: state.orderNumber,
      customer: state.customer_id,
      customerContactNumber: customer.contactnumber,
      user: user._id,
      barcodes: barcodeArr,
      total: state.total,
      returnDate: state.returnDate,
      rentDate: state.rentDate,
      leaveId: true,
      insuranceAmt: state.insAmt
    };

     await this.props.addNewRentProduct(product);

    let { product_Array } = this.state;

    if (product_Array) {
      let products = [];
      let counter = 1;

      product_Array.forEach(async (pd, p_index) => {
        await this.props.getProductById(pd[0].product_id); // <-- Error is here this should give updated product in every loop

        let { product } = this.props;
        counter++;
        // console.log('got from db', product);
        if (product) {
          product.color.forEach((color, c_index) => {
            // get right color obj
            if (color._id == pd[0].color_id) {
              // get right size obj
              if (color.sizes) {
                color.sizes.forEach((size, s_index) => {
                  if (size.id == pd[0].size_id) {
                    // check if current size obj contain barcodes or not
                    if (size.barcodes) {
                      // Add isRented
                      size.barcodes[pd[0].barcodeIndex].isRented = true;
                      this.props.updateProduct(product, pd[0].product_id);
                    }
                  }
                });
              }
            }
          });
          products.push(product);
          product = null;

        }
      });

    }
    this.setState({ saving: false });
    // this.setState({
    //   barcodesRented: true
    // })
  };

  onHandleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    
  };

  // return sorted products for barcodes
  getSortedData = (products) => {
    // looping through prducts
    let rows = [];
    products.forEach((product, p_index) => {
      let product_name = product.name;
      let product_id = product._id;

      // looping through each color of current product
      if (product.color) {
        product.color.forEach((color, c_index) => {
          let color_name = color.colorname;
          let color_id = color._id;

          // looping through sizes of current color
          if (color.sizes) {
            color.sizes.forEach((size, s_index) => {
              let size_name = size.size;
              let size_id = size.id;
              let price = size.price;
              let length;
              // show sizes with barcode
              if (size.barcodes) {
                length = size.barcodes.length;
              } else {
                length = 0;
              }

              let i;
              for (i = 0; i < length; i++) {
                let row = {
                  product_id: product_id,
                  color_id: color_id,
                  size_id: size_id,
                  barcodeIndex: i, // will be used to identify index of barcode when changeBarcode is called
                  title: product_name + " | " + color_name + " | " + size_name,
                  barcode: size.barcodes[i].barcode,
                  price: price,
                };
                rows.push(row);
              }
            });
          }
        });
      }
    }); // products foreach ends here
    return rows;
  };

  removeBarcodeRow = (b_index, bbarcode) => {
    let barcode_Array = this.state.product_Array;
    let selectedBarcodes = this.state.barcode_Array;
    selectedBarcodes.splice(b_index, 1);
    barcode_Array.splice(b_index, 1);
    this.setState({
      product_Array: barcode_Array,
      barcode_Array: selectedBarcodes,
    });
  };
  getBarcodeRecord() {
    let productarray = [];
    let { barcode_Array } = this.state;
    const { products } = this.props;
    if (products) {
      let sortedAray = this.getSortedData(products);
      if (sortedAray) {
        barcode_Array.forEach((element) => {
          productarray.push(
            sortedAray.filter((f) => f.barcode === element.barcode)
          );
          return productarray;
        });
      }
    }
    this.state.product_Array = productarray;
    return this.state.product_Array.map((product, b_index) => (
      // <div id="sizes_box" key={barcode.id || barcode._id}>
      <div id="sizes_box" key={b_index}>
        <div className="row">
          <div className="left">
            <input
              type="text"
              className="form-control mm-input s-input text-center"
              placeholder="Barcode"
              name="barcode"
              id="widthBr"
              style={{ width: "60%" }}
              value={
                product &&
                product[0].title &&
                product[0].title + " | " + product[0].barcode
              }
            />

            <input
              type="text"
              className="form-control mm-input s-input text-center"
              placeholder="Price"
              id="setSize"
              name="total"
              value={`${"$"}${product && product[0].price}`}
            />
          </div>
          <div className="right">
            <button
              type="button"
              onClick={() =>
                this.removeBarcodeRow(b_index, barcode_Array[b_index].barcode)
              }
              className="btn btn-raised btn-sm btn-icon btn-danger mt-1"
            >
              <i className="fa fa-minus"></i>
            </button>
          </div>
          <div className="right">
            <button
              type="button"
              className="btn btn-raised btn-sm btn-success mt-1"
            >
              <i className="=ft ft-edit"></i>
            </button>
          </div>
        </div>
     </div>
    ));
  }

  getInvoiceBarcodeRecord() {
    let { product_Array } = this.state;
    return product_Array.map((product, b_index) => (
      // <div id="sizes_box" key={barcode.id || barcode._id}>
      <div id="sizes_box" key={b_index}>
        <div className="row">
          <input
            type="text"
            className="form-control mm-input s-input text-center"
            placeholder="Barcode"
            name="barcode"
            id="widthBr"
            style={{ width: "280px", color: 'black' }}
            value={
              product &&
              product[0].title &&
              product[0].title + " | " + product[0].barcode
            }
          />

          <input
            type="text"
            className="form-control mm-input s-input text-center"
            placeholder="Price"
            id="setSize"
            name="total"
            style={{ color: 'black', width: '80px' }}
            value={`${"$"}${product && product[0].price}`}
          />

        </div>
      </div>
    ));
  }

  calculateTotalWithoutTax = () => {
    let sum = 0;
    let { product_Array } = this.state;
    if (product_Array) {
      for (var i = 0; i < product_Array.length; i++) {
        sum += Number(product_Array[i][0].price);
      }
    }
    this.state.total_amt = sum;
    return sum;
  };

  calculateTax = () => {
    var totalAmount = this.calculateTotalWithoutTax();
    var { taxper } = this.state;
   
    let amount;
        if (taxper !== null && taxper !== "0") {
      amount = totalAmount / taxper;
    }
    else {
      amount = 0;
    }
    this.state.tax = amount;
    return amount;
  };
  calculateInsuranceAmt() {
    var totalAmount = this.calculateTotalWithoutTax();
    var insuranceAmt = Number(totalAmount) / 2;
    this.state.insAmt = insuranceAmt;
    return insuranceAmt;
  }
  calculateTotal = () => {
    let sum = 0;
    let { tax, insAmt, total_amt } = this.state;
    sum = Number(Number(total_amt) + Number(tax) + Number(insAmt));
    this.state.total = sum;
    return sum;
  };

  render() {
    const { auth } = this.props;
    const { data } = this.props.location;

    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    // if (this.state.barcodesRented) {
    //   return <Redirect to="/RentInvoice" />;
    // }
    const { customer } = this.props;
    console.log(customer)
    return (
      <React.Fragment>
        <Loader />
        <div className="wrapper menu-collapsed">
          <Sidebar location={this.props.location}></Sidebar>
          <Header></Header>
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
                          <div id="colors_box">
                            <div className="row color-row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <h3>
                                    {customer && customer.name}{" "}
                                    {`${"#"}${customer && customer.contactnumber
                                      }`}
                                  </h3>
                                </div>
                              </div>
                              <form onSubmit={(e) => this.onSubmit(e)}>
                                <div className="col-md-12">
                                  <div id="sizes_box">
                                    {this.getBarcodeRecord()}
                                    <Link
                                      to="/product/addproduct"
                                      className="btn "
                                    >
                                      <i className="fa fa-plus"></i>
                                      Go Back To Add Products
                                    </Link>

                                    <br />

                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <div style={{ float: "left" }}>
                                            <h4 id="padLeft">
                                              Total Without Tax
                                            </h4>
                                          </div>
                                          <div style={{ paddingLeft: "650px" }}>
                                            <input
                                              style={{ width: "65%" }}
                                              type="text"
                                              className="form-control mm-input s-input text-center"
                                              placeholder="Total"
                                              name="total_amt"
                                              id="setSizeFloat"
                                              onChange={(e) =>
                                                this.onHandleChange(e)
                                              }
                                              value={
                                                this.state.product_Array
                                                  ? `${"$"}${this.calculateTotalWithoutTax()}`
                                                  : ""
                                              }
                                            />
                                          </div>
                                          <br />
                                        </div>{" "}
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <div style={{ float: "left" }}>
                                            <h4 id="padLeft">
                                              Enter tax %{" "}
                                              <span className="text-muted">
                                                (enter 0 if no tax)
                                              </span>
                                            </h4>
                                          </div>
                                          <div style={{ paddingLeft: "650px" }}>
                                            <input
                                              style={{ width: "65%" }}
                                              name="taxper"
                                              type="text"
                                              className="form-control mm-input s-input text-center"
                                              placeholder="Tax"
                                              id="setSizeFloat"
                                              value={`${this.state.taxper}`}
                                              onChange={(e) =>
                                                this.onHandleChange(e)
                                              }
                                            />
                                          </div>{" "}
                                        </div>
                                      </div>
                                    </div>
                                    <br />

                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <h4 id="arowDown">
                                            <i className="ft-arrow-down"></i>
                                          </h4>
                                          <div style={{ paddingLeft: "650px" }}>
                                            <input
                                              style={{ width: "65%" }}
                                              type="text"
                                              className="form-control mm-input s-input text-center"
                                              placeholder="Tax Ammount"
                                              id="setSizeFloat"
                                              value={
                                                this.state.product_Array &&
                                                  this.state.taxper
                                                  ? `${"$"}${this.calculateTax()}`
                                                  : ""
                                              }
                                            />
                                          </div>{" "}
                                        </div>
                                      </div>
                                    </div>
                                    <br />

                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <div style={{ float: "left" }}>
                                            <h4 id="padLeft">
                                              Enter Insurance Amount
                                            </h4>
                                          </div>
                                          <div style={{ paddingLeft: "650px" }}>
                                            <input
                                              style={{ width: "65%" }}
                                              type="text"
                                              className="form-control mm-input s-input text-center"
                                              placeholder="Insurance"
                                              id="setSizeFloat"
                                              value={
                                                this.state.total_amt
                                                  ? `${"$"}${this.calculateInsuranceAmt()}`
                                                  : ""
                                              }
                                            />
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
                                          <div style={{ 'float': 'right', 'paddingRight': '170px' }}>

                                            <div className="">
                                              <input
                                                // className="custom-control-input"
                                                type="radio"
                                                name="leaveID"
                                                value={true}
                                                onChange={(e) => this.onHandleChange(e)}
                                                checked={this.state.leaveID === "true"}
                                              />
                                              <label
                                              // className="custom-control-label"
                                              >YES</label>
                                            </div>
                                            <div className="">
                                              <input
                                                // className="custom-control-input"
                                                type="radio"
                                                name="leaveID"
                                                value={false}
                                                onChange={(e) => this.onHandleChange(e)}
                                                checked={this.state.leaveID === "false"}
                                              />
                                              <label
                                              // className="custom-control-label"
                                              >NO</label>
                                            </div>                    </div>
                                        </div>
                                      </div>
                                    </div>
                                    <br />

                                    <div className="row">
                                      <div className="col-md-6 text-center">
                                        <label
                                          className="text-center"
                                          id="setName"
                                        >
                                          Rent Date
                                        </label>
                                      </div>

                                      <div className="col-md-6 text-center">
                                        <label
                                          className="text-center"
                                          id="setName"
                                        >
                                          Return Date
                                        </label>
                                      </div>
                                    </div>

                                    <br />

                                    <div className="row justify-content-center">
                                      <div className="col-md-6">
                                        <input
                                          type="date"
                                          id="issueinput3"
                                          className="form-control round text-center"
                                          name="rentDate"
                                          data-toggle="tooltip"
                                          data-trigger="hover"
                                          data-placement="top"
                                          data-title="Rent Date"
                                          onChange={(e) =>
                                            this.onHandleChange(e)
                                          }
                                          value={this.state.rentDate}
                                          onInput={this.rentDateValidity()}

                                        />
                                      </div>

                                      <div className="col-md-6">
                                        <input
                                          type="date"
                                          id="issueinput4"
                                          className="form-control round text-center"
                                          name="returnDate"
                                          data-toggle="tooltip"
                                          data-trigger="hover"
                                          data-placement="top"
                                          data-title="Return Date"
                                          onChange={(e) =>
                                            this.onHandleChange(e)
                                          }
                                          value={this.state.returnDate}
                                          onInput={this.returnDateValidity()}
                                        />
                                      </div>
                                    </div>

                                    <br />
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <div style={{ float: "left" }}>
                                            <h4 id="padLeft">Total</h4>
                                          </div>
                                          <div style={{ paddingLeft: "650px" }}>
                                            <input
                                              style={{ width: "65%" }}
                                              type="text"
                                              className="form-control mm-input s-input text-center"
                                              placeholder="Total"
                                              id="setSizeFloat"
                                              value={
                                                this.state.total_amt
                                                  ? `${"$"}${this.calculateTotal()}`
                                                  : ""
                                              }

                                            // value={`${"Total: $"}${this.state.tax ? (this.calculateTotal()) : ""}`}
                                            />
                                          </div>{" "}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <br />
                                  <div className="row text-center">
                                    <div className="col-md-12 btn-cont">
                                      <div className="form-group">
                                        <button
                                          type="submit"
                                          className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                                          id="btnSize2"
                                          data-toggle="modal"
                                          data-backdrop="false"
                                          data-target="#primary"
                                        >
                                          <i className="ft-check"></i>
                                          Submit &amp; Get Invoice
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Invoice Modal */}
                  <div class="modal fade text-left" id="primary" tabindex="-1" role="dialog" aria-labelledby="myModalLabel8"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header bg-primary white">
                          <h4 class="modal-title text-center" id="myModalLabel8">Rent Invoice</h4>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div id="colors_box">
                            <div className="row color-row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <div style={{ 'float': 'left' }}>

                                    <h4>{(customer) ? `${customer.name}${"#"}${customer.contactnumber}` : ""}</h4>
                                  </div>
                                  <div style={{ 'float': 'right' }}>
                                    {/* <h4>{(data) ? `${"Order"}${"#"} ${order[0].orderNumber}` : ""}</h4> */}

                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div id="sizes_box">
                                  {this.getInvoiceBarcodeRecord()}
                                  <hr />
                                  <div className="row">
                                    <div className="col-md-6" style={{ 'float': 'left', 'color': 'black' }}>
                                      <h6 id="padLeft">Total Without Tax</h6>
                                    </div>
                                    <div className="col-md-6" style={{ 'textAlign': 'center', 'color': 'black' }}>

                                      <h6 >
                                        {`${"$"}${this.state.total_amt}`}
                                      </h6>
                                    </div>

                                  </div>


                                  <div className="row">
                                    <div className="col-md-6" style={{ 'float': 'left', 'color': 'black' }}>

                                      <h6 id="padLeft">Tax Percentage</h6>
                                    </div>
                                    <div className="col-md-6" style={{ 'textAlign': 'center', 'color': 'black' }}>
                                      <h6 >
                                        {`${this.state.taxper}${"%"}`}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6" style={{ 'float': 'left', 'color': 'black' }}>

                                      <h6 id="padLeft">Tax Amount</h6>
                                    </div>
                                    <div className="col-md-6" style={{ 'textAlign': 'center', 'color': 'black' }}>
                                      <h6 >
                                        {`${"$"}${this.state.tax}`}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6" style={{ 'float': 'left', 'color': 'black' }}>

                                      <h6 id="padLeft">Insurance Amount</h6>
                                    </div>
                                    <div className="col-md-6" style={{ 'textAlign': 'center', 'color': 'black' }}>
                                      <h6 >
                                        {`${"$"}${this.state.insAmt}`}
                                      </h6>
                                    </div>
                                  </div>



                                  <div className="row justify-content-center">
                                    <div className="form-group">

                                      <div className="text-center" style={{ 'width': '300%' }}>
                                        <input
                                          type="text"

                                          className="form-control mm-input s-input text-center"
                                          placeholder="Total"
                                          style={{ 'color': 'black' }}

                                          id="setSizeFloat"
                                          value={`${"PAID TOTAL: $"}${this.state.total}`}

                                        />


                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6" style={{ 'float': 'left', 'color': 'black' }}>


                                      <h6 >Amount to be returned to customer
</h6></div>

                                    <div className="col-md-6 text-center" style={{ 'color': 'black' }}>



                                      <h6 >
                                        {`${"$"}${this.state.insAmt}`}
                                      </h6>

                                    </div>

                                  </div>






                                  <br />


                                  <div className="row">
                                    <div className="col-md-6" style={{ 'float': 'left', 'color': 'black' }}>


                                      <h6 id="padLeft">Leave ID</h6>
                                    </div>
                                    <div className="col-md-6" style={{ 'textAlign': 'center', 'color': 'black' }}>
                                      <h6 >
                                        {this.state.leaveID === "true" ? `${"Yes"}` : `${"No"}`}
                                      </h6>
                                    </div>

                                  </div>



                                  <div className="row">
                                    <div className="col-md-6" style={{ 'float': 'left', 'color': 'black' }}>
                                      <h6 id="padLeft">Rent From</h6>
                                    </div>
                                    <div style={{ 'textAlign': 'center', 'color': 'black', 'marginLeft': '25px' }}>
                                      <h6>
                                        {moment(this.state.rentDate).format('DD/MMM/YYYY')}

                                      </h6>
                                    </div>


                                  </div>



                                  <div className="row">
                                    <div className="col-md-6" style={{ 'float': 'left', 'color': 'black' }}>
                                      <h6 >Due Date</h6>
                                    </div>

                                    <div style={{ 'textAlign': 'center', 'color': 'black', 'marginLeft': '25px' }}>
                                      <h6 >

                                        {moment(this.state.returnDate).format('DD/MMM/YYYY')}
                                      </h6>
                                    </div>


                                  </div>


                                  <div className="col-md-12">

                                    <table>
                                      <tr>
                                        <td style={{ 'backgroundColor': 'white', 'textAlign': 'center', 'padding': '15px' }}>OrderID
                                                    {/* {`${order[0]._id}`}<br /> */}
                                          {/* {this.generateOrderBarcode(order[0]._id)} */}
                                        </td>
                                        <td style={{ 'textAlign': 'center', 'padding': '15px' }}> Authorized by <br />
                                                        Sutygon-Bot</td>
                                      </tr>
                                    </table>


                                  </div>
                                  <div className="row">
                                    <p>For questions and contact information please check out
                                              <a href="https://www.sutygon.com" id="pixinventLink" target="_blank" className="text-bold-800 primary darken-2">www.sutygon-bot.com</a></p>
                                  </div>



                                </div>
                              </div>

                            </div>

                          </div>
                        </div>
                        <hr />

                      </div>

                    </div>
                  </div>
                </section>
              </div>
            </div>

            <footer className="footer footer-static footer-light">
                            <p className="clearfix text-muted text-sm-center px-2"><span>Quyền sở hữu của &nbsp;{" "}
                                <a href="https://www.sutygon.com" id="pixinventLink" target="_blank" className="text-bold-800 primary darken-2">SUTYGON-BOT </a>, All rights reserved. </span></p>
                        </footer>
          </div>
        </div>
        <OCAlertsProvider />

      </React.Fragment>
    );
  }
}

RentOrder.propTypes = {
  getAllProducts: PropTypes.func.isRequired,
  getCustomer: PropTypes.func.isRequired,
  addNewRentProduct: PropTypes.func.isRequired,
  getProductById: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  auth: PropTypes.object,
  products: PropTypes.array,
  customer: PropTypes.array,
};

const mapStateToProps = (state) => ({
  product: state.product.product,
  auth: state.auth,
  products: state.product.products,
  customer: state.customer.customer,
});
export default connect(mapStateToProps, {
  getAllProducts,
  getCustomer,
  addNewRentProduct,
  getProductById,
  updateProduct,
})(RentOrder);
