import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { getAllProducts ,deleteProduct,getProduct} from "../../../actions/product";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import { Result } from "express-validator";


class ViewProduct extends Component {

  state = {
    filter: ""
  };

  async componentDidMount() {
    await this.props.getAllProducts();
   
  };

  handleChange = (e, id = "") => {
    this.setState({ [e.target.name]: e.target.value });
};

 getTAble = () => {
    const { products } = this.props;


    let tbl_sno=1;
    if (products) {
      if (products.length === 0) {
        return (
          <tr>
            <td colSpan={6} className="text-center">
              No product Found
            </td>
          </tr>
        );
      }
      return products.map((product,i) => (
        <tr key={i}>
          
           <td className="text-center text-muted">{tbl_sno++}</td>
           <td className="text-center">{""}</td>
           <td className="text-center">
            <img className="media-object round-media" src={`${product.image}`} alt="Generic placeholder image" height={75} />
            </td>

          <td className="text-center">{product.name}</td>
          <td className="text-center">{product.color}</td>
          <td className="text-center">{product.size}</td>
          <td className="text-center">{product.fabric}</td>
          <td className="text-center">
            {product.availableQuantity > 0 ? (
              <span className="">Available</span>
            ):
            <span className="">Not Available</span>
          }
          </td> 
              <td className="text-center">{product.availableQuantity}</td> 
           <td className="text-center">{product.rentedQuantity}</td>
          <td className="text-center">
            <Link 
           to={{ pathname: `/product/viewproduct/${product._id}` }}
              className="info p-0">
              <i className="ft-user font-medium-3 mr-2"></i>
            </Link>
            <Link
              to={{ pathname: `/product/editproduct/${product._id}` }}
              className="success p-0">
              <i className="ft-edit-2 font-medium-3 mr-2"></i>
            </Link>
            <Link to="/product/viewproduct"
              onClick={() => this.onDelete(product._id)}
              className="danger p-0">
              <i className="ft-x font-medium-3 mr-2"></i>
            </Link>
          </td>

        </tr>
      ));
    }
  };


  onDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this record?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.deleteProduct(id);
          },
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  };

    render() {
        const { auth } = this.props;
        if (!auth.loading && !auth.isAuthenticated) {
          return <Redirect to="/" />;
        }
        const { products } = this.props;
        const { filter} = this.state;
        if(products){
          var filteredProduct = products.filter(function (product,k) {
            return product.name.toLocaleLowerCase() == filter.toLocaleLowerCase();
          });
      }
       
        return (
            <React.Fragment>
                <div className="wrapper menu-collapsed">
                    <Sidebar location={this.props.location} />
                    <Header />
                    <div className="main-panel">

                    <div className="main-content">
                          <div className="content-wrapper">
                            <section id="extended">
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="card">
                                <div className="card-header">
                                  <h4 className="card-title">View Product</h4>
                                  <form role="search" className="navbar-form navbar-right mt-1">
                                      <div className="position-relative has-icon-right">
                                        <input 
                                        type="text"
                                        placeholder="Search"
                                          className="form-control round"
                                          value={filter}
                                          name="filter"
                                          onChange={(e) => this.handleChange(e)}
                                          />
                                        <div className="form-control-position"><i className="ft-search"></i></div>
                                      </div>
                                    </form>
                                </div>
                                <div className="card-content">
                                  <div className="card-body table-responsive">
                                  <Alert />

                                    <table className="table text-center">
                                      <thead>
                                        <tr>
                                          <th>#</th>
                                          <th></th>
                                          <th>Image</th>

                                          <th>Name</th>
                                          <th>Color</th>
                                          <th>Size</th>
                                          <th>Fabric</th>
                                          <th>In-Stock</th>
                                          <th>Available Quantity</th>
                                          <th>Rented Quantity</th>
                                          <th>Actions</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                  {this.getTAble()}  
                                  
                                      </tbody>
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
                            <p className="clearfix text-muted text-sm-center px-2"><span>Powered by &nbsp;{" "}
                                <a href="https://www.alphinex.com" id="pixinventLink" target="_blank" className="text-bold-800 primary darken-2">Alphinex Solutions </a>, All rights reserved. </span></p>
                        </footer>


                </div>

            </React.Fragment>

      );
    }
}


ViewProduct.propTypes = {
   auth: PropTypes.object,
getAllProducts: PropTypes.func.isRequired,
getProduct: PropTypes.func.isRequired,
deleteProduct: PropTypes.func.isRequired,
   products: PropTypes.array,
};

const mapStateToProps = (state) => ({
    products: state.product.products,
    auth: state.auth,


});
export default connect(mapStateToProps, {
  getAllProducts,deleteProduct,getProduct
})(ViewProduct);

