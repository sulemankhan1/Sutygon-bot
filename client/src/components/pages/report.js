import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProduct, addNewRentProduct } from "../../actions/rentproduct";
import { getAllUsers } from "../../actions/user";
import { getAllCustomers } from "../../actions/customer";
import moment from "moment"
import { setAlert } from "../../actions/alert";
import Alert from "../layout/Alert";

class Report extends Component {
    state = {
        id: "",
        customer: "",
        employee: "",
        startDate: new Date().toString(),
        endDate: new Date().toString(),
        type: "",
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
            employee: state.employee,
            customer: state.customer,
            start: state.start,
            end: state.end,
            };
        await this.props.getReport(report);
        this.setState({ saving: false });
    };


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
        console.log(this.state)
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
                                                <h4 className="form-section"><i className="icon-basket-loaded"></i> Rent a Product</h4>
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
                                                                name="deliveryDate"
                                                                data-toggle="tooltip"
                                                                data-trigger="hover"
                                                                data-placement="top"
                                                                data-title="Date Opened"
                                                                onChange={(e) => this.handleChange(e)}
                                                                value={moment(this.state.deliveryDate).format("YYYY-MM-DD")}
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
                                                                name="returnDate"
                                                                data-toggle="tooltip"
                                                                data-trigger="hover"
                                                                data-placement="top"
                                                                data-title="Date Opened"
                                                                onChange={(e) => this.handleChange(e)}
                                                                value={moment(this.state.returnDate).format("YYYY-MM-DD")}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="form-group col-md-6 mb-2">
                                                            <label
                                                                htmlFor="issueinput3"
                                                            >
                                                                Report Type
                      </label>                    <br></br>
                                                            <input type="radio" name="optradio" />
                                                            <label class="radio-inline"> Order </label>
                                                            <br></br>
                                                            <input type="radio" name="optradio" />
                                                            <label class="radio-inline"> Appointment </label>

                                                        </div>
                                                    </div>
                                                    <div className="form-actions top">
                                                        {this.state.saving ? (
                                                            <button
                                                                type="button"
                                                                className="mb-2 mr-2 btn btn-raised btn-primary"
                                                            >
                                                                <div
                                                                    className="spinner-grow spinner-grow-sm "
                                                                    role="status"
                                                                ></div>
                                &nbsp; Generating
                                                            </button>
                                                        ) : (
                                                                <button
                                                                    type="submit"
                                                                    className="mb-2 mr-2 btn btn-raised btn-primary"
                                                                >
                                                                    <i className="ft-check" /> Generate Report
                                                                </button>
                                                            )}



                                                    </div>
                                                </form>
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
    users: PropTypes.object,
    customers: PropTypes.object,

};

const mapStateToProps = (state) => ({
    saved: state.rentproduct.saved,
    auth: state.auth,
    users: state.user.users,
    customers: state.customer
});
export default connect(mapStateToProps, {
    getAllCustomers,
    getAllUsers,
    //   addNewRentProduct,

})(Report);

