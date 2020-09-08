import React, { useEffect } from "react";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/Login";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./routing/PrivateRoute";
import AddUser from "./components/pages/users/Adduser";
import ViewUser from "./components/pages/users/Viewuser";
import AddCustomer from "./components/pages/customers/Addcustomer";
import AddProduct from "./components/pages/products/Addproduct";
import Orders from "./components/pages/orders";
import AddAppointment from "./components/pages/appointment";
import ViewCustomer from "./components/pages/customers/Viewcustomer";
import ViewProduct from "./components/pages/products/Viewproduct";
import RentProduct from "./components/pages/rentproduct";
import Report from "./components/pages/report/report";
import ReportOrder from "./components/pages/report/reportOrder";


// import Calender from "./components/pages/calender";




// Redux
import { Provider } from "react-redux";
import store from "./store";
import Addproduct from "./components/pages/products/Addproduct";
import Viewuser from "./components/pages/users/Viewuser";
import { addNewAppointment } from "./actions/appointment";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const Main = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Login" component={Login} />
{/* Dashboard */}
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
{/* users */}
          <PrivateRoute exact path="/adduser" component={AddUser} />
          <PrivateRoute exact path="/viewuser" component={ViewUser} />
          <PrivateRoute exact path="/edituser/:id" component={AddUser} />

{/* customers */}
          <PrivateRoute exact path="/addcustomer" component={AddCustomer} />
          <PrivateRoute exact path="/viewcustomer" component={ViewCustomer} />
{/* products */}
          <PrivateRoute exact path="/addproduct" component={AddProduct} />
          <PrivateRoute exact path="/viewproduct" component={ViewProduct} />
          <PrivateRoute exact path="/editproduct/:id" component={AddProduct} />
{/* rent product */}
          <PrivateRoute exact path="/rentproduct" component={RentProduct} />

{/* orders */}
          <PrivateRoute exact path="/orders" component={Orders} />
{/* appointment */}
<PrivateRoute exact path="/appointments" component={AddAppointment} />

{/* report */}
<PrivateRoute exact path="/reports" component={Report} />
<PrivateRoute exact path="/report" component={ReportOrder} />



        </Switch>
      </Router>
    </Provider>
  );
};

export default Main;
