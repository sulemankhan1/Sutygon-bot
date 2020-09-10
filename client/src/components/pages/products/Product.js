import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { getProduct} from "../../../actions/product";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";


class Product extends Component {

  async componentDidMount() {
    if (this.props.match.params.id) {
      const id = this.props.match.params.id;
      let res = await this.props.getProduct(id);

  }   
  };

  handleChange = (e, id = "") => {
    this.setState({ [e.target.name]: e.target.value });
};




    render() {
        const { auth } = this.props;

        if (!auth.loading && !auth.isAuthenticated) {
          return <Redirect to="/" />;
        }
        const { products } = this.props;
       console.log(products)
        return (
            <React.Fragment>
                <div className="wrapper menu-collapsed">
                    <Sidebar location={this.props.location} >
                    </Sidebar>
                    <Header>
                    </Header>
                    <div className="main-panel">

                    <div className="main-content">
  {/* <div className="content-wrapper">
    <section id="extended">
  <div className="row">
    <div className="col-sm-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">View Product</h4>
          <div className="row">
                  <div className="form-group col-12 mb-2">
                    <label>Select Image</label>
                    <input type="file"
                     className="form-control-file"
                      id="projectinput8"/>
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
        </div>
        <div className="card-content">
          <div className="card-body table-responsive">
          <Alert />

            
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div> */}
</div>
</div>
                   
                        <footer className="footer footer-static footer-light">
                            <p className="clearfix text-muted text-sm-center px-2"><span>Powered by &nbsp;{" "}
                                <a href="https://www.alphinex.com" id="pixinventLink" target="_blank" className="text-bold-800 primary darken-2">Alphinex Solutions </a>, All rights reserved. </span></p>
                        </footer>


                </div>

            </React.Fragment>

      );
    }
}


Product.propTypes = {
   auth: PropTypes.object,

getProduct: PropTypes.func.isRequired,
   products: PropTypes.array,
};

const mapStateToProps = (state) => ({
    products: state.product.products,
    auth: state.auth,


});
export default connect(mapStateToProps, {
getProduct
})(Product);

