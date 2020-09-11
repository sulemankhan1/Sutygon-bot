import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { addNewProduct,getProduct,updateProduct } from "../../../actions/product";

import { Link } from "react-router-dom";
import Alert from "../../layout/Alert";

import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AddProduct extends Component {
    state = {
        id: "",
        name: "",
        fabric: "",
        color: "",
        size: "",
        availableQuantity:"",
        rentedQuantity: "",
        inStock:"",
        image: "default",
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
            username: product.username,
            fabric: product.fabric,
            color: product.color,
            size:product.size,
            availableQuantity:product.availableQuantity,
            rentedQuantity:product.rentedQuantity,
  

          });
        }
      }
    }
    _onChange = (e, id = "") => {
      this.setState({ [e.target.name]: e.target.files[0] });
  }


    handleChange = (e, id = "") => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ saving: true });

        const state = { ...this.state };
        const formData = new FormData();
        formData.append('name',state.name)
        formData.append('image',state.image)
        formData.append('fabric',state.fabric)
        formData.append('size',state.size)
        formData.append('color',state.color)
        formData.append('availableQuantity',state.availableQuantity)
        formData.append('rentedQuantity',state.rentedQuantity)
        formData.append('inStock',state.inStock)

        
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
            return <Redirect to="/dashboard" />;
          }

        return (
            <React.Fragment>
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
                <h4 className="form-section"><i className="icon-social-dropbox"></i> 
                    {this.state.id === ""
                          ? "Add New Product"
                          : "Update Product"}</h4>
            </div>
            <Alert />

            <div className="card-body">

            <form 
                            encType="multipart/form-data"
                            action="/upload"
                            method="POST"
                            onSubmit={(e) => this.onSubmit(e)}>

              <div className="row">
                  <div className="form-group col-12 mb-2">
                    <label>Select Image</label>
                    <input 
                    name="image"
                    type="file"
                    className="form-control-file"
                    id="projectinput8"
                    accept='image/*,.pdf,.jpg'

                    // accept='file_extension|image/*|media_type'
                    // value={this.state.avatar}
                    onChange={(e) => this._onChange(e)} />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6 mb-2">
                    <label htmlFor="projectinput1">Name</label>
                    <input type="text"
                     id="projectinput1"
                      className="form-control" 
                      
                      placeholder="Name"
                      value={this.state.name}
                      name="name"              
                      onChange={(e) => this.handleChange(e)}
/>
                </div>
                  <div className="form-group col-md-6 mb-2">
                    <label htmlFor="projectinput2">Color</label>
                    <input type="text"
                     id="projectinput2" 
                     className="form-control"
                      placeholder="Color"
                      value={this.state.color}
                      name="color"
onChange={(e) => this.handleChange(e)}
/>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6 mb-2">
                    <label htmlFor="projectinput3">Fabric</label>
                    <input type="text" 
                    id="projectinput3"
                     className="form-control"
                      placeholder="Fabric"
                      value={this.state.fabric}
                       name="fabric"
                      onChange={(e) => this.handleChange(e)}
/>
                  </div>
                  <div className="form-group col-md-6 mb-2">
                    <label htmlFor="projectinput4">Size</label>
                    <input type="number"
                     id="projectinput4"
                      className="form-control" 
                      placeholder="Size" 
                      name="size"
                      value={this.state.size}
                      onChange={(e) => this.handleChange(e)}

                     />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6 mb-2">
                    <label htmlFor="projectinput4">Available Quantity</label>
                    <input type="number"
                     id="projectinput4" 
                     className="form-control" 
                     placeholder="Available Quantity"
                      name="availableQuantity"
                      value={this.state.availableQuantity}
                      onChange={(e) => this.handleChange(e)}
                      />
                  </div>
                  <div className="form-group col-md-6 mb-2">
                    <label htmlFor="projectinput4">Rented Quantity</label>
                    <input type="number"
                     id="projectinput4"
                      className="form-control"
                       placeholder="Rented Quantity" 
                       name="rentedQuantity"
                       value={this.state.rentedQuantity}

                       onChange={(e) => this.handleChange(e)}
                       />
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
   addNewProduct,getProduct,updateProduct
})(AddProduct);

