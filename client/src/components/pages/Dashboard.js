import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Loader from "../layout/Loader";
import "../../login.css"

class Dashboard extends Component {
  
  
  render() {
  
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
          <div className="content-wrapper"><div className="row">
  <div className="col-xl-3 col-lg-6 col-md-6 col-12">
    <div className="card bg-primary">
      <div className="card-content">
        <div className="card-body pt-2 pb-0">
          <div className="media">
            <div className="media-body white text-left">
              <h3 className="font-large-1 mb-0">$15,678</h3>
              <span>Total Cost</span>
            </div>
            <div className="media-right white text-right">
              <i className="icon-bulb font-large-1"></i>
            </div>
          </div>
        </div>
        <div id="Widget-line-chart" className="height-75 WidgetlineChart WidgetlineChartShadow mb-3">
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-lg-6 col-md-6 col-12">
    <div className="card bg-warning">
      <div className="card-content">
        <div className="card-body pt-2 pb-0">
          <div className="media">
            <div className="media-body white text-left">
              <h3 className="font-large-1 mb-0">$2156</h3>
              <span>Total Tax</span>
            </div>
            <div className="media-right white text-right">
              <i className="icon-pie-chart font-large-1"></i>
            </div>
          </div>
        </div>
        <div id="Widget-line-chart2" className="height-75 WidgetlineChart WidgetlineChartShadow mb-3">
        </div>
      </div>
    </div>
  </div>

  <div className="col-xl-3 col-lg-6 col-md-6 col-12">
    <div className="card bg-success">
      <div className="card-content">
        <div className="card-body pt-2 pb-0">
          <div className="media">
            <div className="media-body white text-left">
              <h3 className="font-large-1 mb-0">$45,668</h3>
              <span>Total Sales</span>
            </div>
            <div className="media-right white text-right">
              <i className="icon-graph font-large-1"></i>
            </div>
          </div>
        </div>
        <div id="Widget-line-chart3" className="height-75 WidgetlineChart WidgetlineChartShadow mb-3">
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-lg-6 col-md-6 col-12">
    <div className="card bg-danger">
      <div className="card-content">
        <div className="card-body pt-2 pb-0">
          <div className="media">
            <div className="media-body white text-left">
              <h3 className="font-large-1 mb-0">$32,454</h3>
              <span>Total Earning</span>
            </div>
            <div className="media-right white text-right">
              <i className="icon-wallet font-large-1"></i>
            </div>
          </div>
        </div>
        <div id="Widget-line-chart4" className="height-75 WidgetlineChart WidgetlineChartShadow mb-3">
        </div>
      </div>
    </div>
  </div>
</div>

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


export default Dashboard;
