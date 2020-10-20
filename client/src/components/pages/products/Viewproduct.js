import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import {
  getAllProducts,updateProduct,
  deleteProduct,
  getProductById,
  findProducts,
} from "../../../actions/product";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import Loader from "../../layout/Loader";

class ViewProduct extends Component {
  state = {
    filter: "",
  };

  async componentDidMount() {
    await this.props.getAllProducts();
  }

  handleChange = (e, id = "") => {
    this.setState({ [e.target.name]: e.target.value });
  };


  // return sorted products for barcodes
  getSortedData = (products) => {
    // looping through prducts
    let rows = [];
    products.forEach((product, p_index) => {
      let product_name = product.name;
      let product_id = product._id;
      let product_image = product.image

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
              let totalQty = size.qty;  
              let length;
            
              // show sizes with barcode
              if(size.barcodes) {
                // if barcodes availble then length should be qty - barcodes length
                length = size.barcodes.length;
              } else {
                length = 0;
              }
              let i;
              for (i = 0; i < length; i++) {
                let row = {
                  product_id: product_id,
                  product_image: product_image,
                  prduct_totalQty: totalQty,
                  color_id: color_id,
                  size_id: size_id,
                  barcodeIndex: i, // will be used to identify index of barcode when changeBarcode is called
                  title: product_name + " | " + color_name + " | " + size_name,
                  barcode : (size.barcodes) ? size.barcodes[i].barcode: "",  
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

  getTAble = () => {
    const { products } = this.props;
    if (products) {
      const productArray = this.getSortedData(products);

      let tbl_sno = 1;
      if (productArray) {
        if (productArray.length === 0) {
          return (
            <tr>
              <td colSpan={10} className="text-center">
                No product Found
            </td>
            </tr>
          );
        }
        return productArray.map((product, i) => (
          <tr key={i}>
            <td className="text-center text-muted">{tbl_sno++}</td>
            <td className="text-center">{""}</td>
            <td className="text-center">{product.barcode}</td>

            <td className="text-center">
              <img
                className="media-object round-media"
                src={`${product.product_image}`}
                alt="Generic placeholder image"
                height={75}
              />
            </td>
            <td className="text-center">{product.title}</td>

            { <td className="text-center">{product.prduct_totalQty}</td>}

            <td className="text-center">{product.price}</td>

            <td className="text-center">
              <Link
                to={{
                  pathname: `/product/viewproduct/${product.product_id}`,
                  data: product
                }}
                className="info p-0"
              >
                <i className="ft-eye font-medium-3 mr-2" title="View"></i>
              </Link>
              <Link
                to={{
                  pathname: `/product/editproduct/${product.product_id}`,
                  data: product
                }}

                className="success p-0"
              >
                <i className="ft-edit-2 font-medium-3 mr-2" title="Edit"></i>
              </Link>
              <Link
                to="/product"
                onClick={() => this.onDelete(product)}
                className="danger p-0"
              >
                <i className="ft-x font-medium-3 mr-2" title="Delete"></i>
              </Link>
            </td>
          </tr>
        ));
      }
    };
  };
  async searchTable() {
    const searchVal = this.state.search;
    if (searchVal) {
      await this.props.findProducts(searchVal);
    } else {
      await this.props.getAllProducts();
    }
  }

  async onDelete(product) {
    const {barcode,barcodeIndex,color_id,size_id,product_id} = product;
 let color = this.disableBarCode(barcode,product_id,color_id,size_id,barcodeIndex);
 console.log("color",color)
 await this.props.updateProduct(color,product_id)

}

   disableBarCode = async (barcode, product_id, color_id, size_id, barcodeIndex) => {
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
                    size.barcodes[barcodeIndex].isDisable = true; // Disable barcode
                } 
              }
            })
          }
        }
return color;
        // disable selected barcode only
      })

      

    }
  }


  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { products } = this.props;
    const { filter } = this.state;

    return (
      <React.Fragment>
        <Loader />
        <div className="wrapper menu-collapsed">
          <Header />
          <Sidebar location={this.props.location} />
          <div className="main-panel">
            <div className="main-content">
              <div className="content-wrapper">
                <section id="extended">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title">All Products</h4>
                        </div>
                        <div className="card-content">
                          <div className="card-body table-responsive">
                            <div className="row">
                              <div className="col-md-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="search"
                                  onChange={(e) => this.handleChange(e)}
                                />
                              </div>
                              <div className="col-md-4">
                                <a
                                  className="btn btn-success"
                                  onClick={() => this.searchTable()}
                                >
                                  <i className="fa fa-search"></i> Search{" "}
                                </a>
                              </div>
                              <div className="col-md-4">
                                <Link
                                  to="/product/addproduct"
                                  className="btn btn-primary pull-right"
                                >
                                  {" "}
                                  <i className="fa fa-plus"></i> New Product
                                </Link>
                              </div>
                            </div>
                            <Alert />

                            <table className="table text-center">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th></th>
                                  <th>Product ID</th>
                                  <th>Image</th>
                                  <th>Name</th>
                                  <th>Total Quantity</th>
                                  <th>Price</th>
                                  <th>Actions</th>

                                </tr>
                              </thead>
                              <tbody>{this.getTAble()}</tbody>
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
      </React.Fragment>
    );
  }
}

ViewProduct.propTypes = {
  auth: PropTypes.object,
  getAllProducts: PropTypes.func.isRequired,
  getProductById: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  findProducts: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  products: PropTypes.array,
  product: PropTypes.array,
};

const mapStateToProps = (state) => ({
  products: state.product.products,
  product: state.product.product,

  auth: state.auth,
});
export default connect(mapStateToProps, {
  getAllProducts,updateProduct,
  deleteProduct,
  getProductById,
  findProducts,
})(ViewProduct);
