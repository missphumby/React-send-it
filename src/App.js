
import React, { useReducer, useEffect, useState } from 'react';
// import {Router} from 'react-router-dom';
import {BrowserRouter as Router, 
        Switch, 
        Route, 
} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import { Provider } from './store';
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
import { authreducer, initialAuthState } from './reducer/authreducers';
import jwtDecode from 'jwt-decode'
// import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const ContentRoutes =()=>{
        return(
<Switch>
       <Route
         path="/register"><Register/></Route>
        <Route
        path="/login"><Login/></Route>
        <Route
        path="/createOrder"><CreateOrder/></Route>
        <Route
        path="/profile"><Profile/></Route>
        <Route
         path="/admin"><Admin/></Route>
        <Home exact path='/' />
        <Route
        path="/userheader"><UserHeader/></Route>
        <Route
        path="/loginheader"><LoginHeader/></Route>
        <Route
        path="/adminheader"><AdminHeader/></Route>
     
        </Switch>          
        )
}

function App() {
const [user, setUser] = useState('')
        useEffect(()=> {   
               try{ const jwt = localStorage.getItem("token");
                const user = jwtDecode(jwt);
                setUser( user );
                console.log(user)
        }catch(ex){}
        },[])
      

        const [state, dispatch] = useReducer(authreducer, initialAuthState);
	return (
      <Provider value={{state, dispatch}}>
     <ToastContainer/>
      <Router > 
      {/* <Header /> */}
      <div className="App">{(!user) ? <LoginHeader /> : <UserHeader user={user} />}</div>
      <ContentRoutes />
      <Footer />
      </Router>
      
      </Provider>
	);
}

export default App;

