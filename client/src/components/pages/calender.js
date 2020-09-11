import { Calendar, momentLocalizer } from 'react-big-calendar'
import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Alert from "../layout/Alert";
import moment from "moment"
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAllAppointmens } from "../../actions/appointment";


const localizer = momentLocalizer(moment)

class Calender extends Component {
    async componentDidMount() {
           this.props.getAllAppointmens();
           console.log(this.props,"props")

    }

    render() {
        const dummyEvents = [
            {
              allDay: false,
              endDate: new Date('December 10, 2017 11:13:00'),
              startDate: new Date('December 09, 2017 11:13:00'),
              title: 'hi',
            },
            {
              allDay: true,
              endDate: new Date('December 09, 2017 11:13:00'),
              startDate: new Date('December 09, 2017 11:13:00'),
              title: 'All Day Event',
            },
            ];
        const { auth } = this.props;
        if (!auth.loading && !auth.isAuthenticated) {
            return <Redirect to="/" />;
        }

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
                                                <h4 className="form-section"><i className="icon-social-dropbox"></i>
                         Calendar</h4>
                                            </div>
                                            <Alert />

                                            <div className="card-body">
                                            <div>
    <Calendar
    localizer={localizer}
      events={dummyEvents}
      startAccessor="startDate"
      endAccessor="endDate"
    //   style={{ height: 500 }}
    />
  </div>
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

Calender.propTypes = {
    saved: PropTypes.bool,
    auth: PropTypes.object,
    getAllAppointmens:PropTypes.func.isRequired
    // getAllCustomers: PropTypes.func.isRequired,
    // getAllProducts: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
    saved: state.appointment.saved,
    auth: state.auth,
   calendar:state.appointment

});
export default connect(mapStateToProps, {
getAllAppointmens
})(Calender);

