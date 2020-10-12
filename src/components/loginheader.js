import React, {useEffect, useState, useContext} from "react";
import { Link, NavLink } from "react-router-dom";
import authContext from '../store'
import sendLogo from '../assets/send-logo.png'



 const LoginHeader = () => {      
    
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
        <React.Fragment>
              <NavLink className="nav-item nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
              <NavLink
                className="nav-item nav-link btn btn-outline-primary"
                to="/login"
              >
                Login
              </NavLink>
            </React.Fragment>
            </div>
      </div>
    </nav>
  );
}

export default LoginHeader