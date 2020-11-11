import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import shortid from "shortid";
import * as moment from 'moment'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getProductById, getAllProducts, updateProductIndex, barcodeUpdateProduct, } from "../../actions/product";
import { getCustomer } from "../../actions/customer";
import { addNewRentProduct, getLastRecord } from "../../actions/rentproduct";
import { getOrderbyOrderNumber } from "../../actions/returnproduct";
import { addNewInvoice } from "../../actions/invoices";
import { OCAlertsProvider } from '@opuscapita/react-alerts';
import { OCAlert } from '@opuscapita/react-alerts'
var JsBarcode = require('jsbarcode');


class RentOrder extends Component {
  state = {
    id: "",
    orderNumber: "",
    orderBarcode: "",
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
    barcodesRented: false,
    redirect: false,
    m_returnDate:""
  };



  async componentDidMount() {
    await this.props.getAllProducts();
    await this.props.getLastRecord();
    const { lastRecord } = this.props
    if (lastRecord) {
      const orderNumber = lastRecord[0].orderNumber;
      if(orderNumber){      const newOrderNumber = this.generateRandomNumber(orderNumber)
      this.setState({
        orderNumber: newOrderNumber
      })
    }

    }

    const { data } = this.props.location;
    if (data) {
      this.setState({
        customer_id: data.customer_id,
        barcode_Array: data.barcode,
      });
    }
    await this.props.getCustomer(this.state.customer_id);

  }
  generateRandomNumber(previousNumber) {
    // break number by dash
    // convert number into integer
    let pn = previousNumber;
    let n_array = previousNumber.split("-");

    // check second half if 90
    if (n_array[1] == 99) {
      // if yes increment first half 
      n_array[0]++;
      n_array[1] = 1;
    } else {
      // if not add 1
      n_array[1]++;
    }

    // let firstHalf = "";
    // if (n_array[0] <= 9) {
    //   firstHalf += "00" + n_array[0];
    // } else if (n_array[0] > 9 && n_array[0] <= 99) {
    //   firstHalf += "0" + n_array[0];
    // } else if (n_array[0] > 99) {
    //   firstHalf += n_array[0];
    // }

    // // let secondHalf = "";
    // if (n_array[1] <= 9) {
    //   secondHalf += "0" + n_array[1];
    // } else if (n_array[1] > 9) {
    //   secondHalf += n_array[1];
    // }


    // return new number
    let n = n_array[0] + "-" + n_array[1];
    return n;
  }

  rentDateValidity = () => {
    const { rentDate, } = this.state;
    var currentdate = moment(new Date).format('DD-MM-YYYY');
    if (moment(moment(rentDate).format('DD-MM-YYYY')).isBefore(currentdate)) {
      OCAlert.alertError(`Rent Date should be after today's date`, { timeOut: 3000 });
      return;
    }

    var threeDaysAfter = (new Date(rentDate).getTime() + (2 * 24 * 60 * 60 * 1000));
    var momentthreeDaysAfter = moment(threeDaysAfter).format("DD-MM-YYYY");
    this.state.returnDate = momentthreeDaysAfter;

    this.state.m_returnDate = moment(threeDaysAfter).format("YYYY-MM-DD");
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
    const orderBarcode = shortid.generate();
    this.setState({
      orderBarcode: orderBarcode
    })
    const rentedOrder = {
      orderNumber:state.orderNumber,
      customer: state.customer_id,
      customerContactNumber: customer.contactnumber,
      user: user._id,
      barcodes: barcodeArr,
      total: state.total,
      returnDate: state.m_returnDate,
      rentDate: state.rentDate,
      leaveId: true,
      insuranceAmt: state.insAmt,
      orderBarcode:state.orderBarcode
    };
    await this.props.addNewRentProduct(rentedOrder);

    await this.props.getOrderbyOrderNumber(state.orderNumber)
    const { order, auth } = this.props;
    if (this.props.generateInvoice == true) {
      if (order) {
        const invoiceRent = {
          order_id: order[0]._id,
          customer_id: order[0].customer,
          user_id: auth.user._id,
          type: "Rent-Invoice",
          orderBarcode: state.orderBarcode
        }
        await this.props.addNewInvoice(invoiceRent);
      }
      this.printBarcode(orderBarcode)
    }
    let { product_Array } = this.state;

    if (product_Array) {
      let products = [];
      let counter = 1;

      product_Array.forEach(async (pd, p_index) => {
        await this.props.getProductById(pd[0].product_id); // <-- Error is here this should give updated product in every loop

        let { product } = this.props;
        counter++;
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
                      this.props.updateProductIndex(product, pd[0].product_id);
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
  };

  onHandleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

  };

  redirect = () => {
    this.setState({
      redirect: true
    })
  }
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
                  title: product_name,
                  color: color_name + " | " + size_name,
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

  printInvoice = () => {
    var printDiv = document.getElementById('modal-body').innerHTML
    let newWindow = window.open("", '_blank', 'location=yes,height=570,width=720,scrollbars=yes,status=yes');
    newWindow.document.body.innerHTML = printDiv
    newWindow.window.print();
    newWindow.document.close();
  }

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
            sortedAray.filter((f) => f.barcode == element.barcode)
          );
          return productarray;
        });
      }
    }
    this.state.product_Array = productarray;
    return this.state.product_Array.map((product, b_index) => (
      <div id="sizes_box">
        <div className="row">
          <div className="left">
            <table className="table table-bordered table-light" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>
              <thead></thead>
              <tbody>
                <tr key={b_index} style={{ "margin": "3px" }}>
                  <td className="text-center">{product[0].barcode}</td>
                  <td className="text-center">{product[0].title}</td>
                  <td className="text-center">{product[0].color}</td>
                  <td className="text-center">{product[0].price}</td>

                </tr></tbody></table>
          </div>
          <div className="right ml-3">
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
          <br />

        </div>

      </div>

    ));
  }

  getInvoiceBarcodeRecord() {
    let { product_Array } = this.state;
    return product_Array.map((product, b_index) => (
      <div key={b_index}>
        <div >
          <table className="table table-bordered table-light" style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>
            <thead></thead>
            <tr>
              <td className="text-center">{product[0].barcode}</td>
              <td className="text-center">{product[0].title}</td>
              <td className="text-center">{product[0].color}</td>
              <td className="text-center">{product[0].price}</td>


            </tr>
          </table>



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

  printBarcode = (barcode) => {
    return JsBarcode("#barcode", barcode, {
      width: 1.5,
      height: 40,
    });

  }
  render() {
    const { auth, order } = this.props;
    const { data } = this.props.location;

    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (this.state.redirect == true) {
      return <Redirect to="/rentproduct" />;
    }

    if (this.props.location.data == undefined) {
      return <Redirect to="/rentproduct" />;

    }
    const { customer } = this.props;
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
                              {/* <form > */}
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
                                              required
                                              readOnly
                                              onChange={(e) =>
                                                this.onHandleChange(e)
                                              }
                                              value={
                                                this.state.product_Array
                                                  ? `${this.calculateTotalWithoutTax()}`
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
                                              required
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
                                                  ? `${this.calculateTax()}`
                                                  : ""
                                              }
                                              readOnly
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
                                              name="insAmt"
                                              style={{ width: "65%" }}
                                              type="text"
                                              className="form-control mm-input s-input text-center"
                                              placeholder="Insurance"
                                              id="setSizeFloat"
                                              required
                                              value={
                                                this.state.insAmt
                                              }
                                              onChange={(e) => this.onHandleChange(e)}


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
                                          <div style={{ 'textAlign': 'center', 'paddingRight': '170px' }}>

                                            <div className="">
                                              <input
                                                type="radio"
                                                name="leaveID"
                                                value={true}
                                                onChange={(e) => this.onHandleChange(e)}
                                                checked={this.state.leaveID === "true"}
                                              />
                                              <label
                                              >YES</label>
                                            </div>
                                            <div className="">
                                              <input
                                                type="radio"
                                                name="leaveID"
                                                value={false}

                                                onChange={(e) => this.onHandleChange(e)}
                                                checked={this.state.leaveID === "false"}
                                              />
                                              <label
                                              >NO</label>
                                            </div>
                                          </div>
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
                                          required
                                          onChange={(e) => this.onHandleChange(e)}
                                          value={this.state.rentDate}
                                          onInput={this.rentDateValidity()}

                                        />
                                      </div>

                                      <div className="col-md-6">
                                        <input
                                          type=""
                                          id="issueinput4"
                                          className="form-control round text-center"
                                          name="returnDate"
                                          data-toggle="tooltip"
                                          data-trigger="hover"
                                          data-placement="top"
                                          required
                                          readOnly
                                          data-title="Return Date"
                                          value={this.state.returnDate == "Invalid date" ? "" : this.state.returnDate}
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
                                              required
                                              readOnly
                                              id="setSizeFloat"
                                              value={
                                                this.state.total_amt
                                                  ? `${this.calculateTotal()}`
                                                  : ""
                                              }

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
                                          data-target="#primary">
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
                </section>
              </div>
            </div>



            <footer className="footer footer-static footer-light">
              <p className="clearfix text-muted text-sm-center px-2"><span>Quyền sở hữu của &nbsp;{" "}
                <a href="https://www.sutygon.com" id="pixinventLink" target="_blank" className="text-bold-800 primary darken-2">SUTYGON-BOT </a>, All rights reserved. </span></p>
            </footer>
          </div>
          {/* Invoice Modal */}
          <div className="modal fade text-left" id="primary" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel8"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header bg-primary white">
                  <h4 className="modal-title text-center" id="myModalLabel8">Invoice</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span className="fa fa-print" aria-hidden="true" onClick={(e) => this.printInvoice(e)}></span>
                  </button>
                </div>
                <div className="modal-body">
                  <div id="colors_box" id="modal-body">
                    <div className="row color-row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <div className="text-center">

                            <h4>{(customer) ? `${customer.name}${"#"}${customer.contactnumber}` : ""}</h4>
                          </div>
                          <div className="text-center">
                            <h4>{(order) ? `${"Order"}${"#"} ${order[0].orderNumber}` : ""}</h4>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div >
                          {this.getInvoiceBarcodeRecord()}
                          <hr />
                          <div className="row">
                            <div className="col-md-6" style={{ 'float': 'left', 'color': 'black' }}>
                              <h6 id="padLeft">Total Without Tax</h6>
                            </div>
                            <div className="col-md-6" style={{ 'textAlign': 'center', 'color': 'black' }}>
                              <h6 >
                                {`${this.state.total_amt}`}
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
                                {`${this.state.tax}`}
                              </h6>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6" style={{ 'float': 'left', 'color': 'black' }}>
                              <h6 id="padLeft">Insurance Amount</h6>
                            </div>
                            <div className="col-md-6" style={{ 'textAlign': 'center', 'color': 'black' }}>
                              <h6 >
                                {`${this.state.insAmt}`}
                              </h6>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="form-group">
                              <div className="" style={{ 'width': '300%' }}>
                                <input
                                  type="text"
                                  readOnly
                                  className="form-control mm-input s-input text-center"
                                  placeholder="Total"
                                  style={{ 'color': 'black' }}

                                  id="setSizeFloat"
                                  value={`${"PAID TOTAL: $"}${this.state.total}`} />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6" style={{ 'float': 'left', 'color': 'black' }}>
                              <h6 >Amount to be returned to customer</h6>
                            </div>
                            <div className="col-md-6" style={{ 'textAlign': 'center', 'color': 'black' }}>
                              <h6 >{`${this.state.insAmt}`}</h6>
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
                            <div style={{ 'textAlign': 'end', 'color': 'black' }}>
                              <h6 style={{ 'textAlign': 'end', 'color': 'black' }}>
                                {moment(this.state.rentDate).format('DD-MM-YYYY')}
                              </h6>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6" style={{ 'float': 'left', 'color': 'black' }}>
                              <h6 >Return Date</h6>
                            </div>

                            <div style={{ 'textAlign': 'end', 'color': 'black', }}>
                              <h6 style={{ 'textAlign': 'end', 'color': 'black' }}>
                                {moment(this.state.m_returnDate).format('DD-MM-YYYY')}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <table>
                              <tbody>
                                <tr>
                                  <td className="col-md-6" style={{ 'backgroundColor': 'white', 'textAlign': 'center', 'padding': '8px', 'width': '50%' }}>
                                    <svg id="barcode"></svg>
                                  </td>
                                  <td className="col-md-6" style={{ 'textAlign': 'center', 'padding': '8px', 'width': '50%' }}>
                                    Authorized by <br />
                                     Sutygon-Bot</td>
                                </tr>
                              </tbody>
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

              </div>

            </div>
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
  updateProductIndex: PropTypes.func.isRequired,
  getOrderbyOrderNumber: PropTypes.func.isRequired,
  addNewInvoice: PropTypes.func.isRequired,
  getLastRecord: PropTypes.func.isRequired,
  auth: PropTypes.object,
  products: PropTypes.array,
  customer: PropTypes.array,
  order: PropTypes.array,
  saved: PropTypes.bool,
  generateInvoice: PropTypes.bool,


};

const mapStateToProps = (state) => ({
  product: state.product.product,
  auth: state.auth,
  lastRecord: state.rentproduct.lastrecord,
  order: state.returnproduct.returnproduct,
  products: state.product.products,
  customer: state.customer.customer,
  // saved: state.product.saved,
  generateInvoice: state.rentproduct.generateInvoice,

});
export default connect(mapStateToProps, {
  getAllProducts,
  getCustomer,
  addNewRentProduct,
  getProductById,
  updateProductIndex,
  addNewInvoice,
  getOrderbyOrderNumber,
  getLastRecord
})(RentOrder);
