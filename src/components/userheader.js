import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { authreducer, initialAuthState } from '../reducer/authreducers';
import {useReducer} from 'react'
import jwtDecode from 'jwt-decode'
import authContext from "../store";

const UserHeader = (props) => {
  
const {state, dispatch} = React.useContext(authContext)

  const logout = () => {
    
    // dispatch({
    //   type: "LOGOUT"
    // })
    localStorage.clear()
    window.location = '/'
  }
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark ">
      <Link className="navbar-brand" to="/">
        <img
          src="images/send-logo.png"
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
              {props.user.firstname.toUpperCase()}
            
            </NavLink>
            <NavLink className="nav-item nav-link btn btn-secondary mr-1 ml-1 text-white" to="/createOrder">
              Create Order
            </NavLink>
            <NavLink
              className="nav-item nav-link btn btn-danger"
              to="/logout"
              onClick={logout}
            >
              Logout
            </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default UserHeader;
          
// export const initialAuthState = {
//   isAuthenticated: false,
//   user: JSON.parse(localStorage.getItem("user")) || {},
//   token: null
// };
// export const authreducer = (state=initialAuthState, action) => {
//   switch (action.type) {
//     case "LOGIN_SUCCESS":
//      localStorage.setItem("user", JSON.stringify(action.payload.user));
//      const token = localStorage.getItem("token");
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload.user,
//         token,
//         error: ''
//       };
//       case 'LOGIN_FAIL':
// 			return {
//         ...state,
// 				isAuthenticated: false,
// 				user: null,
// 				error: action.payload.error
// 			};
//     case "LOGOUT":
//       localStorage.clear();
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null
//       };
//     default:
//       return state;
//   }
// };
