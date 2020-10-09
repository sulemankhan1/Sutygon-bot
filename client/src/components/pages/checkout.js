import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Alert from "../layout/Alert";
import shortid from "shortid";
import { OCAlertsProvider } from "@opuscapita/react-alerts";
import { OCAlert } from "@opuscapita/react-alerts";

import Loader from "../layout/Loader";
import { barcodeUpdateProduct } from "../../actions/product";

class Checkout extends Component {
  state = {
    id: "",
    barcodes: [],
    saving: false,
  };

  componentDidMount() {}

  addBarcodeRow = (bc = "") => {
    let { barcodes } = this.state; // get all barcode
    barcodes.push({
      id: shortid.generate(),
      barcode: bc,
    });
    this.setState({ barcodes });
  };

  removeBarcodeRow = (id) => {
    let { barcodes } = this.state;
    barcodes = barcodes.filter((barcode) => barcode.id !== id); // get current barode
    this.setState({ barcodes });
  };

  // handleChange = (e, id = "") => {
  //     this.setState({ [e.target.name]: e.target.value });
  //   };

  onSubmit = (e) => {
    e.preventDefault();
    // get barcode input value
    let barcode = e.target[0].value;
    // empty barcode input
    e.target[0].value = "";
    // added barcodes in state
    const { barcodes } = this.state;

    // if barcode is  empty
    if (!barcode) {
      OCAlert.alertError("Cannot Add Empty Barcode");
      return;
    }

    // check if provided barcode already exists
    const barcodeIndex = barcodes.findIndex((bc) => bc.barcode == barcode);

    // if barcode already exists
    if (barcodeIndex >= 0) {
      OCAlert.alertError("This Barcode is Already Scanned");
      return;
    }

    this.addBarcodeRow(barcode);
  };

  handleChange = (e, barcode_id = "") => {
    let name = e.target.name;
    let value = e.target.value;
    let { barcodes } = this.state;

    let barcode_obj = barcodes.filter((barcode) => barcode.id == barcode_id)[0];
    const barcodeIndex = barcodes.findIndex(
      (barcode) => barcode.id == barcode_id
    );
    barcode_obj[name] = value;
    barcodes[barcodeIndex] = barcode_obj;

    this.setState({ barcodes });
  };

  getBarcodeRow = () => {
    let { barcodes } = this.state; // get all barcode
    return barcodes.map((barcode) => (
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
  };

  render() {
    const { auth } = this.props;
    const { data } = this.props.location;

    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (this.props.saved) {
      return <Redirect to="/orders" />;
    }

    if (!data) {
      //   return <Redirect to="/rentproduct" />;
    }

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
                                      {data && data.name}{" "}
                                      {`${"#"}${data && data.contactnumber}`}
                                    </h3>
                                  </div>
                                </div>

                                <div className="col-md-12">
                                  <form onSubmit={(e) => this.onSubmit(e)}>
                                    <div className="row">
                                      <input
                                        type="text"
                                        className="form-control mm-input s-input"
                                        placeholder="Scan Barcodes here"
                                        name="barcode"
                                        id="widthBr"
                                        style={{
                                          width: "-webkit-fill-available",
                                        }}
                                      />
                                    </div>
                                  </form>
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
                                              customer: this.props.location
                                                .data,
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
        </div>
        {/* Alerts */}
        <OCAlertsProvider />
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  saved: PropTypes.bool,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  saved: state.rentproduct.saved,
  auth: state.auth,
});
export default connect(mapStateToProps, {})(Checkout);
