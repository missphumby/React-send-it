import React from "react";
import { Link } from "react-router-dom";
import banner1 from '../assets/banner-1.jpg'
import banner2 from '../assets/banner-2.jpg'
import banner3 from '../assets/banner-3.jpg'

const Home = () => {
  
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
        <li data-target="#carouselExampleIndicators" data-slide-to="1" />
        <li data-target="#carouselExampleIndicators" data-slide-to="2" />
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src={banner1}
            alt="First slide"
          />
          <div className="carousel-caption d-md-block">
            <h1 className="font-weight-bold">
              Building a stressless World through Speedy and Perfect Delivery..
            </h1>
            <p>
              <Link
                to="/register"
                className="btn btn-primary bg-danger border-0 p-2"
              >
                Get Started
              </Link>
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={banner2}
            alt="Second slide"
          />
          <div className="carousel-caption d-md-block">
            <h1 className="font-weight-bold">
              Building a stressless World through Speedy and Perfect Delivery..
            </h1>
            <p>
              <Link
                to="/register"
                className="btn btn-primary bg-danger border-0 p-2"
              >
                Get Started
              </Link>
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={banner3}
            alt="Third slide"
          />
          <div className="carousel-caption d-md-block">
            <h1 className="font-weight-bold">
              Building a stressless World through Speedy and Perfect Delivery..
            </h1>
            <p>
              <Link
                to="/register"
                className="btn btn-primary bg-danger border-0 p-2"
              >
                Get Started
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home
