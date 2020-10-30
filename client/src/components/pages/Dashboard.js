import React, { Component } from 'react'
import Sidebar from '../layout/Sidebar'
import Header from '../layout/Header'
import Loader from '../layout/Loader'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllAppointments } from '../../actions/appointment'
import { getAllOrders } from '../../actions/order'
import { getAllRentedProducts } from '../../actions/rentproduct'
import { getAllProducts } from '../../actions/product'
import { changeShopStatus, getShop } from '../../actions/dashboard'
import * as moment from 'moment'
import '../../login.css'
import '../../dashbaord.css'

class Dashboard extends Component {
  async componentDidMount() {
    await this.props.getAllAppointments()
    await this.props.getAllRentedProducts()
    await this.props.getAllProducts()
    await this.props.getShop()
  }

  async changeShopStatus(status) {
    await this.props.changeShopStatus(status)
    await this.props.getShop()
  }
  getPendingOrder = () => {
<<<<<<< HEAD
    const { rentedproducts } = this.props;
    if (rentedproducts) {
      let events = rentedproducts.filter(a => (new Date(a.returnDate)) - (new Date()) > 0);
      return events.length;
    }
  }
  getOverDueOrder = () => {
    const { rentedproducts } = this.props;
    if (rentedproducts) {
      var currentdate = moment(new Date).format('MM/DD/YYYY');
      let events = rentedproducts.filter(a => (moment(moment(a.returnDate).format('MM/DD/YYYY')).isBefore(currentdate)));
      if (events.length > 0) {
        let returningOrders = events.filter((f => f.status !== "Completed"))
        return returningOrders.length;

=======
    // e.preventDefault()
    const { rentedproducts } = this.props
    if (rentedproducts) {
      let events = rentedproducts.filter(
        (a) => new Date(a.returnDate) - new Date() > 0
      )

      return events.length
    }
  }
  getOverDueOrder = () => {
    // e.preventDefault()
    const { rentedproducts } = this.props
    if (rentedproducts) {
      var currentdate = moment(new Date()).format('MM/DD/YYYY')
      let events = rentedproducts.filter((a) =>
        moment(moment(a.returnDate).format('MM/DD/YYYY')).isBefore(currentdate)
      )
      if (events.length > 0) {
        let returningOrders = events.filter((f) => f.status !== 'Completed')
        return returningOrders.length
>>>>>>> 1a23a1dfc4c41c92d44f4512b71f381c9025dff3
      }
    }
  }

  getTodaysOrder = () => {
<<<<<<< HEAD
    const { rentedproducts } = this.props;
    if (rentedproducts) {
      var currentdate = moment(new Date).format('MM/DD/YYYY');
      let events = rentedproducts.filter(a => (moment(moment(a.createdAt).format('MM/DD/YYYY')).isSame(currentdate)));
      return events.length;
    }
  }
  orderPickUpToday = () => {
    const { rentedproducts } = this.props;
=======
    // e.preventDefault()
    const { rentedproducts } = this.props
    if (rentedproducts) {
      var currentdate = moment(new Date()).format('MM/DD/YYYY')

      let events = rentedproducts.filter((a) =>
        moment(moment(a.createdAt).format('MM/DD/YYYY')).isSame(currentdate)
      )
      return events.length
    }
  }
  orderPickUpToday = () => {
    const { rentedproducts } = this.props
>>>>>>> 1a23a1dfc4c41c92d44f4512b71f381c9025dff3
    if (rentedproducts) {
      var currentdate = moment(new Date()).format('MM/DD/YYYY')
      let events = rentedproducts.filter((a) =>
        moment(moment(a.rentDate).format('MM/DD/YYYY')).isSame(currentdate)
      )
      let returningOrders = events.filter((f) => f.status !== 'Completed')
      return returningOrders.length
    }
  }
  getReturnOrder = () => {
<<<<<<< HEAD
    const { rentedproducts } = this.props;
=======
    // e.preventDefault()
    const { rentedproducts } = this.props
>>>>>>> 1a23a1dfc4c41c92d44f4512b71f381c9025dff3
    if (rentedproducts) {
      var currentdate = moment(new Date()).format('MM/DD/YYYY')
      let events = rentedproducts.filter((a) =>
        moment(moment(a.returnDate).format('MM/DD/YYYY')).isSame(currentdate)
      )
      return events.length
    }
  }
  getTodaysAppointment = () => {
<<<<<<< HEAD
    const { appointment } = this.props;
    if (appointment) {
      var currentdate = moment(new Date).format('MM/DD/YYYY');
      let events = appointment.filter(a => (moment(moment(a.start).format('MM/DD/YYYY')).isSame(currentdate)));
      return events.length;
    }
  }
=======
    // e.preventDefault()
    const { appointment } = this.props
    if (appointment) {
      var currentdate = moment(new Date()).format('MM/DD/YYYY')
      let events = appointment.filter((a) =>
        moment(moment(a.start).format('MM/DD/YYYY')).isSame(currentdate)
      )
      return events.length
    }
  }

>>>>>>> 1a23a1dfc4c41c92d44f4512b71f381c9025dff3
  render() {
    const { shop } = this.props
    const { user } = this.props.auth
    if (user && user.type == 'User') {
      if (shop) {
        let openShop = shop[0]
<<<<<<< HEAD
        if (openShop && openShop.status === "off") {
          localStorage.clear();
          this.props.history.push("/");
          window.location.reload();
=======
        if (openShop && openShop.status === 'off') {
          localStorage.clear()
          this.props.history.push('/')
          window.location.reload()

>>>>>>> 1a23a1dfc4c41c92d44f4512b71f381c9025dff3
          // setAlert("Shop is closed", "danger", 5000);
        }
      }
    }
    return (
      <React.Fragment>
        <Loader />
<<<<<<< HEAD
        <div className="wrapper menu-collapsed">
          <Sidebar location={this.props.location} >
          </Sidebar>
          <Header>
          </Header>
          <div className="main-panel">
            <div className="main-content">
              <div className="content-wrapper">
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                    <div className="card gradient-red-pink">
                      <div className="card-content">
                        <div className="card-body pt-2 pb-0">
                          <div className="media">
                            <div className="media-body white text-left">
                              <h3 className="font-large-1 mb-0">{this.getTodaysAppointment()}</h3>
                              <a href="/calender" style={{ 'textDecoration': 'none', 'color': 'white' }}>Today's Appointment                    </a>
=======
        <div className='wrapper menu-collapsed'>
          <Sidebar location={this.props.location}></Sidebar>
          <Header></Header>

          <div className='main-panel'>
            <div className='main-content'>
              <div className='content-wrapper'>
                <div className='row'>
                  <div className='col-xl-4 col-lg-6 col-md-6 col-12'>
                    <div className='card gradient-red-pink'>
                      <div className='card-content'>
                        <div className='card-body pt-2 pb-0'>
                          <div className='media'>
                            <div className='media-body white text-left'>
                              <h3 className='font-large-1 mb-0'>
                                {this.getTodaysAppointment()}
                              </h3>
                              <a
                                href='/calender'
                                style={{
                                  textDecoration: 'none',
                                  color: 'white',
                                }}
                              >
                                Today's Appointment
                              </a>
>>>>>>> 1a23a1dfc4c41c92d44f4512b71f381c9025dff3
                            </div>
                            <div className='media-right white text-right'>
                              <i className='icon-pie-chart font-large-1'></i>
                            </div>
                          </div>
                        </div>
                        <div
                          id='Widget-line-chart'
                          className='height-75 WidgetlineChart WidgetlineChartshadow mb-2'
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-4 col-lg-6 col-md-6 col-12'>
                    <div className='card gradient-blueberry'>
                      <div className='card-content'>
                        <div className='card-body pt-2 pb-0'>
                          <div className='media'>
                            <div className='media-body white text-left'>
                              <h3 className='font-large-1 mb-0'>
                                {this.getReturnOrder()}
                              </h3>
                              <span>Đơn Hàng Phải Trả Hôm Nay</span>
                            </div>
                            <div className='media-right white text-right'>
                              <i className='icon-bulb font-large-1'></i>
                            </div>
                          </div>
                        </div>
                        <div
                          id='Widget-line-chart1'
                          className='height-75 WidgetlineChart WidgetlineChartshadow mb-2'
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className='col-xl-4 col-lg-6 col-md-6 col-12'>
                    <div className='card gradient-mint'>
                      <div className='card-content'>
                        <div className='card-body pt-2 pb-0'>
                          <div className='media'>
                            <div className='media-body white text-left'>
                              <h3 className='font-large-1 mb-0'>
                                {this.getOverDueOrder()}
                              </h3>
                              <span>Đơn Hàng Quá Hạn</span>
                            </div>
                            <div className='media-right white text-right'>
                              <i className='icon-graph font-large-1'></i>
                            </div>
                          </div>
                        </div>
                        <div
                          id='Widget-line-chart2'
                          className='height-75 WidgetlineChart WidgetlineChartshadow mb-2'
                        ></div>
                      </div>
                    </div>
                  </div>
<<<<<<< HEAD
                  <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                    <div className="card gradient-mini">
                      <div className="card-content">
                        <div className="card-body pt-2 pb-0">
                          <div className="media">
                            <div className="media-body white text-left">
                              <h3 className="font-large-1 mb-0">{this.orderPickUpToday()}</h3>
=======
                  <div className='col-xl-4 col-lg-6 col-md-6 col-12'>
                    <div className='card gradient-mini'>
                      <div className='card-content'>
                        <div className='card-body pt-2 pb-0'>
                          <div className='media'>
                            <div className='media-body white text-left'>
                              <h3 className='font-large-1 mb-0'>
                                {this.orderPickUpToday()}
                              </h3>
>>>>>>> 1a23a1dfc4c41c92d44f4512b71f381c9025dff3
                              <span>Order Pickup Today</span>
                            </div>
                            <div className='media-right white text-right'>
                              <i className='icon-wallet font-large-1'></i>
                            </div>
                          </div>
                        </div>
                        <div
                          id='Widget-line-chart3'
                          className='height-75 WidgetlineChart WidgetlineChartshadow mb-2'
                        ></div>
                      </div>
                    </div>
                  </div>
<<<<<<< HEAD
                  <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                    <div className="card gradient-brown-brown">
                      <div className="card-content">
                        <div className="card-body pt-2 pb-0">
                          <div className="media">
                            <div className="media-body white text-left">
                              <h3 className="font-large-1 mb-0">{}</h3>
=======
                  <div className='col-xl-4 col-lg-6 col-md-6 col-12'>
                    <div className='card gradient-brown-brown'>
                      <div className='card-content'>
                        <div className='card-body pt-2 pb-0'>
                          <div className='media'>
                            <div className='media-body white text-left'>
                              <h3 className='font-large-1 mb-0'>{}</h3>
>>>>>>> 1a23a1dfc4c41c92d44f4512b71f381c9025dff3
                              <span>Order Needs Alteration</span>
                            </div>
                            <div className='media-right white text-right'>
                              <i className='icon-wallet font-large-1'></i>
                            </div>
                          </div>
                        </div>
                        <div
                          id='Widget-line-chart3'
                          className='height-75 WidgetlineChart WidgetlineChartshadow mb-2'
                        ></div>
                      </div>
                    </div>
                  </div>
<<<<<<< HEAD
                  <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                    <div className="card gradient-orange">
                      <div className="card-content">
                        <div className="card-body pt-2 pb-0">
                          <div className="media">
                            <div className="media-body white text-left">
                              <h3 className="font-large-1 mb-0">{this.getTodaysOrder()}</h3>
=======
                  <div className='col-xl-4 col-lg-6 col-md-6 col-12'>
                    <div className='card gradient-orange'>
                      <div className='card-content'>
                        <div className='card-body pt-2 pb-0'>
                          <div className='media'>
                            <div className='media-body white text-left'>
                              <h3 className='font-large-1 mb-0'>
                                {this.getTodaysOrder()}
                              </h3>
>>>>>>> 1a23a1dfc4c41c92d44f4512b71f381c9025dff3
                              <span>Today's Orders</span>
                            </div>
                            <div className='media-right white text-right'>
                              <i className='fa-music font-large-1'></i>
                            </div>
                          </div>
                        </div>
                        <div
                          id='Widget-line-chart3'
                          className='height-75 WidgetlineChart WidgetlineChartshadow mb-2'
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                {user && user.type === 'Admin' ? (
                  <>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='card'>
                          <div className='card-body'>
                            <div className='row'>
                              <div className='col-md-7 txt-sep'>
                                <h2>
                                  Cửa Hàng Đã{' '}
                                  {this.props.shop[0] &&
                                    (this.props.shop[0].status == 'on'
                                      ? 'Mở Cửa'
                                      : 'Đóng Cửa')}{' '}
                                  lúc
                                </h2>
                                <h1>
                                  {' '}
                                  <span className='badge badge-info'>
                                    {this.props.shop[0] &&
                                      moment(
                                        this.props.shop[0].shopStartTime
                                      ).format('hh:mm a')}
                                  </span>
                                </h1>
                                <p>
                                  <span className='badge badge-pill badge-light'>
                                    {this.props.shop[0] &&
                                      moment(
                                        this.props.shop[0].shopStartTime
                                      ).format('DD-MMM-YY')}
                                  </span>{' '}
                                </p>
                              </div>
                              <div className='col-md-3 txt-sep'>
                                <h3 className='mt-1'>Trạng thái</h3>
                                <p className='badge badge-pill badge-light'>
                                  {this.props.shop[0] &&
                                    (this.props.shop[0].status == 'on'
                                      ? 'Mở Cửa'
                                      : 'Đóng Cửa')}
                                </p>
                              </div>
                              <div className='col-md-2'>
                                <h3 className='mt-1'>Hành động</h3>
                                {this.props.shop[0] &&
                                  (this.props.shop[0].status == 'on' ? (
                                    <button
                                      type='button'
                                      onClick={() =>
                                        this.changeShopStatus('off')
                                      }
                                      className='btn btn-link'
                                    >
                                      Đóng Cửa
                                    </button>
                                  ) : (
                                    <button
                                      type='button'
                                      onClick={() =>
                                        this.changeShopStatus('on')
                                      }
                                      className='btn btn-link'
                                    >
                                      Mở Cửa
                                    </button>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ' '
                )}
              </div>
            </div>

<<<<<<< HEAD
            <footer className="footer footer-static footer-light">
              <p className="clearfix text-muted text-sm-center px-2"><span>Quyền sở hữu của &nbsp;{" "}
                <a href="https://www.sutygon.com" id="pixinventLink" target="_blank" className="text-bold-800 primary darken-2">SUTYGON-BOT </a>, All rights reserved. </span></p>
=======
            <footer className='footer footer-static footer-light'>
              <p className='clearfix text-muted text-sm-center px-2'>
                <span>
                  Quyền sở hữu của &nbsp;{' '}
                  <a
                    href='https://www.sutygon.com'
                    id='pixinventLink'
                    target='_blank'
                    className='text-bold-800 primary darken-2'
                  >
                    SUTYGON-BOT{' '}
                  </a>
                  , All rights reserved.{' '}
                </span>
              </p>
>>>>>>> 1a23a1dfc4c41c92d44f4512b71f381c9025dff3
            </footer>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Dashboard.propTypes = {
  getAllAppointments: PropTypes.func.isRequired,
  getAllOrders: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  getAllRentedProducts: PropTypes.func.isRequired,
  changeShopStatus: PropTypes.func.isRequired,
  getShop: PropTypes.func.isRequired,
  auth: PropTypes.object,
  products: PropTypes.array,
  orders: PropTypes.array,
  rentedproducts: PropTypes.array,
  shop: PropTypes.object,
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  auth: state.auth,
  products: state.product.products,
  appointment: state.appointment.appointments,
  shop: state.dashboard.shop,
  rentedproducts: state.rentproduct.rentproducts,
})
export default connect(mapStateToProps, {
  getAllAppointments,
  getAllOrders,
  getAllProducts,
  getAllRentedProducts,
  changeShopStatus,
<<<<<<< HEAD
  getShop
})(Dashboard);
=======
  getShop,
})(Dashboard)
>>>>>>> 1a23a1dfc4c41c92d44f4512b71f381c9025dff3
