import { Calendar, momentLocalizer } from 'react-big-calendar'
import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Alert from "../layout/Alert";
import Loader from "../layout/Loader";
import moment from "moment"
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAllAppointments } from "../../actions/appointment";


const localizer = momentLocalizer(moment)



class AppointmentCalendar extends Component {
    async componentDidMount() {
        await this.props.getAllAppointments();
    }

    render() {
        const { calendar } = this.props;

        const mapToRBCFormat = e => Object.assign({}, e, {
            start: new Date(e.startDate),
            end: new Date(e.endDate)

        })
        // const events = [
        //   {
        //     id: 0,
        //     title: 'Meeting',
        //     start: moment({ hours: 8 }).toDate(),
        //     end: moment({ hours: 10 }).toDate(),
        //   },
        //   {
        //     id: 1,
        //     title: 'Lunch',
        //     start: moment({ hours: 12 }).toDate(),
        //     end: moment({ hours: 13 }).toDate()
        //   },
        //   {
        //     id: 2,
        //     title: 'Coding',
        //     start: moment({ hours: 14 }).toDate(),
        //     end: moment({ hours: 17 }).toDate(),
        //   },
        // ];
        const { auth } = this.props;
        if (!auth.loading && !auth.isAuthenticated) {
            return <Redirect to="/" />;
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
                                                <h4 className="form-section"><i className="icon-social-dropbox"></i>
                         Calendar</h4>
                                            </div>
                                            <Alert />

                                            <div className="card-body">
                                                {this.props.calendar ?

                                                    <Calendar
                                                        events={calendar}
                                                        localizer={localizer}
                                                        defaultDate={new Date()}
                                                        components={
                                                            {
                                                                eventWrapper: ({ event, children }) => (
                                                                    <div
                                                                        onContextMenu={
                                                                            e => {
                                                                                alert(`${event.title} is clicked.`);
                                                                                e.preventDefault();
                                                                            }
                                                                        }
                                                                    >
                                                                        {children}
                                                                    </div>
                                                                )

                                                            }
                                                        }
                                                    />
                                                    : ""}
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

AppointmentCalendar.propTypes = {
    saved: PropTypes.bool,
    auth: PropTypes.object,
    getAllAppointments: PropTypes.func.isRequired,
    calendar: PropTypes.array,
    // getAllCustomers: PropTypes.func.isRequired,
    // getAllProducts: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
    auth: state.auth,
    calendar: state.appointment.appointments

});
export default connect(mapStateToProps, {
    getAllAppointments
})(AppointmentCalendar);

