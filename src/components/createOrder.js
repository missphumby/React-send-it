
import React, { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";





const google = window.google ? window.google : {}

const CreateOrder = () =>{

  // const  {dispatch}  = React.useContext(authContext);

  const initialState = {
      pickup: "",
      destination: "",
      recName: "",
      recMobileNo: "",
      isSubmitting: false,
      errorMessage: null,
       };
  const [data, setData] = React.useState(initialState);


  useEffect( ()=> {
 
    let    autocomplete = new google.maps.places.Autocomplete(
          (document.getElementById('pickup')),
  
          { types: ['geocode']});
  
  
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
  
        fillInAddress(autocomplete);
  
      });
  
      let autocomplete2 = new 
  
    google.maps.places.Autocomplete(document.getElementById('destination'), { 
    types: [ 'geocode' ] });
  
      google.maps.event.addListener(autocomplete2, 'place_changed', function() {
  
        fillInAddress(autocomplete2);
  
      });
      const fillInAddress=()=>{
        setData({...data, pickup: document.getElementById("pickup").value, destination: document.getElementById('destination').value});
      }
   
          },[]);
  
   const handleChange = event => {
    setData({
      ...data,
     [event.target.name]: event.target.value
    })
      };
      const handleSubmit = event => {
        const url ="https://send-it-app.herokuapp.com"
      event.preventDefault();
      const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    const userId = user.id;

      setData({
        ...data,
        isSubmitting: true,
        errorMessage: null
      });
      fetch(`${url}/order`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt
        },
        body: JSON.stringify({
          userId,
          pickup: data.pickup,
          destination: data.destination,
          recName: data.recName,
          recMobileNo: data.recMobileNo
        }),
      })
      .then(res=> res.json())
        .then(res => {
          console.log(res)
          // dispatch({
          //   type: 'LOGIN',
          //   payload: res
          // })
          if (res.data) {
            toast.success("parcel created successfully!");
            localStorage.setItem("orderId", res.data.orderId)
            console.log(res.data.orderId)
            window.location = "/profile";
            
          } else if (res.error) {
            console.log(res.error);
          }            })
        .catch(error => {
          console.log(error)
          
        })
      }

    return (<div>        
      <form onSubmit={handleSubmit} className="orderForm">
        <h1>Create Order</h1>
        <div className="form-group">
          <label htmlFor="pickup">Pickup Location</label>
          <input
            autoFocus
            defaultValue={data.pickup}
            onChange={handleChange}
            placeholder="Enter a location"
            name="pickup"
            id="pickup"
            type="text"
            className="form-control"
            id="pickup"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input
            value={data.destination}
            onChange={handleChange}
            placeholder="Enter a destination"
            name="destination"
            type="text"
            className="form-control"
            id="destination"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipName">Recipient Name</label>
          <input
            value={data.recName}
            onChange={handleChange}
            name="recName"
            type="text"
            className="form-control"
            id="recName"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipNum">Recipient Mobile Number</label>
          <input
            value={data.recMobileNo}
            onChange={handleChange}
            name="recMobileNo"
            type="tel"
            className="form-control"
            id="recMobileNo"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
      </div>

    );
  }


export default CreateOrder;