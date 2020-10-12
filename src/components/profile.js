import React, { useEffect, useContext, useState, useRef} from 'react'
import jwtDecode from "jwt-decode"
import authContext from '../store'
import {toast} from 'react-toastify'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const Profile = () =>{
  const {state, dispatch } = useContext(authContext);


  // const token = localStorage.getItem("token");
  
    const [msg, setMsg] = useState('')
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [newDest, setNewDest] = useState('')
    const [orderId, setOrderId] = useState('')

    
    const handleShow = () =>{
      setShow(true);
       }    
  
    useEffect(()=> {   
      
     
        try {
          const jwt = localStorage.getItem("token");
          const user = jwtDecode(jwt);
          setUser( user );
          const userId = user.id
          console.log("llll", user)
          // console.log(state)
          const url ="https://send-it-app.herokuapp.com"
          
    //       dispatch({
    // type: "LOGIN_SUCCESS",
    //      });
          fetch(`${url}/order/${userId}`, {
            method: "GET",
            headers: {
              Authorization: jwt

            }
          })
            .then(res => res.json())
            .then(response => {
             if (!response.data.length) {
                setMsg("You donot have any parcel orders yet");
                // console.log(msg)
              } else {
                // response.data.sort((a, b) => a.id - b.id);
                console.log(response.data)
                setOrders(response.data );
   
              }
            })
            .catch(err => console.log(err));
        } catch (ex) {
          // this.props.history.push("/");
        };
        
      }, []);

const handleNewDest=(event)=>{
    setNewDest(event.target.value)
}
   

const handleClose = () => {
  let  newdestination = newDest
        if(newdestination !== ""){
          // setNewDest(newdestination)
        const url ="https://send-it-app.herokuapp.com"  
        fetch(`${url}/order/${orderId}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json"
          },
          
          body: JSON.stringify({
            
            destination: newdestination
          })
        })
          .then(res => res.json())
          .then(res => {
            console.log('fetched', orderId)
            if (res.success === true) {
              console.log(newDest) 
              toast.success("destination changed successfully");
              setShow(false)
              window.location = "/profile"   
              
            }
          })
          .catch(err => console.log(err));
        }
  }
// edit order
    const handleEdit = (orderValue) => {
      handleShow()
setOrderId(orderValue)
      
    };
      
      //cancelorder
  const handleCancel = (orderId) => {

        const url ="https://send-it-app.herokuapp.com"

        
        if (window.confirm("Are you sure you want to cancel this parcel Order?") === true) {
          fetch(`${url}/order/${orderId}/cancel`, {
            method: "PATCH",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
            
            })
          })
            .then(res => res.json())
            .then(data => {
              if (data.success === true) {
                window.location = "/profile";
                toast.success("parcel successfully deleted");
              }
            })
            .catch(err => console.log(err));
        } else {
          this.props.history.push("/profile");
        }
      };


    return(
    <div className="profile">
    <div className="card mb-4">
      <div className="card-header">Summary</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <h6>Number of orders: {orders.length}</h6>
        </li>
        <li className="list-group-item">
          <h6>
             Orders in transit:{" "}
            {
              orders.filter(val => val.status === "Ready-to-pickup")
                .length
            }
          </h6>
        </li>
        <li className="list-group-item">
          <h6>
            Delivered:{" "}
            {
              orders.filter(val => val.status === "Delivered")
                .length
            }
          </h6>
        </li>
        <li className="list-group-item">
          <h6>
            Cancelled Orders:{" "}
            {
              orders.filter(val => val.status === "Cancelled")
                .length
            }
          </h6>
        </li>
      </ul>
    </div>
     <table className="table table-responsive table-hover table-striped">
      <thead className="table-secondary">
        <tr>
          <th scope="col">Order ID</th>
          <th scope="col">Pickup Location</th>
          <th scope="col">Destination</th>
          <th scope="col">Recipient Name</th>
          <th scope="col">Recipient Mobile Number</th>
          <th scope="col">Current Location</th>
          <th scope="col">Order Status</th>
          <th scope="col">Edit Destination</th>
          <th scope="col">Cancel Parcel Order</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(item => (
          <tr key={item.orderId}>
            <td>{item.orderId}</td>
            <td>{item.pickup}</td>
            <td >{item.destination}</td>
            <td>{item.recName}</td>
            <td>{item.recMobileNo}</td>
            <td >{item.current_loc}</td>
            <td>{item.status}</td>
            <td className="text-center">
              <button
              className="editDest" 
              orderid="${item.orderId}"
                onClick={()=>handleEdit(item.orderId)}
                className="btn btn-secondary p-1 pl-2"
                
                disabled={(item.status === "Cancelled" || item.status === "Delivered") ? true : false}
              >
                <i className="fa fa-edit" />
              </button>
            </td>
            <td className="text-center">
              <button
                onClick={()=>handleCancel(item.orderId)}
                className="btn btn-danger p-1"
                disabled={(item.status === "Cancelled" || item.status === "Delivered") ? true : false}
              >
                <i className="fa fa-trash" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <h4 className="text-danger text-center">{msg}</h4>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter a new Destination</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <input className="modalTextInput form-control" autoFocus onChange={handleNewDest} value={newDest} name="newDest" placeholder="Enter a new Destination" autoFocus/>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </div>

    )
}

export default Profile