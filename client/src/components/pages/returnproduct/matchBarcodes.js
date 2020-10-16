import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { getAllProducts, getProductById, updateProduct } from "../../../actions/product";
import { getCustomer } from "../../../actions/customer";
import { updateRentedProduct } from "../../../actions/rentproduct";
import Loader from "../../layout/Loader";
import { Link } from "react-router-dom";
import * as moment from 'moment'

import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "../../../custom.css"
// import c from "config";


class MatchBarcodes extends Component {
  state = {
    customer: "",
    taxAmt: "",
    customer_id: "",
    order: "",
    missingItmCharges: "",
    customerOwe: "",
    insuranceAmt: "",
    leaveID: "",
    returnAmt: "",
    totalPaid: "",
    product_Array: "",
  };

  handleChange = (e, id = "") => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async componentDidMount() {
    const { order } = this.props;
    const { data } = this.props.location
    if (data) {
      this.setState({
        customer_id: data.customer,
        order: data.order,
        insuranceAmt: data.order[0].insuranceAmt,
        barcodesArray: data.barcodesArray,
        taxAmt: data.order[0].taxAmt,
        totalPaid: data.order[0].totalPaid

      });
    }
    await this.props.getCustomer(this.state.customer_id);

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

  returnAmt = () => {
    const { customerOwe, insuranceAmt, missingItmCharges } = this.state;
    const returnAmt = Number(customerOwe) + Number(insuranceAmt) + Number(missingItmCharges);
    return returnAmt;
  }

  finalInVoiceTotal = () => {
    const { totalPaid, insuranceAmt, missingItmCharges } = this.state;
    const finalInVoiceTotal = Number(totalPaid) - Number(insuranceAmt) + Number(missingItmCharges);
    return finalInVoiceTotal;
  }
  productBox = () => {
    let productarray = [];
    let { order } = this.props.location.data;
    let { barcodesArray } = this.state;
    const { products } = this.props;
    if (products && barcodesArray) {
      let sortedAray = this.getSortedData(products);
      if (sortedAray) {
        barcodesArray.forEach((element) => {
          productarray.push(
            sortedAray.filter((f) => f.barcode === element.barcode)
          );
          return productarray;
        });
      }
    }
    this.state.product_Array = productarray
    return productarray.map((b, b_index) => (
      <>
        <div id="sizes_box" key={b_index} >
          <div className="row" >

            <div className="left">
              <input
                type="text"
                value={`${b[0].title} ${"|"} ${b[0].barcode}`}
                className="form-control mm-input s-input text-center text-dark"
                placeholder="Barcode"
                id="widthBr"
                style={{ width: "-webkit-fill-available" }}
              />
            </div>
            <div className="right">
              <button
                type="button"
                // onClick={}
                className="btn btn-raised btn-sm btn-icon btn-default mt-1">
                <i className="fa fa-check text-success fa-2x"></i>
              </button>
            </div>
          </div>
        </div>

      </>
    ))
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ saving: true });

    const state = { ...this.state };
    const { user } = this.props.auth;
    const { customer } = this.props;
    const { order } = this.props.location.data;

    // const returnOrder = {
    //       orderNumber: state.orderNumber,
    //       customer: state.customer_id,
    //       customerContactNumber: customer.contactnumber,
    //       user: user._id,
    //       barcodes: barcodeArr,
    //       total: state.total,
    //       returnDate: state.returnDate,
    //       rentDate: state.rentDate,
    //       leaveId: true,
    //       insuranceAmt:state.insAmt
    //     };

    //  await this.props.addNewRentProduct(product);

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
                      size.barcodes[pd[0].barcodeIndex].isRented = false;
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
        const rentedProduct = {
          status: "Completed"
        }
        // this.props.updateRentedProduct(rentedProduct, order[0]._id)
      });

    }
    this.setState({ saving: false });
    // this.setState({
    //   barcodesRented: true
    // })
  };

  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (this.props.saved) {
      //   return <Redirect to="/product" />;
    }
    // const { order } = this.props;
    const { customer } = this.props;
    const { data } = this.props.location;
    const { order } = data;

    const { barcodesArray } = data
    const { customerOwe, insuranceAmt, missingItmCharges } = this.state;

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
                        <h4 className="form-section">
                          {/* <i className="icon-social-dropbox"></i> */}
                          Return Product
                          </h4>
                      </div>

                      <div className="card-body table-responsive">
                        <div className="card-body table-responsive">
                          <div id="colors_box">
                            <div className="row color-row">
                              <div className="col-md-12">
                                <div className="text-center">
                                  <h2>    Scan and match barcodes with all items    </h2>
                                  <br />
                                </div>
                                <div className="form-group">
                                  <div style={{ 'float': 'left' }}>

                                    <h3>{(customer) ? `${customer[0].name}${"#"}${customer[0].contactnumber}` : ""}</h3>
                                    <br />
                                  </div>
                                  <div style={{ 'float': 'right' }}>
                                    <h3>{(data) ? `${"Order"}${"#"} ${order[0].orderNumber}` : ""}</h3>

                                  </div>
                                </div>
                              </div>
                              <form onSubmit={(e) => this.onSubmit(e)}>

                                <div className="col-md-12">
                                  <div className="text-center">
                                    <h3>    You are returning {(order && order.length > 0) ? `${barcodesArray.length}${"/"}${order[0].barcodes.length}` : `0`} products in this order </h3>
                                    <br />
                                  </div>
                                  {this.productBox()}
                                  <h3></h3>
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <div style={{ 'float': 'left' }}>
                                          <h4 id="padLeft">Enter total missing items charge</h4>
                                        </div>
                                        <div style={{ 'paddingLeft': '700px' }}>
                                          <input
                                            name="missingItmCharges"
                                            style={{ 'width': '85%', 'color': 'black' }}
                                            type="text"
                                            className="form-control mm-input s-input text-center"
                                            placeholder="Total"
                                            id="setSizeFloat"
                                            value={missingItmCharges}
                                            onChange={(e) => this.handleChange(e)}
                                          />
                                        </div>  </div>
                                    </div>
                                  </div>
                                  <br />

                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <div style={{ 'float': 'left' }}>

                                          <h4 id="padLeft">Insurance return
to customer</h4>
                                        </div>
                                        <div style={{ 'paddingLeft': '700px' }}>
                                          <input
                                            name="insuranceAmt"
                                            style={{ 'width': '85%', 'color': 'black' }}
                                            type="text"
                                            className="form-control mm-input s-input text-center"
                                            placeholder="Total"
                                            id="setSizeFloat"
                                            value={this.state.order ? `${"$"}${this.state.order[0].insuranceAmt}` : "$0"}
                                            onChange={(e) => this.handleChange(e)}


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

                                          <h4 id="padLeft">Customer owe
</h4>
                                        </div>
                                        <div style={{ 'paddingLeft': '700px' }}>
                                          <input
                                            name="customerOwe"
                                            style={{ 'width': '85%', 'color': 'black' }}
                                            type="text"
                                            className="form-control mm-input s-input text-center"
                                            placeholder="Total"
                                            id="setSizeFloat"
                                            value={customerOwe}
                                            onChange={(e) => this.handleChange(e)}
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

                                          <h4 id="padLeft">  Return customer
</h4>
                                        </div>
                                        <div style={{ 'paddingLeft': '700px' }}>
                                          <input
                                            name="returnCustomer"
                                            style={{ 'width': '85%', 'color': 'black' }}
                                            type="text"
                                            className="form-control mm-input s-input text-center"
                                            placeholder=""
                                            id="setSizeFloat"
                                            value={(customerOwe && insuranceAmt && missingItmCharges) ? `${"$"}${this.returnAmt()}` : "$0"}
                                            onChange={(e) => this.handleChange(e)}

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
                                              onChange={(e) => this.handleChange(e)}
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
                                              onChange={(e) => this.handleChange(e)}
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
                                  <div className="col-md-12">
                                    <div id="sizes_box">
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
                                            ><i className="ft-check"></i> Submit &amp; Generate Invoice	</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>



                                </div>
                              </form>
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
                                  <hr />

                                    <div id="colors_box">

                                      <div className="row color-row">
                                        <div className="col-md-12">
                                          <div className="form-group">
                                            <div style={{ 'float': 'left' }}>

                                              <h4>{(customer) ? `${customer[0].name}${"#"}${customer[0].contactnumber}` : ""}</h4>
                                            </div>
                                            <div style={{ 'float': 'right' }}>
                                              <h4>{(data) ? `${"Order"}${"#"} ${order[0].orderNumber}` : ""}</h4>

                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div id="sizes_box">
                                            {this.productBox()}
                                            <hr />

                                            <div className="row">
                                              <div className="col-md-6"  style={{ 'float': 'left','color':'black' }}>
                                                  <h6 id="padLeft">Tax amount</h6>
                                                </div>
                                                <div className="col-md-6" style={{ 'textAlign': 'center' ,'color':'black'}}>

                                                  <h6 >
                                                    {this.state.taxAmt}
                                                  </h6>
                                                </div>

                                              </div>


                                            <div className="row">
                                              <div className="col-md-6" style={{ 'float': 'left' ,'color':'black' }}>

                                                  <h6 id="padLeft">Insurance amount</h6>
</div>
                                                <div  className="col-md-6"style={{ 'textAlign': 'center','color':'black' }}>
                                                  <h6 >
                                                    {this.state.insuranceAmt}
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
                                                    value={`${"PAID TOTAL: $"}${this.state.insuranceAmt}`}

                                                  />


                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-6" style={{ 'float': 'left','color':'black' }}>


                                                <h6 >Lost Items Charge
</h6></div>

                                              <div className="col-md-6 text-center" style={{'color':'black'}}>



                                                <h6 >
                                                  {this.state.missingItmCharges}
                                                </h6>

                                              </div>

                                            </div>




                                            <div className="row">
                                              <div className="col-md-6" style={{ 'float': 'left','color':'black' }}>

                                                  <h6 id="padLeft">Amount Return to customer</h6>
                                                </div>
                                                <div className="col-md-6"style={{ 'textAlign': 'center' ,'color':'black'}}>
                                                  <h6 >

                                                    {(this.state.customerOwe && this.state.insuranceAmt && this.state.missingItmCharges) ? `${"$"}${this.returnAmt()}` : "$0"}
                                                  </h6>
                                                </div>

                                              

                                            </div>

<br />


                                            <div className="row">
                                              <div className="col-md-6" style={{ 'float': 'left','color':'black' }}>

                                               
                                                  <h6 id="padLeft">Leave ID</h6>
                                                </div>
                                                <div className="col-md-6" style={{ 'textAlign': 'center','color':'black' }}>
                                                  <h6 >
                                                    {this.state.leaveID}
                                                  </h6>
                                                </div>

                                            </div>



                                            <div className="row">
                                              <div className="col-md-6" style={{ 'float': 'left','color':'black' }}>
                                                  <h6 id="padLeft">Rent From</h6>
                                                </div>
                                                <div style={{ 'textAlign': 'center' ,'color':'black'}}>
                                                  <h6>
                                                    {moment(this.state.rentDate).format('DD/MMM/YYYY')}

                                                  </h6>
                                                </div>
                                            

                                            </div>



                                            <div className="row">
                                              <div className="col-md-6" style={{ 'float': 'left','color':'black' }}>
                                                  <h6 >Due Date</h6>
                                                </div>

                                                <div style={{ 'textAlign': 'center','color':'black' }}>
                                                  <h6 >

                                                    {moment(this.state.returnDate).format('DD/MMM/YYYY')}
                                                  </h6>
                                                </div>


                                       </div>


                                            {/* <div className="row d-flex justify-content-center">
                                              <div className="form-group">
                                                <div className="col-md-12">

                                                  <div className="text-center" style={{ 'color': 'black' }}>
                                                    
                                                  </div>

                                                </div>
                                              </div>
                                            </div> */}
                                            <div className="container">
                                            <div class="row justify-content-md-center">
                                            
                                              <div class="col-lg-auto">
                                                <input
                                                  style={{ 'color': 'black','width':'-webkit-fill-available' }}
                                                  type="text"
                                                  className="form-control mm-input s-input text-center"
                                                  placeholder="Total"

                                                  id="setSizeFloat"
                                                  value=


                                                  {`${"FINAL INVOICE TOTAL: $"}${this.finalInVoiceTotal()}`}

                                                />
                                              </div>
                                             
                                            </div>
                                            </div>
                                            <div className="col-md-12">
                                             
                                               <table>
                                                 <tr>
                                                   <td style={{'backgroundColor':'white','textAlign' : 'center' ,'marginRight':'10px'}}>Order ID <br />
                                                    {order[0]._id}
                                                   </td>
                                                   <td style={{textAlign : "center"}}> Authorized by <br />
                                                        Sutygon-Bot</td>
                                                 </tr>
                                               </table>
                                            

                                            </div>
                                            <div className="row">
                                            <p>For questions and contact information please check out
www.sutygon.com </p>
                                            </div>

                                          

                                          </div>
                                          </div>

                                        </div>

                                      </div>
                                    </div>
                                    <hr />

                                  </div>
                                  <div className="modal-footer">
                                                
                                </div>
                              </div>
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
              <p className="clearfix text-muted text-sm-center px-2"><span>Powered by &nbsp;{" "}
                <a href="https://www.alphinex.com" id="pixinventLink" target="_blank" className="text-bold-800 primary darken-2">Alphinex Solutions </a>, All rights reserved. </span></p>
            </footer>

          </div>

        </div>


      </React.Fragment>

    );
  }
}



MatchBarcodes.propTypes = {
  getCustomer: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  getProductById: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  updateRentedProduct: PropTypes.func.isRequired,
  saved: PropTypes.bool,
  order: PropTypes.array,
  customer: PropTypes.array,

  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  // saved: state.rentedproduct.saved,
  products: state.product.products,
  product: state.product.product,
  customer: state.customer.customer,
  auth: state.auth,

});
export default connect(mapStateToProps, {
  getCustomer, getAllProducts, getProductById, updateProduct, updateRentedProduct


})(MatchBarcodes);