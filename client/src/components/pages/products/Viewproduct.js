import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { getAllProducts ,deleteProduct} from "../../../actions/product";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";

class ViewProduct extends Component {
  async componentDidMount() {
    await this.props.getAllProducts();
  }
   
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
      return products.map((product) => (
        <tr>
          
           <td className="text-center text-muted">{tbl_sno++}</td>
           <td className="text-center">{""}</td>

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
          <td className="text-center"><img class="media-object round-media" src={product.image} alt="Generic placeholder image" height={75} /></td>
          <td className="text-center">
            <Link to="/viewproduct/view"
              className="info p-0">
              <i className="ft-user font-medium-3 mr-2"></i>
            </Link>
            <Link
              to={{ pathname: `/editproduct/${product._id}` }}
              className="success p-0">
              <i className="ft-edit-2 font-medium-3 mr-2"></i>
            </Link>
            <Link to="/viewproduct"
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

      
        return (
            <React.Fragment>
                <div className="wrapper nav-collapsed menu-collapsed">
                    <Sidebar location={this.props.location} >
                    </Sidebar>
                    <Header>
                    </Header>
                    <div class="main-panel">

                    <div class="main-content">
  <div class="content-wrapper">
    <section id="extended">
  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">View Product</h4>
        </div>
        <div class="card-content">
          <div class="card-body table-responsive">
          <Alert />

            <table class="table text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th></th>
                  <th>Name</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Fabric</th>
                  <th>In-Stock</th>
                  <th>Available Quantity</th>
                  <th>Rented Quantity</th>
                  <th>Image</th>
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
   deleteProduct: PropTypes.func.isRequired,
   products: PropTypes.object,
};

const mapStateToProps = (state) => ({
    products: state.product.products,
    auth: state.auth,


});
export default connect(mapStateToProps, {
  getAllProducts,deleteProduct
})(ViewProduct);

