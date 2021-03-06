
import React, {useEffect, useState } from 'react';
// import {Router} from 'react-router-dom';

import {HashRouter, 
        Switch, 
        Route, 
        Redirect 
} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import Admin from './components/admin'
import Login from "./components/login";
import Home from "./components/home";
import Footer from './components/footer'
import Profile from './components/profile'
import UserHeader from './components/userheader'
import LoginHeader from './components/loginheader'
import AdminHeader from './components/adminheader'
import Register from './components/register';
import CreateOrder from './components/createOrder'
import jwtDecode from 'jwt-decode'
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/reset'
import UpdatePassword from './components/UpdatePassword'


function App() {
const [user, setUser] = useState('')
        useEffect(()=> {   
               try{ const jwt = localStorage.getItem("token");
                const user = jwtDecode(jwt);
                setUser( user );
                console.log(user)
        }catch(ex){}
        },[])

        // const [state, dispatch] = useReducer(authreducer, initialAuthState);
	return (
      <div>
      <ToastContainer/>
      <div className="App">{(!user) ? <LoginHeader /> : <UserHeader user={user} />}</div>
      <Switch>
        <Route exact path="/ForgotPassword" component={ForgotPassword}/>
        <Route exact path="/reset/:token" component={ResetPassword}/>
        <Route exact path="/updatePassword" component={UpdatePassword}/>
           <Route
         path="/register"
         render={props => {
                if (!user) return <Register {...props} />;
                return <Redirect to="/profile" />;
              }}/>
        <Route
        path="/login"
        render={props => {
                if (!user) return <Login {...props} />;
                return <Redirect to="/profile" />;
              }}/>
        <Route
        path="/createOrder" render={props => {
                if (!user) return <Redirect to="/" />;
                return <CreateOrder {...props} />;
              }}/>
        <Route
        path="/profile" render={props => {
                if (!user) return <Redirect to="/" />;
                return <Profile {...props} />;
              }}/>
        <Route
         path="/admin" 
         render={props => {
                if (!user) return <Redirect to="/" />;
                return <Admin {...props} />;
              }} 
              />
        <Route 
        path="/userheader"><UserHeader/></Route>
        <Route
        path="/loginheader"><LoginHeader/></Route>
        <Route
        path="/adminheader"><AdminHeader/></Route>
        <Route exact path="/" 
                      render={props => {
                        if (!user) return <Home {...props} />;
                        return <Redirect to="/profile" />;
                      }}/>
  
        </Switch>          
      <Footer />
        </div> 

	);
}

export default App;
