import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import sendLogo from '../assets/send-logo.png'

const AdminHeader = (props) => {
  

  const logout = () => {
    
    // dispatch({
    //   type: "LOGOUT"
    // })
    window.location = '/'
    localStorage.clear()
  }
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark ">
      <Link className="navbar-brand" to="/">
        <img
          src={sendLogo}
          className="img-fluid"
          width="180"
          height="60"
          alt="Header logo"
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/profile">
              ADMIN
            
            </NavLink>
            <NavLink
              className="nav-item nav-link btn btn-danger"
              onClick={logout}
              to="/home"
            >
              Logout
            </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
