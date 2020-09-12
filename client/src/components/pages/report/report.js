import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getReport } from "../../../actions/report";
import { getAllUsers } from "../../../actions/user";
import { getAllCustomers } from "../../../actions/customer";
import moment from "moment"
import Alert from "../../layout/Alert";
import Loader from "../../layout/Loader";
import report from "../../../reducers/report";
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";




class Report extends Component {
    state = {
        id: "",
        customer: "",
        employee: "",
        start: "",
        end: "",
        reportType: "",
        saving: false,

    };


    async componentDidMount() {
        this.props.getAllUsers();
        this.props.getAllCustomers();

    }
    handleChange = (e, id = "") => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ saving: true });

        const state = { ...this.state };
        const { user } = this.props.auth;

        const report = {
            employee: user._id,
            customer: state.customer,
            start: state.start,
            end: state.end,
            reportType: state.reportType
        };
        await this.props.getReport(report);
        this.setState({ saving: false });
    };



    // handlePdf = () => {
    //     const input = document.getElementById('page');

    //     html2canvas(input)
    //         .then((canvas) => {
    //             const imgData = canvas.toDataURL('image/png');
    //             const pdf = new jsPDF('p', 'px', 'a4');
    //             var width = pdf.internal.pageSize.getWidth();
    //             var height = pdf.internal.pageSize.getHeight();

    //             pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
    //             pdf.save("download.pdf");
    //         });
    // };

    // getTAble = () => {
    //     const { reports } = this.props.report;
    //     const { user } = this.props.auth;

    //     console.log("tableReport", reports)
    //     let tbl_sno = 1;
    //     if (reports) {
    //         if (reports.length === 0) {
    //             return (
    //                 <tr>
    //                     <td colSpan={6} className="text-center">
    //                         No Report Found
    //         </td>
    //                 </tr>
    //             );
    //         }
    //         return reports.map((record, i) => (
    //             <tr key={i}>

    //                 <td className="text-center text-muted">{tbl_sno++}</td>
    //                 <td className="text-center">{""}</td>
    //                 <td className="text-center">{record.orderNumber}</td>
    //                 {/* <td className="text-center">{record.status}</td> */}

    //                 <td className="text-center">{record.customer.name}</td>
    //                 <td className="text-center">{record.product.name}</td>
    //                 <td className="text-center">{user.username}</td>
    //                 {/* <td className="text-center">{new Date(record.deliveryDate).toLocaleDateString()}</td> */}
    //                 <td className="text-center">{record.deliveryDate}</td>

    //                 <td className="text-center">
    //                     <Link
    //                         to={{
    //                             pathname: "/report",
    //                             data: record // your data array of objects
    //                         }}
    //                         onClick={() => this.handlePdf()}
    //                         className="danger p-0">
    //                         <i className="icon-printer font-medium-3 mr-2"></i>
    //                     </Link>
    //                 </td>

    //             </tr>

    //         ));
    //     }
    // };

    render() {
        const { auth } = this.props;
        if (!auth.loading && !auth.isAuthenticated) {
            return <Redirect to="/" />;
        }

        if (this.props.saved) {
            return <Redirect to="/dashboard" />;
        }
        const { employee, customer } = this.state;
        const { customers } = this.props.customers;
        const { users } = this.props;
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
                                                <h4 className="form-section"><i className="icon-basket-loaded"></i> Report</h4>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={(e) => this.onSubmit(e)}>
                                                    <Alert />
                                                    <div className="row">
                                                        <div className="form-group col-6 mb-2">
                                                            <label htmlFor="issueinput5">Select Customer</label>
                                                            <select
                                                                name="customer"
                                                                className="form-control"
                                                                onChange={(e) => this.handleChange(e)}
                                                            >
                                                                <option value="DEFAULT"> -- select -- </option>
                                                                {customers &&
                                                                    customers.map((record) => (
                                                                        <option
                                                                            key={record._id}
                                                                            value={record._id}
                                                                            selected={record._id === customer}
                                                                        >
                                                                            {record.name +
                                                                                " - " +
                                                                                record.email}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-6 mb-2">
                                                            <label htmlFor="issueinput5">Select Employee</label>
                                                            <select
                                                                name="employee"
                                                                className="form-control"
                                                                onChange={(e) => this.handleChange(e)}

                                                            >
                                                                <option value="DEFAULT"> -- select -- </option>
                                                                {users &&
                                                                    users.map((record) => (
                                                                        <option
                                                                            key={record._id}
                                                                            value={record._id}
                                                                            selected={record._id === employee}
                                                                        >
                                                                            {record.username}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="form-group col-md-6 mb-2">
                                                            <label
                                                                htmlFor="issueinput3"
                                                            >Start Date
                                                      </label>
                                                            <input
                                                                type="date"
                                                                id="issueinput3"
                                                                className="form-control"
                                                                name="start"
                                                                data-toggle="tooltip"
                                                                data-trigger="hover"
                                                                data-placement="top"
                                                                data-title="Date Opened"
                                                                onChange={(e) => this.handleChange(e)}
                                                                value={this.state.start}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-6 mb-2">
                                                            <label
                                                                htmlFor="issueinput3"
                                                            >
                                                                End Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                id="issueinput3"
                                                                className="form-control"
                                                                name="end"
                                                                data-toggle="tooltip"
                                                                data-trigger="hover"
                                                                data-placement="top"
                                                                data-title="Date Opened"
                                                                onChange={(e) => this.handleChange(e)}
                                                                value={this.state.end}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="form-group col-md-6 mb-2">
                                                            <label
                                                                htmlFor="issueinput3"
                                                            >
                                                                Report Type
                      </label>                    <br></br>
                                                            <input
                                                                type="radio"
                                                                name="reportType"
                                                                value="order"
                                                                onChange={(e) => this.handleChange(e)}
                                                                checked={this.state.reportType === "order"} />
                                                            <label className="radio-inline">
                                                                Order
                                                             </label>
                                                            <br></br>
                                                            <input
                                                                type="radio"

                                                                name="reportType"
                                                                value="appointment"
                                                                onChange={(e) => this.handleChange(e)}
                                                                checked={this.state.reportType === "appointment"}
                                                            />
                                                            <label className="radio-inline">
                                                                Appointment
                                                            </label>

                                                        </div>
                                                    </div>
                                                    <div className="row">

                                                        <div className="form-columns col-md-6 mb-2">
                                                            {this.state.saving ? (
  <Link
                                                                     className="mb-2 mr-2 btn btn-raised btn-primary"
                                                                >
                                                                    <div
                                                                        className="spinner-grow spinner-grow-sm "
                                                                        role="status"
                                                                    ></div>
                                &nbsp; Generating
                                                                </Link>
                                                            ) : (
                                                                    <button
                                                                        to={{ pathname: `/report` }}
                                                                        type="submit"
                                                                        className="mb-2 mr-2 btn btn-raised btn-primary"
                                                                    >
                                                                        <i className="ft-check" /> Generate Report
                                                                    </button>
                                                                )}
                                                        </div>
                                                        <div className="form-columns col-md-6 mb-2">

                                                            <Link
                                                                to={{
                                                                    pathname: "/report",
                                                                    data: this.props.report.reports // your data array of objects
                                                                }}
                                                                className="mb-2 mr-2 btn btn-raised btn-primary"
                                                            >
                                                                &nbsp; Generate PDF
                                                            </Link>

                                                        </div>


                                                    </div>
                                                </form>
                                                {/* <div className="row" id="page">
                                                    <div className="col-sm-12">
                                                        <div className="card">
                                                            <div className="card-header">
                                                                <h4 className="card-title">Order Report</h4>
                                                            </div>
                                                            <div className="card-content">
                                                                <div className="card-body table-responsive">
                                                                    <table className="table text-center">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th></th>
                                                                                <th>Order Number</th>
                                                                                <th>Customer</th>
                                                                                <th>Product</th>
                                                                                <th>Employee</th>
                                                                                <th>Delivery Date</th>
                                                                                <th>Action</th>
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
                                                </div> */}
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

Report.propTypes = {
    saved: PropTypes.bool,
    //   addNewRentProduct: PropTypes.func.isRequired,
    getAllCustomers: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    auth: PropTypes.object,
    users: PropTypes.array,
    customers: PropTypes.object,
    getReport: PropTypes.func.isRequired,
    report: PropTypes.object

};

const mapStateToProps = (state) => ({
    saved: state.rentproduct.saved,
    auth: state.auth,
    users: state.user.users,
    customers: state.customer,
    report: state.report

});
export default connect(mapStateToProps, {
    getAllCustomers,
    getAllUsers,
    getReport,

})(Report);

