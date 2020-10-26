import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import shortid from "shortid";
import Loader from "../layout/Loader";
import { getCustomer } from "../../actions/customer";

class Checkout extends Component {
  state = {
    barcode: [],
    customer_id: "",
  };

  async componentDidMount() {
    const { data } = this.props.location;

    if (data) {
      this.setState({
        // id: id,
        customer_id: data.customer.id,
      });
    }
    await this.props.getCustomer(this.state.customer_id);
  }

  addBarcodeRow = () => {
    let { barcode } = this.state; // get all barcode
    barcode.push({
      id: shortid.generate(),
      barcode: "",
    });
    this.setState({ barcode });
  };

  onScanBarcode = (e) => {
    
      e.preventDefault();
      const bc = e.target[0].value;
      e.target[0].value = '';
      const { barcode } = this.state;
      barcode.push({
        id: shortid.generate(),
        barcode: bc.trim(),
      });
      this.setState({ barcode });
  }

  removeBarcodeRow = (id) => {
    let { barcode } = this.state;
    barcode = barcode.filter((barcode) => barcode.id !== id); // get current barode
    this.setState({ barcode });
  };

  handleChange = (e, barcode_id = "") => {
    let name = e.target.name;
    let value = e.target.value;
    let { barcode } = this.state;

    let barcode_obj = barcode.filter((barcode) => barcode.id == barcode_id)[0];
    const barcodeIndex = barcode.findIndex(
      (barcode) => barcode.id == barcode_id
    );
    barcode_obj[name] = value;
    barcode[barcodeIndex] = barcode_obj;

    this.setState({ barcode });
  };

  getBarcodeRow = () => {
    let { barcode } = this.state; // get all barcode
    if(barcode){
    return barcode.map((barcode) => (
      <div id="sizes_box" key={barcode.id || barcode._id}>
        <div className="row">
          <div className="left">
            <input
              type="text"
              className="form-control mm-input s-input"
              placeholder="Barcode"
              name="barcode"
              id="widthBr"
              style={{ width: "-webkit-fill-available" }}
              onChange={(e) => this.handleChange(e, barcode.id)}
              value={barcode.barcode}
            />
          </div>
          <div className="right">
            <button
              type="button"
              onClick={() => this.removeBarcodeRow(barcode.id)}
              className="btn btn-raised btn-sm btn-icon btn-danger mt-1"
            >
              <i className="fa fa-minus"></i>
            </button>
          </div>
          <div className="right">
            <button
              type="button"
              className="btn btn-raised btn-sm btn-success mt-1"
            >
              <i className="=ft ft-edit"></i>
            </button>
          </div>
        </div>
      </div>
    ));
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (this.props.saved) {
      return <Redirect to="/orders" />;
    }
    const { customer } = this.props;
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
                        <h4 className="card-title">Rent a Product</h4>
                      </div>
                      <div className="card-content">
                        <div className="card-body table-responsive">
                          <form className="" action="index.html" method="post">
                            <div id="colors_box">
                              <div className="row color-row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <h2>Scan Barcode To Add Items</h2>
                                  </div>
                                </div>

                                <div className="col-md-12">
                                  <div className="form-group">
                                    <h3>
                                      {customer && customer[0].name}{" "}
                                      {`${"#"}${
                                        customer && customer[0].contactnumber
                                      }`}
                                    </h3>
                                  </div>
                                </div>
                                
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <form onSubmit={e => this.onScanBarcode(e)}>
                                            <input className="form-control mm-input col-md-12" type="text" />
                                        </form>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                  {this.getBarcodeRow()}

                                  <div className="row">
                                    <div className="col-md-12 btn-cont">
                                      <div className="form-group mb-0">
                                        <button
                                          type="button"
                                          onClick={() => this.addBarcodeRow()}
                                          className="btn"
                                        >
                                          <i className="fa fa-plus"></i> Add
                                          Barcode
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row text-center ">
                                    <div className="col-md-12 btn-cont">
                                      <div className="form-group">
                                        <Link
                                          to={{
                                            pathname: "/rentorder",
                                            data: {
                                              customer_id: (customer) && customer[0]._id,
                                              barcode: this.state.barcode,
                                            },
                                          }}
                                          type="button"
                                          className="btn btn-raised btn-primary round btn-min-width mr-1 mb-1"
                                          id="btnSize2"
                                        >
                                          <i className="ft-check"></i> Checkout
                                        </Link>
                                      </div>
                                    </div>
                                  </div>

                                  {/* <div className="form-actions top">
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
                          </div> */}
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <footer className="footer footer-static footer-light">
                            <p className="clearfix text-muted text-sm-center px-2"><span>Quyền sở hữu của &nbsp;{" "}
                                <a href="https://www.sutygon.com" id="pixinventLink" target="_blank" className="text-bold-800 primary darken-2">SUTYGON-BOT </a>, All rights reserved. </span></p>
                        </footer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  saved: PropTypes.bool,
  auth: PropTypes.object,
  customer: PropTypes.array,
};

const mapStateToProps = (state) => ({
  saved: state.rentproduct.saved,
  auth: state.auth,
  customer: state.customer.customer,
});
export default connect(mapStateToProps, {
  getCustomer,
})(Checkout);
