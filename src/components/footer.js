import React from "react";
import { Link } from "react-router-dom";
import footerLogo from '../assets/footerlogo.png'
const Footer = () => {
  return (
    <div className="bg-dark text-light" style={{height: '200px'}}>
      <footer className="container py-5">
        <div className="row">
          <div className="col-12 col-md">
            <img src={footerLogo} width="30" height="40" className="App-logo" alt="" />
            <small className="d-block mb-3 text-light">Copyright &copy; 2019. <br></br>Developed by Funby!</small>
          </div>
          <div className="col-6 col-md">
            <h5>About Us</h5>
            <ul className="list-unstyled text-small">
              <li>
                <Link className="text-light" to="#">
                  SendIT is a parcel/courier service that delivers orders
                  perfectly with utmost speed
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Office Address</h5>
            <ul className="list-unstyled text-small">
              <li>
                <Link className="text-light" to="#">
                  Victoria Island, Lagos State Nigeria
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Working Hours</h5>
            <ul className="list-unstyled text-small">
              <li>
                <Link className="text-light" to="#">
                  Weekdays: 8am - 6pm
                </Link>
              </li>
              <li>
                <Link className="text-light" to="#">
                  Weekends: 10am - 4pm
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>More Info</h5>
            <ul className="list-unstyled text-small">
              <li>
                <Link className="text-light" to="#">
                  Team
                </Link>
              </li>
              <li>
                <Link className="text-light" to="#">
                  Locations
                </Link>
              </li>
              <li>
                <Link className="text-light" to="#">
                  Privacy
                </Link>
              </li>
              <li>
                <Link className="text-light" to="#">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;