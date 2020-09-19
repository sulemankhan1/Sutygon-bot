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

import "../../../custom.css"
// import c from "config";


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

      }
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
          image:product.image,
          color: product.color.map((color) => {
            color.id = shortid.generate();
            return { ...product };
          }),

        });
      }
    }
  }


  addColorBox = (id) => {
  let { color } = this.state; // get all colors
    color.push({
      id: shortid.generate(),
      colorname: "",
      sizes: []
    })
    this.setState({color });
  }


  addSizeRow = (color_id) => {
    let { color } = this.state; // get all colors
    let color_obj = color.filter((color) => color.id == color_id); // get current color obj

    // get index of color i all colors object
    const index = color.findIndex(
      (color_obj) => color_obj.id == color_id
    );

    color_obj[0].sizes.push({
      id: shortid.generate(),
      size: "",
      price: "",
      qty: "",
    })

    color[index] = color_obj[0];

    this.setState({ color: color });


  }
  removeSizeRow = (color_id, size_id) => {
    let { color } = this.state;
    let color_obj = color.filter((color) => color.id == color_id); // get current color obj
    if (size_id != '') {
      let { sizes } = color_obj[0];
      const sizeIndex = sizes.findIndex(
        (size) => size.id == size_id
      );
      sizes.splice(sizeIndex, 1)

      this.setState({
        ...sizes
      })
    }
  }
  removeColorBox = (color_id) => {
    let { color } = this.state;
    color= color.filter((color) => color.id !== color_id); // get current color obj
    this.setState({ color });
  }
  getColors = () => {
    let { color } = this.state;
    return color.map((color) => (
      <div className="row color-row" key={color.id || color._id}>
       <div className="left" style={{ 'width': '95%', 'paddingLeft': '25px','paddingRight':'10px' }}>
          <div className="form-group">
            <input
              type="text"
              className="form-control mm-input "
              placeholder="Color"
              value={color.colorname}
              name="colorname"
              onChange={(e) => this.handleChange(e, color.id)} />
              </div>

</div>             
 <div className="right text-center" style={{'paddingRight': '0px' }}>

          <button
              type="button"
              onClick={() => this.removeColorBox(color.id)}
              className="btn btn-raised btn-sm btn-icon btn-danger mt-1">
              <i className="fa fa-minus"></i>
            </button>
          </div>
        <div className="col-md-12">
          {this.getSizeboxes(color.id)}
        </div>
        <div className="row">
          <div className="col-md-12 btn-cont">
            <div className="form-group mb-0">

              <button
                type="button"
                onClick={() => this.addSizeRow(color.id)}
                className="btn "><i className="fa fa-plus"></i> Add another
              Size</button>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  getSizeboxes = (color_id) => {
    let { color } = this.state; // get all colors
    let color_obj = color.filter((color) => color.id == color_id); // get current color obj

    return color_obj[0].sizes.map((size) => (
      <div className="sizes_box" key={size.id || size._id}>
        <div className="row">

          <div className="left" style={{ 'width': '95%', 'paddingLeft': '40px','paddingRight':'10px' }}>
            <input
              type="text"
              name="size"
              className="form-control mm-input s-input"
              placeholder="Size"
              onChange={(e) => this.handleChange(e, color_id, size.id)}
            //  value={color.sizes.size}
            />
            <input
              type="text"
              name="qty"
              className="form-control mm-input s-input"
              placeholder="Quantity"
              onChange={(e) => this.handleChange(e, color_id, size.id)}
            //  value={color.sizes.qty}

            />
            <input
              type="text"
              name="price"
              className="form-control mm-input s-input"
              placeholder="Price"
              onChange={(e) => this.handleChange(e, color_id, size.id)}
            // value={color.sizes.price}

            />
          </div>
          <div className="right">

            <button
              type="button"
              onClick={() => this.removeSizeRow(color_id, size.id)}
              className="btn btn-raised btn-sm btn-icon btn-danger mt-1">
              <i className="fa fa-minus"></i>
            </button>
          </div>

        </div>
      </div>
    ))

  }

  _onChange = (e, id = "") => {
    this.setState({ [e.target.name]: e.target.files[0] });
  }

  handleChange = (e, color_id = "", size_id = "") => {
    let name = e.target.name;
    let value = e.target.value;

    // get all colors
    let { color } = this.state;


    // get current color obj
    let color_obj = color.filter((color) => color.id == color_id)[0]; // get current color obj

    // get index of color obj in all colors
    const colorIndex = color.findIndex(
      (color) => color.id == color_id
    );

    if (size_id != '') {
      // get all sizes
      let { sizes } = color_obj;

      // find current size obj in current color obj
      let size_obj = color_obj.sizes.filter((size) => size.id == size_id)[0];

      // get index of size obj in all sizes 
      const sizeIndex = sizes.findIndex(
        (size) => size.id == size_id
      );

      // update value inside size object
      size_obj[name] = value;

      // update sizes arr
      sizes[sizeIndex] = size_obj;

      // update curernt color obj
      color[colorIndex].sizes = sizes;
    } else {
      color[colorIndex][name] = value;
    }


    // update state
    this.setState({ color });
  };


  handleChangeName = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ saving: true });
    const state = { ...this.state };
    const formData = new FormData();
    formData.append('name', state.name)
    formData.append('image', state.image)
    formData.append('color', JSON.stringify(state.color))

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
    console.log(this.state)


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
                              onChange={(e) => this.handleChangeName(e)} />

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

                          <div className="row">
                            <div className="col-md-12 btn-cont">
                              <div className="form-group mb-0">
                                <button
                                  type="button"
                                  onClick={() => this.addColorBox(this.state.id)}
                                  className="btn"><i className="fa fa-plus"></i> Add another
              Color</button>
                              </div>
                            </div>
                          </div>
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