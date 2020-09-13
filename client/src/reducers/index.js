import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";

import dashboard from "./dashboard";
import user from "./user";
import pages from "./pages";
import product from "./product";
import customer from "./customer";
import rentproduct from "./rentproduct";
import order from "./order";
import appointment from "./appointment";
import report from "./report";


export default combineReducers({
  alert,
  auth,
  pages,
  user,
  product,
  customer,
  rentproduct,
  order,
  appointment,
  report,
  dashboard,

});
