import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { addNewProduct, getProduct, updateProduct } from "../../../actions/product";
import Alert from "../../layout/Alert";
import Loader from "../../layout/Loader";

import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import shortid from "shortid";


class AddProduct extends Component {
  state = {
    id: "",
    image: "",
    name: "",
    color: [
      {
        id: shortid.generate(),
        colorname: "",
        sizes: [],
        // {
        //   id: shortid.generate(),
        //   size: "",
        //   qty: "",
        //   price: "",
        //   barcode: ""
        // },
      },
    ],
    saving: false,
  };



  async componentDidMount() {
    // check form is to Add or Edit
    if (this.props.match.params.id) {
      const id = this.props.match.params.id;
      let res = await this.props.getProduct(id);
      const { product } = this.props;
      if (product) {
        this.setState({
          id: id,
          name: product.name,
          color: product.color.map((color) => {
            color.id = shortid.generate();
            return { ...product };
          }),

        });
      }
    }
  }

  addAnotherSize = () => {
    // const { color } = this.state;
    let color = [...this.state.color];
color.push({
//   sizes:[{
//     size:"",
//     price:"",
//     qty:"",
//   },
// ],
colorname:this.state.colorname
})
console.log(color);
this.setState({ color:[
  ...this.state.color
] });
 

  }
  removeSizebox = (id) => {
    let { color } = this.state;
    color = color.filter((color) => color.id !== id);
    this.setState({ color });
  };

  getColors = () => {
    let { color } = this.state;
    return color.map((color) => (
    <div className="row color-row"  key={color.id || color._id}>
      <div className="col-md-12">
        <div className="form-group">
          <input
            type="text"
            className="form-control mm-input "
            placeholder="Color"
            value={color.colorname}
            name="colorname"
            onChange={(e) => this.handleChange(e,color.id)} />
        </div>
      </div>
      <div className="col-md-12">
        {this.getSizeboxes(color.id)}
      </div>
      <div class="row">
        <div class="col-md-12 btn-cont">
          <div class="form-group mb-0">
            <button
              type="button"
              onClick={() => this.addAnotherSize()}
              class="btn "><i class="fa fa-plus"></i> Add another
              Size</button>
          </div>
        </div>
      </div>
    </div>
    ))
  }

  getSizeboxes = (id) => {
    let { color } = this.state;
    color = color.filter((color) => color.id !== id);
 console.log(color)
 return;
    let { size } = this.state;
    return size.map((size) => (
      <div className="sizes_box" key={size.id || size._id}>
        <div className="row">
          <div className="col-md-12">
            <input
              type="text"
              name="size"
              className="form-control mm-input s-input"
              placeholder="Size"
              onChange={(e) => this.handleChange(e, color.id)}
            //  value={color.sizes.size}
            />
            <input
              type="text"
              name="qty"
              className="form-control mm-input s-input"
              placeholder="Quantity"
              onChange={(e) => this.handleChange(e, color.id)}
            //  value={color.sizes.qty}

            />
            <input
              type="text"
              name="price"
              className="form-control mm-input s-input"
              placeholder="Price"
              onChange={(e) => this.handleChange(e, color.id)}
            // value={color.sizes.price}

            />
            <div className="right">

              <button
                type="button"
                onClick={() => this.removeSizebox(color.id)}
                className="btn btn-raised btn-sm btn-icon btn-danger mt-1">
                <i className="fa fa-minus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    ))

  }

  _onChange = (e, id = "") => {
    this.setState({ [e.target.name]: e.target.files[0] });
  }

  handleChange = (e, id = "") => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "colorname" ) {
      
      this.setState({ color });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ saving: true });

    const state = { ...this.state };
    const formData = new FormData();
    formData.append('name', state.name)
    formData.append('image', state.image)
    formData.append('color', state.color)

    
    //   color: state.color.map((color) => {
    //     let c = {};
    //     c._id = color._id;
    //     c.colorname = color.subjectTitle;
    //     return c;
    //   }),
    // };



    if (state.id === "") {
      await this.props.addNewProduct(formData);

    } else {
      await this.props.updateProduct(formData, state.id);
    }
    this.setState({ saving: false });
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
                          {this.state.id === ""
                            ? "Add New Product"
                            : "Update Product"}</h4>
                      </div>

                      <div className="card-body">

                        <form
                          encType="multipart/form-data"
                          action="/upload"
                          method="POST"
                          onSubmit={(e) => this.onSubmit(e)}>

                          <Alert />
                          <div className="form-group">
                            {/* <div className="file btn btn-raised gradient-purple-bliss white input-div shadow-z-1-hover">
                            Upload Image
                              </div> */}
                            <input
                              name="image"
                              type="file"
                              className="form-control-file file btn btn-raised gradient-purple-bliss white input-div shadow-z-1-hover"
                              id="projectinput8"
                              accept='image/*,.pdf,.jpg'
                              onChange={(e) => this._onChange(e)} />

                          </div>

                          <div className="form-group">
                            <input
                              type="text"
                              id="projectinput1"
                              className="form-control mm-input"
                              placeholder="Product Name"
                              value={this.state.name}
                              name="name"
                              onChange={(e) => this.handleChange(e)} />

                          </div>

                          <div className="row">
                            <div className="col-md-12">
                              <h3>Colors</h3>
                            </div>
                          </div>
                          <div id="colors_box">
                            {this.getColors()}
                          </div>


                          <br />
                          <br />


                          <div className="form-actions top">
                            {this.state.id === ""
                              ? <>

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
                                      <i className="ft-check" /> Add Product
                                    </button>
                                  )}
                              </>
                              : <>

                                {this.state.saving ? (
                                  <button
                                    type="button"
                                    className="mb-2 mr-2 btn btn-raised btn-primary"
                                  >
                                    <div
                                      className="spinner-grow spinner-grow-sm "
                                      role="status"
                                    ></div>
                                &nbsp; Updating
                                  </button>
                                ) : (
                                    <button
                                      type="submit"
                                      className="mb-2 mr-2 btn btn-raised btn-primary"
                                    >
                                      <i className="ft-check" /> Update Product
                                    </button>
                                  )}
                              </>}
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

AddProduct.propTypes = {
  saved: PropTypes.bool,
  addNewProduct: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,

  auth: PropTypes.object,
  updateProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product.product,
  saved: state.product.saved,
  auth: state.auth,

});
export default connect(mapStateToProps, {
  addNewProduct, getProduct, updateProduct
})(AddProduct);

