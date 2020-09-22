import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { getAllProducts, updateProduct, getProductById, barcodeUpdateProduct } from "../../actions/product";
import Loader from "../layout/Loader";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import shortid from "shortid";
import { OCAlertsProvider } from '@opuscapita/react-alerts';
import { OCAlert } from '@opuscapita/react-alerts';



import "../../custom.css";

var JsBarcode = require('jsbarcode');
var { createCanvas } = require("canvas");


class Barcode extends Component {
  state = {
    dataType: "without_barcode",
    saving: false,
  };

  async componentDidMount() {
    await this.props.getAllProducts();
  }

  // return sorted products for barcodes / without barcodes
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

              let length;
              if(this.state.dataType == "without_barcode") { // show sizes without barcodes
                // if we have some barcodes then skip that 
                // number of rows for the current size
                if(size.barcodes) {
                  // if barcodes availble then length should be qty - barcodes length
                  length = size.qty - size.barcodes.length;
                } else {
                  length = size.qty;
                }
              } else { // show sizes with barcode
                if(size.barcodes) {
                  length = size.barcodes.length;
                } else {
                  length = 0;
                }
              }

              let i;
              for (i = 0; i < length; i++) {
                let row = {
                  product_id: product_id,
                  color_id: color_id,
                  size_id: size_id,
                  barcodeIndex: i, // will be used to identify index of barcode when changeBarcode is called
                  title: product_name + " | " + color_name + " | " + size_name,
                  barcodes: (size.barcodes) ? size.barcodes: []
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

  handleChange = (type = "") => {
    this.setState({ 'dataType': type });
  };

  getTAbleRows = () => {
    
    let products = this.props.products;
    if(products) {
      let sortedProducts = this.getSortedData(products);
      console.log('abc', sortedProducts)
    // let tbl_sno = 1;
    if (sortedProducts) {
      if (sortedProducts.length === 0) {
        return (
          <tr>
            <td colSpan={10} className="text-center">
              No product Found
            </td>
          </tr>
        );
      }
      return sortedProducts.map((product, i) => {
        return (
          <tr key={i}>
          <td>
            <div className="form-group">
              <div className="">
                {product.title}
              </div>
            </div>
          </td>
          <td>
            {(this.state.dataType == 'without_barcode') ? (
              <button
              type="button"
              className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
              onClick={(e) => this.genPrintRandBarcode(e, product.product_id, product.color_id, product.size_id)}
            >
              Generate &amp; PRINT random barcode
            </button>
            ) : (
              <button
              type="button"
              className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
              onClick={(e) => this.changeBarcode(e, product.product_id, product.color_id, product.size_id, product.barcodeIndex)}
            >
              Change Barcode
            </button>
            )}
          </td>
          <td>
          {(this.state.dataType == 'without_barcode') ? (
              <form onSubmit={(e) => this.OnSubmitScanBarcode(e, product.product_id, product.color_id, product.size_id)}>
              <input
                type="text"
                className="form-control mm-input"
                placeholder={"Scan existing Barcode"}
              />
            </form>
            ) : (
              <button
              type="button"
              className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
              onClick={(e) => this.printBarcode(product.barcodes[product.barcodeIndex].barcode)}
            >
              Print Barcode
            </button>
            )}
          </td>
        </tr>
        );
      });
    }
    }
    
  };

  // runs when existing barcode is scanned
  OnSubmitScanBarcode = async (e, product_id, color_id, size_id) => {
    e.preventDefault();
    // get barcode input value
    let barcode = e.target[0].value;
    // empty barcode input
    e.target[0].value = '';
    this.saveBarCode(barcode, product_id, color_id, size_id);
    // success message
    OCAlert.alertSuccess('Barcode Scanned and Added Successfully!');

  }

  // generate and print random bar code
  genPrintRandBarcode = async  (e, product_id, color_id, size_id) => {
    // generate randome barcode
    let barcode = shortid.generate();
    this.saveBarCode(barcode, product_id, color_id, size_id);
    this.printBarcode(barcode);
    OCAlert.alertSuccess('Barcode Generated and Saved Successfully!');
  }

  // change existing barcode in size object and correct index
  changeBarcode = async (e, product_id, color_id, size_id, barcodeIndex) => {
    // generate randome barcode
    let barcode = shortid.generate();
    this.saveBarCode(barcode, product_id, color_id, size_id, 'update', barcodeIndex);
    // this.printBarcode(barcode);
    OCAlert.alertSuccess('Barcode is being Changed');
  }

  printBarcode = (barcode) => {
    var canvas = createCanvas();

    // convert barcode to image and open in new window and print
    JsBarcode(canvas, barcode);
    let html  = '<img src="' + canvas.toDataURL() + '" style="width: 100%" />';
    let newWindow = window.open("", '_blank', 'location=yes,height=570,width=720,scrollbars=yes,status=yes');
    newWindow.document.write(html);
    newWindow.window.print();
    newWindow.document.close();
  }

  // saves the barcode in specific item > color > size object
  saveBarCode = async (barcode, product_id, color_id, size_id, mode='add', barcodeIndex='') => {
    
    // get product by id
    await this.props.getProductById(product_id);
    const { product } = this.props;

    if(product && product.color) {
      // loop through product colors
      product.color.forEach((color, c_index) => {
        // get right color obj
        if(color._id == color_id) {
          // get right size obj
          if(color.sizes) {
            color.sizes.forEach((size, s_index) => {
              if(size.id == size_id) {
                // check if current size obj contain barcodes or not
                if(size.barcodes) {
                  
                  if(mode == 'add') {
                    size.barcodes.push({barcode});  // Add barcode
                  } else {
                    size.barcodes[barcodeIndex].barcode = barcode; // Change barcode
                  }
                } else {
                  // create new barcode array
                  size.barcodes = [];
                  // and push this new barcode to it
                  size.barcodes.push({barcode});
                }
              }
            })
          }
        }
      })

      // update product for barcode only
      await this.props.barcodeUpdateProduct(product, product_id);
      return barcode;
    }
  }

  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }
    if (this.props.saved) {
      return <Redirect to="/product" />;
    }

    
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
                        <h4 className="form-section">Barcode</h4>
                      </div>

                      <div className="card-body">
                        <div className="custom-radio custom-control-inline ml-3">
                          <input
                            type="radio"
                            id="customRadioInline1"
                            name="dataType"
                            className="custom-control-input"
                            onChange={(e) => this.handleChange("without_barcode")}
                            checked={this.state.dataType === "without_barcode"}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadioInline1"
                          >
                            Items Without Barcode
                          </label>
                        </div>

                        <div className="custom-radio custom-control-inline ml-3">
                          <input
                            type="radio"
                            id="customRadioInline2"
                            name="dataType"
                            className="custom-control-input"
                            onChange={(e) => this.handleChange("with_barcode")}
                            checked={this.state.dataType === "with_barcode"}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadioInline2"
                          >
                            Items With Barcode
                          </label>
                        </div>

                        <br />
                        <br />
                        <table className="table text-center">
                          <thead>
                            {this.getTAbleRows()}
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <footer className="footer footer-static footer-light">
              <p className="clearfix text-muted text-sm-center px-2">
                <span>
                  Powered by &nbsp;{" "}
                  <a
                    href="https://www.alphinex.com"
                    id="pixinventLink"
                    target="_blank"
                    className="text-bold-800 primary darken-2"
                  >
                    Alphinex Solutions{" "}
                  </a>
                  , All rights reserved.{" "}
                </span>
              </p>
            </footer>
          </div>
        </div>
        {/* Alerts */}
        <OCAlertsProvider />
      </React.Fragment>
    );
  }
}

Barcode.propTypes = {
  saved: PropTypes.bool,
  getAllProducts: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  barcodeUpdateProduct: PropTypes.func.isRequired,
  getProductById: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  products: state.product.products,
  product: state.product.product,
  saved: state.product.saved,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getAllProducts,
  updateProduct,
  getProductById,
  barcodeUpdateProduct
})(Barcode);
