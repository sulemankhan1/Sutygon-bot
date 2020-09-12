import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const Loader = ({
  auth,
  userLoading,
  productLoading,
  customerLoading,
  rentproductLoading,
  orderLoading,
  appointmentLoading,
  reportLoading,
}) =>
  // if page is loading show loader
  (auth.loading ||
    userLoading ||
    productLoading ||
    customerLoading ||
    rentproductLoading ||
    orderLoading ||
    appointmentLoading ||
    reportLoading) && (
    <div className="loaderContainer">
      <div className="loader">
      <img src="/assets/logo-icon.gif" className="loader-img" width="100"/>
        <div className="ball-grid-pulse">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );

Loader.propTypes = {
  courseLoading: PropTypes.bool,
  authLoading: PropTypes.bool,
  batchLoading: PropTypes.bool,
  teachersLoading: PropTypes.bool,
  programLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  userLoading: state.user.loading,
  productLoading: state.product.loading,
  customerLoading: state.customer.loading,
  rentproductLoading: state.rentproduct.loading,
  orderLoading: state.order.loading,
  appointmentLoading: state.appointment.loading,
  reportLoading: state.report.loading,
  auth: state.auth,
});
export default connect(mapStateToProps)(Loader);
