import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers, deleteUser } from "../../../actions/user";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Alert from "../../layout/Alert";

class ViewUser extends Component {
  async componentDidMount() {
    await this.props.getAllUsers();
  }

  getTAble = () => {
    const { users } = this.props;
    
    let tbl_sno = 1;
    // const {user} = this.props.auth;

    if (users) {
      if (users.length === 0) {
        return (
          <tr>
            <td colSpan={6} className="text-center">
              No User Found
            </td>
          </tr>
        );
      }
      return users.map((user) => (
        <tr>
          <td className="text-center text-muted">{tbl_sno++}</td>
          <td className="text-center"><img class="media-object round-media" src={user.avatar} alt="Generic placeholder image" height={75} /></td>

          <td className="text-center">{user.username}</td>
          <td className="text-center">{user.contactnumber}</td>
          <td className="text-center">{user.email}</td>
          <td className="text-center">{user.gender}</td>
          {/* <td className="text-center">
            {user.accountStatus === "active" && (
              <span className="badge badge-warning">Active</span>
            )}
            {user.accountStatus === "block" && (
              <span className="badge badge-success">Block</span>
            )}
          </td> */}
          <td className="text-center">{user.accountStatus}</td>
          <td className="text-center">
            <Link 
             to={{ pathname: `/user/view/${user._id}` }}

              className="info p-0">
              <i className="ft-user font-medium-3 mr-2"></i>
            </Link>
            <Link
              to={{ pathname: `/user/edituser/${user._id}` }}
              className="success p-0">
              <i className="ft-edit-2 font-medium-3 mr-2"></i>
            </Link>
            <Link to="/user/viewuser"
              onClick={() => this.onDelete(user._id)}
              className="danger p-0">
              <i className="ft-x font-medium-3 mr-2"></i>
            </Link>
          </td>

          {/* <td className="text-center">
            <Link to="/batches/view/"
             className="mb-2 btn btn-sm btn-dark">
              View
            </Link>
            {(user && (user.type === "Admin" || user.type === "Teacher" ))? 
            <Link
              to={{ pathname: `/batches/edit/${batch._id}` }}
              className="mb-2 btn btn-sm btn-dark"
            >
              Edit
            </Link> : ""
            }
             {(user && (user.type === "Admin" || user.type === "Teacher" ))? 
            <Link
              to="/batches"
              className="mb-2 btn btn-sm btn-dark"
              onClick={() => this.onDelete(batch._id)}
            >
              Delete
              </Link> : ""
            }
          </td> */}
        </tr>
      ));
    }
  };


  onDelete = (id) => {
    confirmAlert({
      title: "Delete User",
      message: "Are you sure you want to delete this record?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.deleteUser(id);
          },
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  };



  render() {
    const { auth } = this.props;
    if (!auth.loading && !auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    // if (this.props.saved) {
    //     return <Redirect to="/dashboard" />;
    //   }

    return (
      <React.Fragment>
        <div className="wrapper menu-collapsed">
          <Sidebar location={this.props.location} >
          </Sidebar>
          <Header>
          </Header>
          <div className="main-panel">

            <div class="main-content">
              <div class="content-wrapper">
                <section id="simple-table">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="card">
                        <div class="card-header">
                          <h4 class="card-title">View User</h4>
                        </div>
                        <div class="card-content">
                          <div class="card-body">
                            <Alert />
                            <table class="table">
                              <thead>
                                <tr>
                                  <th className="text-center">#</th>
                                  <th className="text-center">Avatar</th>
                                  
                                  <th className="text-center">Full Name</th>
                                  {/* <th>Last Name</th> */}
                                  <th className="text-center" >Contact</th>
                                  <th className="text-center">E-mail</th>
                                  <th className="text-center">Gender</th>
                                  <th className="text-center">Account Status</th>
                                  <th className="text-center">Actions</th>

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

ViewUser.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  auth: PropTypes.object,
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.object,
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  auth: state.auth,

});
export default connect(mapStateToProps, {
  getAllUsers, deleteUser
})(ViewUser);

