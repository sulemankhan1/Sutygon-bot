import React, { Component } from "react";
import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";
import { addNewUser, updateUser, getUser } from "../../../actions/user";
import axios, { post } from 'axios';
import { Link } from "react-router-dom";

import Alert from "../../layout/Alert";
import Loader from "../../layout/Loader";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AddUser extends Component {
    state = {
        id: "",
        fullname: "",
        username: "",
        email: "",
        contactnumber: "",
        password: "",
        gender: "",
        avatar: "",
        saving: false,
    };

    async componentDidMount() {
        // check form is to Add or Edit
        if (this.props.match.params.id) {
            const id = this.props.match.params.id;
            let res = await this.props.getUser(id);
            const { user } = this.props;
            if (user) {
                this.setState({
                    id: id,
                    fullname: user.fullname,
                    username: user.username,
                    avatar: user.avatar,
                    email: user.email,
                    contactnumber: user.contactnumber,
                    password: user.password

                });
            }
        }
    }


    _onChange = (e, id = "") => {
        this.setState({ [e.target.name]: e.target.files[0] });
    }
    
    handleChange = (e, id = "") => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = async (e) => {
        e.preventDefault();
        // this.setState({ saving: true });
        const formData = new FormData();
        formData.append('avatar',this.state.avatar)
        formData.append('username',this.state.username)
        formData.append('fullname',this.state.username)
        formData.append('contactnumber',this.state.contactnumber)
        formData.append('email',this.state.email)
        formData.append('password',this.state.password)
        formData.append('gender',this.state.gender)
        
            if (this.state.id === "") {
            await this.props.addNewUser(formData);
        } else {
            await this.props.updateUser(formData, this.state.id);
        }
        this.setState({ saving: false });
    }
    render() {
        const { auth } = this.props;
        if (!auth.loading && !auth.isAuthenticated) {
            return <Redirect to="/" />;
        }
        if (this.props.saved) {
            return <Redirect to="/dashboard" />;
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
                                <div className="form-body">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="form-section"><i className="ft-user"></i>
                                                {this.state.id === ""
                                                    ? "Add New User"
                                                    : "Update User"}
                                            </h4>
                                        </div>
                                        <Alert />

                                        <div className="card-body">
                                            <form
                                                encType="multipart/form-data"
                                                action="/upload"
                                                method="POST"
                                                onSubmit={(e) => this.onSubmit(e)}>

                                                <div className="row">
                                                    <div className="form-group col-12 mb-2">
                                                        <label>Select Profile Image</label>
                                                        <input
                                                            name="avatar"
                                                            type="file"
                                                            className="form-control-file"
                                                            id="projectinput8"
                                                            accept='image/*,.pdf,.jpg'

                                                            // accept='file_extension|image/*|media_type'
                                                            // value={this.state.avatar}
                                                            onChange={(e) => this._onChange(e)} />



                                                    </div>

                                                    <div className="form-group col-12 mb-2">
                                                        {/* <button
                                                            name=""
value="submit"
                                                            type="submit"
                                                            
                                                            // accept='file_extension|image/*|media_type'
                                                            // value={this.state.avatar}
                                                        > Submit
                                                            </button> */}



                                                   
                                                </div> 
                                                 </div>
                                                <div className="row">
                                                    <div className="form-group col-md-6 mb-2">
                                                        <label htmlFor="projectinput1">User Name</label>
                                                        <input type="text"
                                                            id="projectinput1"
                                                            className="form-control"
                                                            placeholder="User Name"
                                                            name="username"
                                                            onChange={(e) => this.handleChange(e)}
                                                            value={this.state.username}
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-6 mb-2">
                                                        <label htmlFor="projectinput2">Full Name</label>
                                                        <input type="text"
                                                            id="projectinput2"
                                                            className="form-control"
                                                            placeholder="Full Name"
                                                            name="fullname"
                                                            onChange={(e) => this.handleChange(e)}
                                                            value={this.state.fullname}
                                                        />
                                                    </div>
                                                </div>
{/* </form> */}
                                                <div className="row">
                                                    <div className="form-group col-md-6 mb-2">
                                                        <label htmlFor="projectinput3">E-mail</label>
                                                        <input type="text"
                                                            id="projectinput3"
                                                            className="form-control"
                                                            placeholder="E-mail"
                                                            name="email"
                                                            onChange={(e) => this.handleChange(e)}
                                                            value={this.state.email}
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-6 mb-2">
                                                        <label htmlFor="projectinput4">Contact Number</label>
                                                        <input type="text"
                                                            id="projectinput4"
                                                            className="form-control"
                                                            placeholder="Phone"
                                                            name="contactnumber"
                                                            onChange={(e) => this.handleChange(e)}
                                                            value={this.state.contactnumber}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    {this.state.id === ""
                                                        ?
                                                        <>
                                                            <div className="form-group col-6 mb-2">
                                                                <label htmlFor="projectinput5">Password</label>
                                                                <input type="password"
                                                                    id="projectinput5"
                                                                    className="form-control"
                                                                    placeholder="Password"
                                                                    name="password"
                                                                    onChange={(e) => this.handleChange(e)}
                                                                    value={this.state.password}
                                                                />
                                                            </div>
                                                        </>
                                                        : ""}

                                                    <div className="form-group col-md-6 mb-2">
                                                        <label htmlFor="projectinput6">Gender</label><br></br>
                                                        <label className="radio-inline">
                                                            <input
                                                                type="radio"
                                                                name="gender"
                                                                onChange={(e) => this.handleChange(e)}
                                                                checked={this.state.gender === "male"}
                                                                value="male"

                                                            />Male
                       </label>
                                                        <label className="radio-inline">
                                                            <input
                                                                type="radio"
                                                                name="gender"
                                                                value="female"
                                                                onChange={(e) => this.handleChange(e)}
                                                                checked={this.state.gender === "female"}

                                                            />Female
                         </label>
                                                        <label className="radio-inline">
                                                            <input
                                                                type="radio"
                                                                name="gender"
                                                                value="other"
                                                                onChange={(e) => this.handleChange(e)}
                                                                checked={this.state.gender === "other"}

                                                            />Others
                       </label>
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
                                &nbsp; Saving
                                                        </button>
                                                    ) : (
                                                            <button
                                                                type="submit"
                                                                className="mb-2 mr-2 btn btn-raised btn-primary"
                                                            >
                                                                <i className="fa fa-check" /> Add User
                                                            </button>
                                                        )}

                                                </div>
                                                </form>

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

AddUser.propTypes = {
    saved: PropTypes.bool,
    addNewUser: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,

    auth: PropTypes.object,
    updateUser: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
    saved: state.user.saved,
    auth: state.auth,
    user: state.user.profile,


});
export default connect(mapStateToProps, {
    addNewUser, updateUser, getUser
})(AddUser);

