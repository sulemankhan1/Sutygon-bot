import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { getAllProducts } from "../../actions/product";
import { getCustomer } from "../../actions/customer";

import * as moment from 'moment'

class RentInvoice extends Component {
    state = {
        id: "",
        orderNumber: "",
        barcode_Array: [],
        customer_id: "",
        product_Array: "",
        total_amt: "",
        taxper: "",
        tax: "",
        insAmt: "",
        rentDate: "",
        returnDate: "",
        total: "",
    };


    async componentDidMount() {
        await this.props.getAllProducts();

        const { data } = this.props.location;
        if (data) {
            this.setState({
                // id: id,
                customer_id: data.customer_id,
                barcode_Array: data.barcode_Array,
                product_Array: data.product_Array,
                rentDate: data.rentDate,
                returnDate: data.returnDate,
                tax: data.tax,
                taxper: data.taxper,
                total_amt: data.total_amt,
                total: data.total,
                insAmt: data.insAmt
            });
        }
        await this.props.getCustomer(this.state.customer_id);


    }

    // return sorted products for barcodes 
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
                            let price = size.price
                            let length;
                            // show sizes with barcode
                            if (size.barcodes) {
                                length = size.barcodes.length;
                            } else {
                                length = 0;
                            }

                            let i;
                            for (i = 0; i < length; i++) {
                                let row = {

                                    product_id: product_id,
                                    color_id: color_id,
                                    size_id: size_id,
                                    title: product_name + " | " + color_name + " | " + size_name,
                                    barcodes: (size.barcodes) ? size.barcodes : [],
                                    price: price
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

    getBarcodeRecord() {
       
        let { product_Array } = this.state;
        let { barcode_Array } = this.state;
        if (product_Array) {
            return product_Array.map((barcode, b_index) => (
                // <div id="sizes_box" key={barcode.id || barcode._id}>
                <div id="sizes_box" key={b_index}>
                    <div className="row">
                        <div className="left" >
                            <input
                                type="text"
                                className="form-control mm-input s-input text-center"
                                placeholder="Barcode"
                                name="barcode"
                                id="widthBr"
                                style={{ 'width': '60%' }}
                                value={(barcode && barcode[0].title && barcode_Array) && barcode[0].title + ' | ' + barcode_Array[b_index].barcode}
                            />
                            <div style={{ 'paddingLeft': '650px' }}>
                            <input
                                style={{ 'width': '90%' }}
                                type="text"
                                className="form-control mm-input s-input text-center"
                                placeholder="Ammount"
                                id="setSizeFloat"
                               value={`${"$"}${barcode && barcode[0].price}`}

                            />
                        </div>

                        </div>
                       
                    </div>


                </div>
            ))
        }
    }



    render() {
        const { auth } = this.props;
        if (!auth.loading && !auth.isAuthenticated) {
            return <Redirect to="/" />;
        }

        if (this.props.saved) {
            return <Redirect to="/RentInvoice" />;
        }
        const { customer } = this.props;
        const { total_amt, total, insAmt, taxper, tax } = this.state;
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
                                                <h4 className="card-title">Rent a Product</h4>
                                            </div>
                                            <div className="card-content">

                                                <div className="card-body table-responsive">
                                                    <div id="colors_box">
                                                        <div className="row color-row">
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <h3>{customer && customer.name} {`${"#"}${customer && customer.contactnumber}`}</h3>
                                                                </div>
                                                            </div>
                                                            <form onSubmit={(e) => this.onSubmit(e)}>

                                                                <div className="col-md-12">
                                                                    <div id="sizes_box">
                                                                        {this.getBarcodeRecord()}
                                                                        <br />

                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <div style={{ 'float': 'left' }}>

                                                                                        <h4 id="padLeft">Total Without Tax</h4>
                                                                                    </div>
                                                                                    <div style={{ 'paddingLeft': '650px' }}>
                                                                                        <input
                                                                                            style={{ 'width': '65%' }}
                                                                                            type="text"
                                                                                            className="form-control mm-input s-input text-center"
                                                                                            placeholder="Total"
                                                                                            name="total_amt"
                                                                                            id="setSizeFloat"
                                                                                            //   onChange={(e) => this.onHandleChange(e)}
                                                                                            value={`${"$"}${total_amt}`}


                                                                                        />
                                                                                    </div>
                                                                                    <br />
                                                                                </div> </div>
                                                                        </div>
                                                                        <br />

                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <div style={{ 'float': 'left' }}>
                                                                                        <h4 id="padLeft">Enter tax % <span className="text-muted">(enter 0 if no tax)</span></h4>
                                                                                    </div>
                                                                                    <div style={{ 'paddingLeft': '650px' }}>
                                                                                        <input
                                                                                            style={{ 'width': '65%' }}
                                                                                            name="taxper"
                                                                                            type="text"
                                                                                            className="form-control mm-input s-input text-center"
                                                                                            placeholder="Tax"
                                                                                            id="setSizeFloat"
                                                                                            value={`${"$"}${taxper}`}
                                                                                        //   onChange={(e) => this.onHandleChange(e)}

                                                                                        />
                                                                                    </div>  </div>
                                                                            </div>
                                                                        </div>
                                                                        <br />

                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">

                                                                                    <h4 id="arowDown"><i className="ft-arrow-down"></i></h4>
                                                                                    <div style={{ 'paddingLeft': '650px' }}>
                                                                                        <input
                                                                                            style={{ 'width': '65%' }}
                                                                                            type="text"
                                                                                            className="form-control mm-input s-input text-center"
                                                                                            placeholder=""
                                                                                            id="setSizeFloat"
                                                                                            value={`${"$"}${tax}`}
                                                                                        />
                                                                                    </div>                             </div>
                                                                            </div>
                                                                        </div>
                                                                        <br />

                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <div style={{ 'float': 'left' }}>

                                                                                        <h4 id="padLeft">Enter Insurance Amount</h4>
                                                                                    </div>
                                                                                    <div style={{ 'paddingLeft': '650px' }}>
                                                                                        <input
                                                                                            style={{ 'width': '65%' }}
                                                                                            type="text"
                                                                                            className="form-control mm-input s-input text-center"
                                                                                            placeholder="Total"
                                                                                            id="setSizeFloat"
                                                                                            value={`${"$"}${insAmt}`}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <br />


                                                                        <br />


                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <div style={{ 'float': 'left' }}>
                                                                                        <h4 id="padLeft">Total</h4>
                                                                                    </div>
                                                                                    <div style={{ 'paddingLeft': '650px' }}>
                                                                                        <input
                                                                                            style={{ 'width': '65%' }}
                                                                                            type="text"
                                                                                            className="form-control mm-input s-input text-center"
                                                                                            placeholder="Total"
                                                                                            id="setSizeFloat"
                                                                                            value={`${"$"}${total}`}

                                                                                        // value={`${"Total: $"}${this.state.tax ? (this.calculateTotal()) : ""}`} 
                                                                                        />


                                                                                    </div> </div>
                                                                            </div>
                                                                        </div>

                                                                        <br />

                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <div style={{ 'float': 'left' }}>
                                                                                        <h4 id="padLeft">Amount to be returned to the customer</h4>
                                                                                    </div>
                                                                                    <div style={{ 'paddingLeft': '650px' }}>
                                                                                        <input
                                                                                            style={{ 'width': '65%' }}
                                                                                            type="text"
                                                                                            className="form-control mm-input s-input text-center"
                                                                                            placeholder="Total"
                                                                                            id="setSizeFloat"
                                                                                            value={`${"$"}${insAmt}`}

                                                                                        // value={`${"Total: $"}${this.state.tax ? (this.calculateTotal()) : ""}`} 
                                                                                        />


                                                                                    </div> </div>
                                                                            </div>
                                                                        </div>
                                                                        <br />

                                                                        <div className="row justify-content-center">
                                                                                <div className="form-group">

                                                                                    <div className="text-center" style={{'width':'300%'}}>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control mm-input s-input text-center"
                                                                                            placeholder="Total"
                                                                                            id="setSizeFloat"
                                                                                            value={`${"PAID TOTAL: $"}${insAmt}`}

                                                                                        // value={`${"Total: $"}${this.state.tax ? (this.calculateTotal()) : ""}`} 
                                                                                        />


                                                                                  </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <div style={{ 'float': 'left' }}>
                                                                                        <h4 id="padLeft">Leave ID</h4>
                                                                                    </div>
                                                                                    <div style={{ 'paddingLeft': '650px' }}>
                                                                                        <input
                                                                                            style={{ 'width': '65%' }}
                                                                                            type="text"
                                                                                            className="form-control mm-input s-input text-center"
                                                                                            placeholder="Total"
                                                                                            id="setSizeFloat"
                                                                                            value={`${"$"}${total}`}

                                                                                        // value={`${"Total: $"}${this.state.tax ? (this.calculateTotal()) : ""}`} 
                                                                                        />


                                                                                    </div> </div>
                                                                            </div>
                                                                        </div>
                                                                        <br />

                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <div style={{ 'float': 'left' }}>
                                                                                        <h4 id="padLeft">Rent From</h4>
                                                                                    </div>
                                                                                    <div style={{ 'paddingLeft': '650px' }}>
                                                                                        <input
                                                                                            style={{ 'width': '65%' }}
                                                                                            type="text"
                                                                                            className="form-control mm-input s-input text-center"
                                                                                            placeholder="Total"
                                                                                            id="setSizeFloat"
                                                                                            value={moment(this.state.rentDate).format('DD/MMM/YYYY')}

                                                                                        // value={`${"Total: $"}${this.state.tax ? (this.calculateTotal()) : ""}`} 
                                                                                        />


                                                                                    </div> </div>
                                                                            </div>
                                                                        </div>
                                                                        <br />

                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <div style={{ 'float': 'left' }}>
                                                                                        <h4 id="padLeft">Due Date</h4>
                                                                                    </div>
                                                                                    <div style={{ 'paddingLeft': '650px' }}>
                                                                                        <input
                                                                                            style={{ 'width': '65%' }}
                                                                                            type="text"
                                                                                            className="form-control mm-input s-input text-center"
                                                                                            placeholder="Total"
                                                                                            id="setSizeFloat"
                                                                                            value={moment(this.state.returnDate).format('DD/MMM/YYYY')}

                                                                                        // value={`${"Total: $"}${this.state.tax ? (this.calculateTotal()) : ""}`} 
                                                                                        />


                                                                                    </div> </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <br />

                                                                </div>
                                                            </form>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div></div>

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

RentInvoice.propTypes = {
    saved: PropTypes.bool,
    getAllProducts: PropTypes.func.isRequired,
    getCustomer: PropTypes.func.isRequired,

    auth: PropTypes.object,
    products: PropTypes.array,
    customer: PropTypes.array,

};

const mapStateToProps = (state) => ({
    saved: state.rentproduct.saved,
    auth: state.auth,
    products: state.product.products,
    customer: state.customer.customer
});
export default connect(mapStateToProps, {
    getAllProducts, getCustomer
})(RentInvoice);