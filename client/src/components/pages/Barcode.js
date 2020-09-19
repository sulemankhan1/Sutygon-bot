import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { getAllProducts, updateProduct } from "../../actions/product";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../custom.css"
// import { color } from "html2canvas/dist/types/css/types/color";
// import c from "config";


class Barcode extends Component {
    state = {
        dataType: "",
        saving: false,
    };


    async componentDidMount() {
        await this.props.getAllProducts();

    };

    handleChange = (e, id = "") => {
        this.setState({ [e.target.name]: e.target.value });
    };
    getTAble = () => {
        const { products } = this.props;


        let tbl_sno = 1;
        if (products) {
            if (products.length === 0) {
                return (
                    <tr>
                        <td colSpan={10} className="text-center">
                            No product Found
            </td>
                    </tr>
                );
            }
            return products.map((product, i) => {
                return <tr key={i}>

                    {/* {product.color.map((color, j) => {
                      console.log(color)
                            // return `${product.name}${" | "}${color.colorname}${" | "}${color.sizes.size}`

                    })
                    } */}
                    {product.color.map((colors, j) => {
                        return `${colors.sizes.map((size, j) => {
                            {
                                for (var i = 0; i <= size.qty; i++) {

                                    for (var k = 0; k>= colors; k++) {
                                            console.log(size[colors])

                                    }
                                }
                            }
                        })}`
                    }
                    )}
                </tr>
            })


        };
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
                                                    Barcode
                          </h4>
                                            </div>

                                            <div className="card-body">
                                                <div className="custom-radio custom-control-inline ml-3">
                                                    <input
                                                        type="radio"
                                                        id="customRadioInline1"

                                                        name="dataType"
                                                        className="custom-control-input"
                                                        onChange={(e) => this.handleChange(e)}
                                                        checked={this.state.dataType === "withBarcode"} />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="customRadioInline1">Items Without Barcode</label>
                                                </div>
                                                <div className="custom-radio custom-control-inline ml-3">
                                                    <input
                                                        type="radio"
                                                        id="customRadioInline2"
                                                        name="dataType"
                                                        className="custom-control-input"
                                                        onChange={(e) => this.handleChange(e)}
                                                        checked={this.state.dataType === "withoutBarcode"}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="customRadioInline2">Items With Barcode</label>
                                                </div>

                                                <br />
                                                <table className="table text-center">
                                                    <thead>
                                                        <tr>
                                                            <th>Product</th>
                                                            <th></th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.getTAble()}

                                                    </tbody>
                                                </table>

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

Barcode.propTypes = {
    saved: PropTypes.bool,
    getAllProducts: PropTypes.func.isRequired,
    auth: PropTypes.object,
    updateProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    products: state.product.products,
    saved: state.product.saved,
    auth: state.auth,

});
export default connect(mapStateToProps, {
    getAllProducts, updateProduct
})(Barcode);