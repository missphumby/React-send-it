import React, { useEffect, useContext, useState } from 'react'
import jwtDecode from "jwt-decode"
import authContext from '../store'
import { toast } from 'react-toastify'
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
// import FormGroup from "react-bootstrap/Form"
// import ControlLabel from "react-bootstrap/Form"
// import FormControl from "react-bootstrap/Form"
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown'
import Select from "react-select";
import styled from "styled-components";



const Admin = () => {
    const { state, dispatch } = useContext(authContext);

    // const token = localStorage.getItem("token");

    const [msg, setMsg] = useState('')
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false)
    const [newLoc, setNewLoc] = useState('')
    const [newStat, setNewStat] = useState('')
    const [showed, setShowed] = useState(false)
      const [isOpen, setIsopen] = useState(false)
      const [option, setOption] = useState('')
      const [orderId, setOrderId] = useState('')
const [selected, setSelected] = useState(false)


    const handleClose = () => {
        if(newLoc !== ""){
            // handleNewLoc()
        const url = "https://send-it-app.herokuapp.com"
        //  const newlocation = window.prompt("Enter new Destination address")

        fetch(`${url}/order/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },

            body: JSON.stringify({
                current_loc: newLoc
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log('fetched', orderId)
                if (res.success === true) {
                    // console.log(newLoc)
                    toast.success("locaation changed successfully");
                    setShow(false)
                    window.location = "/admin"                   
                }
            })
            .catch(err => console.log(err));
          }

    }
                            //    window.location.reload()
    const handleShow = () => setShow(true)

    
    const handleShowed = () => setShowed(true);

    const handleNewLoc = (event) => {
        setNewLoc(event.target.value)
    };
    const handleNewStat = (event) => {
        setNewStat(event.target.value)
    }

    const toggleOpen = () =>setIsopen(!isOpen);
      
    
   const   onSelectChange = (option) => {
        setIsopen( !isOpen )
        setOption(option);
        setNewStat(option)
        setSelected(true)
      };


    useEffect(() => {


        try {
            const jwt = localStorage.getItem("token");
            const user = jwtDecode(jwt);
            setUser(user);
            const userId = user.id
            console.log("llll", user)
            console.log(state)
            const url = "https://send-it-app.herokuapp.com"

            //       dispatch({
            // type: "LOGIN_SUCCESS",
            //      });
            fetch(`${url}/order`, {
                method: "GET",
                headers: {
                    Authorization: jwt

                }
            })
                .then(res => res.json())
                .then(response => {
                    if (!response.data.length) {
                        setMsg("There are no pending orders");
                        console.log(msg)
                    } else {
                        // response.data.sort((a, b) => a.id - b.id);
                        console.log(response.data)
                        setOrders(response.data);

                    }
                })
                .catch(err => console.log(err));
        } catch (ex) {
            // this.props.history.push("/");
        }
    }, []);



    // edit new loc
    const handleEdit = (orderValue) => {
        handleShow()
        setOrderId(orderValue);
    };

    // edit status
    const handleStatusEdit = (orderValue) => {
        handleShowed()
        setOrderId(orderValue)
    };

   const statusoptions=[ {value: 'In-transit', label: "In-transit"}, {value: 'Delivered', label: "Delivered"}, {value: 'Cancelled',  label: "Cancelled"}]

    //cancelorder
    const handleCancel = (orderId) => {

        const url = "https://send-it-app.herokuapp.com"


        if (window.confirm("Are you sure you want to remove this parcel Order?") === true) {
            fetch(`${url}/order/${orderId}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success === true) {
                        window.location = "/admin";
                        toast.success("parcel successfully deleted");
                    } else if (data.error) {
                        console.log(data.error)
                    }
                })
                .catch(err => console.log(err));
        } else {
            this.props.history.push("/admin");
        }
    };

    const MainButton = styled.button`
  padding: 10px;
  background-color: aqua;
  width: 50%;
`;

const Dropdown = ({ children, target }) => (
  <div>
    {target}
    {children}
  </div>
);

const handleClosed = () => {
    if(Select){
        const url = "https://send-it-app.herokuapp.com"
        //    const newlocation = window.prompt("Enter new Destination address");   
        fetch(`${url}/order/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },

            body: JSON.stringify({
                status: option.value
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log('fetched', orderId)
                if (res.success === true) {
                    console.log(newStat)
                    toast.success("status changed successfully");
                    setShowed(false)
                    window.location = "/admin"
                }
            })
            .catch(err => console.log(err));
        }
};

    return (
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
                            <td>{item.destination}</td>
                            <td>{item.recName}</td>
                            <td>{item.recMobileNo}</td>
                            <td>{item.current_loc}</td>
                            <td>{item.status}<span><button
                                className="btn btn-primary"
                                onClick={()=>handleStatusEdit(item.orderId)}>
                                <i className="fa fa-pencil"></i></button> </span></td>
                            <td className="text-center">
                                <button
                                    onClick={() => handleEdit(item.orderId)}
                                    className="btn btn-secondary p-1 pl-2"

                                    disabled={item.status === "Cancelled" ? true : false}
                                >
                                    <i className="fa fa-edit" />
                                </button>
                            </td>
                            <td className="text-center">
                                <button
                                    onClick={() => handleCancel(item.orderId)}
                                    className="btn btn-danger p-1"
                                    disabled={item.status === "Cancelled" ? true : false}
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
          <Modal.Title>Edit Current Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className="modalTextInput form-control" onChange={handleNewLoc} value={newLoc} name="newDest" placeholder="Enter a new Destination" autoFocus/>
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
            <Modal show={showed} onHide={handleClosed}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Current status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Dropdown
        target={
          <MainButton onClick={toggleOpen}>
            {option ? option.label : "Select a Status"}
          </MainButton>
        }
      >
        {isOpen && (
          <Select
            autoFocus
            menuIsOpen
            onChange={onSelectChange}
            options={statusoptions}
            value={option}
            controlShouldRenderValue={true}
          />
        )}
      </Dropdown>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosed}>
                        Close
          </Button>
                    <Button variant="primary" onClick={handleClosed}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>

        </div>

    )

        }
export default Admin