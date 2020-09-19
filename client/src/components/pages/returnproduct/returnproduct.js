import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
// import { addNewProduct, getProduct, updateProduct } from "../../../actions/product";
import Alert from "../../layout/Alert";
import Loader from "../../layout/Loader";

import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import shortid from "shortid";

import "../../../custom.css"
// import c from "config";


class ReturnProduct extends Component {

  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }
    if (this.props.saved) {
      //   return <Redirect to="/product" />;
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
                        <h4 className="form-section">
                          {/* <i className="icon-social-dropbox"></i> */}
                          Return Product
                          </h4>
                      </div>

                      <div className="card-body table-responsive">
                        <form className="" action="index.html" method="post">

                          <div className="form-group">
                            <h3>Enter Customer 10-digit phone text</h3>
                            <div className="position-relative has-icon-right">
                              <input type="text" placeholder="Search" className="form-control round" min="0" />
                              <div className="form-control-position"><i className="ft-search"></i></div>
                            </div>
                          </div>

                          <div className="form-group">
                            <h3>Or Scan/Enter Order Number</h3>
                            <div className="position-relative has-icon-right">
                              <input type="text" placeholder="scan or enter order #" className="form-control round" min="0" />
                              <div className="form-control-position"><i className="ft-search"></i></div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-12">
                              <h3>Is this the One</h3>
                            </div>
                          </div>
                          <div id="colors_box">
                            <div className="row color-row text-center">
                              <div className="col-md-12">
                                <div className="form-group ">
                                  <input type="text" className="form-control mm-input " value="#2431    SAM M.SIMTH    Overdue" readonly />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div id="sizes_box">
                                  <div className="row text-center">
                                    <div className="col-md-12 btn-cont">
                                      <div className="form-group">
                                        <button type="button" className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1" id="btnSize2" ><i className="ft-rotate-cw"></i> Try again</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>


                          </div>

                          <div id="colors_box">
                            <div className="row color-row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <h3>SAM M.SIMTH  #123456789</h3>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div id="sizes_box">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <input type="text" value="Product1" className="form-control mm-input s-input" placeholder="Barcode" id="setSize1" style={{ 'width': '90%' }} />
                                    </div>

                                  </div>
                                  <br />

                                  <div className="row">
                                    <div className="col-md-12">
                                      <input type="text" value="Product1" className="form-control mm-input s-input" placeholder="Barcode" id="setSize1" style={{ 'width': '90%' }} />
                                    </div>
                                  </div>
                                  <br />
                                  <div className="row">
                                    <div className="col-md-12">
                                      <input type="text" value="Product1" className="form-control mm-input s-input" placeholder="Barcode" id="setSize1" style={{ 'width': '90%' }} />

                                    </div>

                                  </div>

                                  <br />
                                </div>

                                <div className="col-md-12">
                                  <div id="sizes_box">
                                    <div className="row text-center">
                                      <div className="col-md-12 btn-cont">
                                        <div className="form-group">
                                          <button type="button" className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1" id="btnSize2" ><i className="ft-check"></i> Next</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>


                          </div>



                          <div id="colors_box">
                            <div className="row color-row">
                              <div className="col-md-12">
                                <div className="text-center">
                                  <h2>    Scan and match barcodes with all items
                            </h2>
                                  <br />
                                </div>
                                <div className="form-group">
                                  <div style={{ 'float': 'left' }}>
                                    <h3>SAM M.SIMTH  #123456789</h3>
                                  </div>
                                  <div style={{ 'float': 'right' }}>
                                    <h3>order #2431</h3>

                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div id="sizes_box">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="left" >
                                        <input
                                          type="text"
                                          className="form-control mm-input s-input"
                                          id="widthBr"
                                          value={"Product1"}
                                          style={{ 'width': '90%' }}
                                        />

                                      </div>
                                      <div className="right">
                                        <button
                                          type="button"
                                          className="btn btn-raised btn-sm btn-icon btn-danger mt-1">
                                          <i className="fa fa-minus"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <br />

                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="left" >
                                        <input
                                          type="text"
                                          className="form-control mm-input s-input"
                                          id="widthBr"
                                          value={"Product1"}
                                          style={{ 'width': '90%' }}
                                        />

                                      </div>
                                      <div className="right">
                                        <button
                                          type="button"
                                          className="btn btn-raised btn-sm btn-icon btn-danger mt-1">
                                          <i className="fa fa-minus"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <br />
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="left" >
                                        <input
                                          type="text"
                                          className="form-control mm-input s-input"
                                          id="widthBr"
                                          value={"Product1"}
                                          style={{ 'width': '90%' }}
                                        />

                                      </div>
                                      <div className="right">
                                        <button
                                          type="button"
                                          className="btn btn-raised btn-sm btn-icon btn-danger mt-1">
                                          <i className="fa fa-minus"></i>
                                        </button>
                                      </div>
                                    </div>

                                  </div>

                                  <br />
                                </div>



                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <div style={{ 'float': 'left' }}>
                                        <h4 id="padLeft">Enter total
                                        missing items
charge</h4>
                                      </div>
                                      <div style={{ 'paddingLeft': '700px' }}>
                                        <input
                                          style={{ 'width': '85%' }}
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
                                      <div style={{ 'float': 'left' }}>

                                        <h4 id="padLeft">Insurance return
to customer</h4>
                                      </div>
                                      <div style={{ 'paddingLeft': '700px' }}>
                                        <input
                                          style={{ 'width': '85%' }}
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

                                        <h4 id="padLeft">Customer owe
</h4>
                                      </div>
                                      <div style={{ 'paddingLeft': '700px' }}>
                                        <input
                                          style={{ 'width': '85%' }}
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

                                        <h4 id="padLeft">  Return customer
</h4>
                                      </div>
                                      <div style={{ 'paddingLeft': '700px' }}>
                                        <input
                                          style={{ 'width': '85%' }}
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
                                      <div style={{ 'float': 'right', 'paddingRight': '170px' }}>

                                        <div className="custom-radio">
                                          <input
                                            type="radio"
                                            className="custom-control-input" />
                                          <label
                                            className="custom-control-label"
                                            for="customRadioInline1">YES</label>
                                        </div>
                                        <div className="custom-radio">
                                          <input
                                            type="radio"
                                            className="custom-control-input" />
                                          <label
                                            className="custom-control-label"
                                            for="customRadioInline2">NO</label>
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
                                          <button type="button" className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1" id="btnSize2" ><i className="ft-check"></i> Submit </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              </div>

                            </div>


                          </div>



                          <div id="colors_box">
                            <div className="row color-row">
                              <div className="col-md-12">
                                <div className="text-center">
                                  <h2>    Confirm User
                            </h2>
                                  <br />
                                </div>
                                
                              </div>
                              <div className="col-md-12">
                                <div id="sizes_box">
                                  <div className="row" style={{'paddingLeft':'320px'}}>
                                    <div className="col-md-12">
                                        <input
                                          type="text"
                                          className="form-control mm-input s-input"
                                          id="widthBr"
                                          placeholder="Enter UserName"
                                          style={{ 'width': '60%', }}
                                        />

                                   
                                    </div>
                                  </div>
                                  <br />

                                  <div className="row"  style={{'paddingLeft':'320px'}}>
                                    <div className="col-md-12">
                                        <input
                                          type="text"
                                          className="form-control mm-input s-input"
                                          id="widthBr"
                                          placeholder="Enter your 6digit password"
                                          style={{ 'width': '60%' }}
                                        />

                                   
                                    </div>
                                  </div>
                                  <br />

                                <div className="col-md-12">
                                  <div id="sizes_box">
                                    <div className="row text-center">
                                      <div className="col-md-12 btn-cont">
                                        <div className="form-group">
                                          <button type="button" className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1" id="btnSize2" ><i className="ft-check"></i> Submit &amp; get new invoice</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              </div>

                            </div>

</div>
                          </div>

                        </form>
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
  saved: PropTypes.bool,
  // addNewProduct: PropTypes.func.isRequired,
  // getProduct: PropTypes.func.isRequired,

  auth: PropTypes.object,
  // updateProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // product: state.product.product,
  saved: state.product.saved,
  auth: state.auth,

});
export default connect(mapStateToProps, {
  // addNewProduct, getProduct, updateProduct
})(ReturnProduct);