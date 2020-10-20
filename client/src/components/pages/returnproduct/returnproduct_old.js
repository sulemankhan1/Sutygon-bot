import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { getOrderbyCustomerNumber, getOrderbyOrderNumber,getOrderbyID } from "../../../actions/returnproduct";
import { getAllProducts } from "../../../actions/product";
import { getCustomer } from "../../../actions/customer";
import Alert from "../../layout/Alert";
import Loader from "../../layout/Loader";
import { Link } from "react-router-dom";

import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "../../../custom.css"
// import e from "express";
// import c from "config";


class ReturnProduct extends Component {
  state = {
    customer: "",
    orderNumber: "",
    customer_id: "",
    selectedOrder:false,
    orderId:"",

  };

  async componentDidMount() {
    await this.props.getAllProducts();

    const { order } = this.props;

    if (order) {
      this.setState({
        customer_id: order[0].customer,
        orderNumber: order[0].orderNumber
      });
    }
    await this.props.getCustomer(this.state.customer_id);

     }

  tryAgain = (e) => {
    e.preventDefault();

    var orderNumber = document.getElementById("orderNumber");
    var contactNumber = document.getElementById("contactnumber");
    var statusBox = document.getElementById("statusBox");

    contactNumber.value = "";
    contactNumber.focus();
    statusBox.value = "";
    orderNumber.value = ""

  }


  handleChange = (e, id = "") => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitCustomer = async (e) => {
    e.preventDefault();
    this.setState({ saving: true });

    const state = { ...this.state };
    await this.props.getOrderbyCustomerNumber(state.customer);
    this.setState({ saving: false });
  };

  onSubmitOrderNumber = async (e) => {
    e.preventDefault();
    this.setState({ saving: true });

    const state = { ...this.state };
    await this.props.getOrderbyOrderNumber(state.orderNumber);
    this.setState({ saving: false });
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
  productBox = () => {
   const selectedOrder = this.selectedOrder();
    let productarray = [];
    console.log("productBox",selectedOrder)
    // let { barcodes } = selectedOrder[0];
    // const { products } = this.props;
    // if (products) {
    //   let sortedAray = this.getSortedData(products);
    //   if (sortedAray) {
    //     barcodes.forEach((element) => {
    //       productarray.push(
    //         sortedAray.filter((f) => f.barcode === element)
    //       );
    //       return productarray;
    //     });
    //   }
    // }
    // return productarray.map((b, b_index) => (
     
    //   <>
          
    //  {<div className="col-md-12">
    //   <div className="form-group">
    //     <div className="row" key={b_index}>
    //       <input
    //         type="text"
    //         value={`${b[0].title} ${"|"} ${b[0].barcode}`}
    //         className="form-control mm-input s-input text-center text-dark"
    //         placeholder="Barcode"
    //         id="setSize1"
    //         style={{ 'width': '110%' }}
    //         readOnly
    //          />

    //     </div>
    //     </div>
    //     </div>} 
               

    //   </>
    // ))
  }

  CutomerBox = () => {
    const { order } = this.props;
    const { customer } = this.props;
    console.log("order",order)
    // let returningOrders = order.filter((f => f.status !== "Completed"))
    
    // if (order.length > 0 && customer ) {
      return order.map((o, o_index) => (
      
        <>

          <div className="col-md-12" key={o_index}>
            <div className="row form-group">
              <input
                type="text"
                id="statusBox"
                className="form-control mm-input text-center"
                style={{ 'color': '#495057','width':'-webkit-fill-available' }}
                value={(o && customer[0] && o.status==="New") ? `${"Order#"}${o.orderNumber}${"             "}${customer[0].name}${"             "}${"OrderStatus-"}${o.status}` : (o && customer[0] && o.status==="Completed") ? `Order# ${o.orderNumber} is Completed`:"No Order Found"}
                readOnly />
                  <input
                type="checkbox"
                type="radio"
                name="selectedOrder"
                value={true}
                onChange={(e) => this.handleChange(e)}
                // checked={this.state.selectedOrder === "true"}
                onClick={(e)=>this.selectedOrder(e,o._id)}
                
                />

            </div>
          


          </div>



         </>
        
        ))
    // }
  }
selectedOrder = (e,order_id)=>{
  let orderID = order_id;
  console.log("order_id",orderID)
  const {order} = this.props;
      const seletedOrder = order.filter((f) => f._id === orderID);
      console.log("seletedOrder",seletedOrder)
      return seletedOrder;
}

  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }
    if (this.props.saved) {
      //   return <Redirect to="/product" />;
    }
    const { order } = this.props;
    const { customer } = this.props;


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
                          <form onSubmit={(e) => this.onSubmitCustomer(e)}>

                            <div className="form-group">
                              <h3>Enter Customer 10-digit phone number</h3>
                              <div className="position-relative has-icon-right">
                                <input
                                  name="customer"
                                  type="text"
                                  placeholder="Search"
                                  className="form-control round"
                                  id="contactnumber"
                                  min="0"
                                  // max="10"
                                  ref="contactnumber"

                                  onChange={(e) => this.handleChange(e)}

                                />
                                <div className="form-control-position">
                                  <button
                                    type="submit"
                                    className="mb-2 mr-2 btn ft-search"
                                  >
                                  </button>
                                </div>
                              </div>
                            </div>

                          </form>

                          <form onSubmit={(e) => this.onSubmitOrderNumber(e)}>

                            <div className="form-group">
                              <h3>Or Scan/Enter Order Number</h3>
                              <div className="position-relative has-icon-right">
                                <input
                                  name="orderNumber"
                                  type="text"
                                  placeholder="Search"
                                  className="form-control round"
                                  id="orderNumber"
                                  min="0"
                                  // max="10"
                                  ref="orderNumber"

                                  onChange={(e) => this.handleChange(e)}

                                />
                                <div className="form-control-position">
                                  <button
                                    type="submit"
                                    className="mb-2 mr-2 btn ft-search"
                                  >
                                  </button>
                                </div>
                              </div>
                            </div>

                          </form>

                          {this.props.order ? <> 
                          <div id="colors_box" >
                            <div className="row color-row">
                              <div className="row">
                                <div className="col-md-12">
                                  <h3>Is this the One</h3>
                                </div>
                              </div>
                              {(this.props.order && this.props.order.length>0 )? this.CutomerBox() : 
                              
                              <div className="col-md-12" >
                              <div className="form-group">
                                <input
                                  type="text"
                                  id="statusBox"
                                  className="form-control mm-input text-center"
                                  style={{ 'color': '#495057' }}
                                  value={"No Order Found"}
                                  readOnly />
                              </div>
                  
                  
                  
                            </div>
                  }

                              <div className="col-md-12">
                                <div className="text-center">
                                  <button
                                    type="button"
                                    className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1 text-center"
                                    onClick={(e) => this.tryAgain(e)}
                                    id="btnSize" ><i className="ft-rotate-cw"></i> Try Again
                    </button>


                                </div>
                              </div>
                            </div>
                          </div>
                          </> : ""}
                          <div id="colors_box">
                          {(this.props.order && this.props.order.length > 0 && this.props.order[0].status === "New") ?

                            <div className="row color-row" id="statusBox1">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <div style={{ 'float': 'left' }}>

                                      <h3>{(customer) ? `${customer[0].name}${"#"}${customer[0].contactnumber}` : ""}</h3>
                                    </div>
                                    <div style={{ 'float': 'right' }}>
                                      <h3>{(order) ? `${"Order"}${"#"} ${order[0].orderNumber}` : ""}</h3>

                                    </div>
                                  </div>
                                </div>
                              
                              <div className="col-md-12">

                                {(this.props.order && this.props.order.length > 0 && this.props.order[0].status === "New") ? 
                                <> 
                                  <div id="colors_box">
                                 {this.productBox()} 
                                    <div className="btn-cont text-center">
                                      <div className="form-group">
                                        <Link 
                                        to={{
                                          pathname: "/scanBarcode",
                                          data: {
                                            customer:this.props.customer[0]._id,
                                            order:this.props.orders,
                                          }
                                        }}
                                        type="submit" 
                                        className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1 text-center"
                                         id="btnSize2" ><i className="ft-check"></i> Next</Link>
                                      </div>
                                    </div>
                                  </div>
                               </> : ""}


                              </div>

                            </div>
  : ""}

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

ReturnProduct.propTypes = {
  getOrderbyCustomerNumber: PropTypes.func.isRequired,
  getOrderbyOrderNumber: PropTypes.func.isRequired,
  getCustomer: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  getOrderbyID:PropTypes.func.isRequired,
  saved: PropTypes.bool,
  orders: PropTypes.array,
  customer: PropTypes.array,

  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  products: state.product.products,
  order: state.returnproduct.returnproduct,
  customer: state.customer.customer,
  auth: state.auth,

});
export default connect(mapStateToProps, {
  getOrderbyCustomerNumber, getOrderbyOrderNumber, getCustomer, getAllProducts,getOrderbyID
})(ReturnProduct);