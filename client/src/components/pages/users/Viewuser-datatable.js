import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers, deleteUser,blockUser } from "../../../actions/user";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Alert from "../../layout/Alert";
import Loader from "../../layout/Loader";
import DataTable, { createTheme } from 'react-data-table-component';



class ViewUser extends Component {
  async componentDidMount() {
    await this.props.getAllUsers();
    // this.setTableData();
  }
  t_data = {};
  columns = [
    {
      name: '#',
      selector: '#',
      sortable: true,
      width: '50px'
    },
    {
      name: 'Avatar',
      selector: 'avatar',
      sortable: true,
    },
    {
      name: 'Full Name',
      selector: 'full_name',
      sortable: true,
    },
    {
      name: 'E-mail',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Gender',
      selector: 'gender',
      sortable: true,
    },
    {
      name: 'Account Status',
      selector: 'account_status',
      sortable: true,
    },
    {
      name: 'Actions',
      selector: 'actions',
      sortable: true,
    },
  ];
  
  getTable() {
    const { auth } = this.props;
    const { users } = this.props;
    const auth_user = auth.user;

    let tbl_sno = 0;
    if(users){
      this.t_data = users.map((user) => {
        tbl_sno++;
        return {
          '#': tbl_sno,
          'avatar': <img className="media-object round-media img img-thumbnail m-1" src={`${user.avatar}`} alt="Generic placeholder image" height={75} />,
          'full_name': user.username,
          'email': user.email,
          'gender': user.gender,
          'account_status': (user.accountStatus === "active" && (
            <span className="badge badge-warning">Active</span>
          )) || (user.accountStatus === "block" && (
            <span className="badge badge-success">Block</span>
          )) ,
          'actions':  
          <div>
          {
            auth_user && auth_user.type === "Admin" &&
            (<Link
              to={{ pathname: `/user/changeStatus/${user._id}` }}
    
              onClick={() => this.onBlock(user._id)}
              className="info p-0">
              <i className="ft-alert-triangle font-medium-3 mr-2"></i>
            </Link>)
          }
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
        </div>,
        }
      });
    }
    

    return <DataTable
    columns={this.columns}
    data={this.t_data}
    pagination={true}
    striped={true}
    highlightOnHover={true}
    theme="solarized"
  />
  }

  // getTAble = () => {
  //   const { auth } = this.props;
  //   const auth_user = auth.user;
  //   const { users } = this.props;
  //   let tbl_sno = 1;
  //   // const {user} = this.props.auth;
  //   if (users) {
  //     if (users.length === 0) {
  //       return (
  //         <tr>
  //           <td colSpan={6} className="text-center">
  //             No User Found
  //           </td>
  //         </tr>
  //       );
  //     }
  //     return users.map((user) => (
  //       // console.log(user)
  //       //  <img className="media-object round-media" src="../../uploads/avatar-1599780670164-862543959" alt="Generic placeholder image" height={75} />
  //       <tr key={user._id}>
  //         <td className="text-center text-muted">{tbl_sno++}</td>
  //         <td className="text-center">
  //           <img className="media-object round-media" src={`${user.avatar}`} alt="Generic placeholder image" height={75} />
  //         </td>
  //         {/* E:\Alphinex\Sutygon-bot\Sutygon-bot\client\src\uploads\E:\Alphinex\Sutygon-bot\Sutygon-bot\client\src\uploads\8a8d8ee8-f05f-4a80-91cd-5eea99c8d8bc.jpg*/}


  //         <td className="text-center">{user.username}</td>
  //         <td className="text-center">{user.contactnumber}</td>
  //         <td className="text-center">{user.email}</td>
  //         <td className="text-center">{user.gender}</td>
  //         <td className="text-center">
  //           {user.accountStatus === "active" && (
  //             <span className="badge badge-warning">Active</span>
  //           )}
  //           {user.accountStatus === "block" && (
  //             <span className="badge badge-success">Block</span>
  //           )}
  //         </td>
  //         {/* <td className="text-center">{user.accountStatus}</td> */}
  //         <td className="text-center">
  //           {auth_user && auth_user.type === "Admin" ?
  //               <Link
  //                 to={{ pathname: `/user/changeStatus/${user._id}` }}

  //                 onClick={() => this.onBlock(user._id)}
  //                 className="info p-0">
  //                 <i className="ft-alert-triangle font-medium-3 mr-2"></i>
  //               </Link>

  //              : ""}
  //           <Link
  //             to={{ pathname: `/user/view/${user._id}` }}

  //             className="info p-0">
  //             <i className="ft-user font-medium-3 mr-2"></i>
  //           </Link>
  //           <Link
  //             to={{ pathname: `/user/edituser/${user._id}` }}
  //             className="success p-0">
  //             <i className="ft-edit-2 font-medium-3 mr-2"></i>
  //           </Link>
  //           <Link to="/user/viewuser"
  //             onClick={() => this.onDelete(user._id)}
  //             className="danger p-0">
  //             <i className="ft-x font-medium-3 mr-2"></i>
  //           </Link>
  //         </td>
  //       </tr>
  //     ));
  //   }
  // };

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

  onBlock = (id) => {
    confirmAlert({
      title: "Block User",
      message: "Are you sure you want to block this user?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.blockUser(id);
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
        <Loader />
        <div className="wrapper menu-collapsed">
          <Sidebar location={this.props.location} >
          </Sidebar>
          <Header>
          </Header>
          <div className="main-panel">

            <div className="main-content">
              <div className="content-wrapper">
                <section id="simple-table">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title">View User</h4>
                        </div>
                        <div className="card-content">
                          <div className="card-body">
                            <Alert />
                            {this.getTable()}
                            {/* <table className="table">
                              <thead>
                                <tr>
                                  <th className="text-center">#</th>
                                  <th className="text-center">Avatar</th>

                                  <th className="text-center">Full Name</th>
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
                            </table> */}
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
  blockUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  auth: state.auth,

});
export default connect(mapStateToProps, {
  getAllUsers, deleteUser,blockUser
})(ViewUser);

