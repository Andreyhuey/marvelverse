import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light text-light sticky-top bg-black">
      <div className="container-fluid">
        <div className="navbar-brand">
          <Link to="/" className="navbar-brand fw-bold mx-3 text-white">
            MARVEL
          </Link>
        </div>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                to="/characters"
                className="nav-link fw-bold mx-3 text-warning"
              >
                Characters
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/comics" className="nav-link fw-bold mx-3 text-primary">
                Comics
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/creators"
                className="nav-link fw-bold mx-3 text-success"
              >
                Creators
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/events" className="nav-link fw-bold mx-3 text-light">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/series" className="nav-link fw-bold mx-3 text-info">
                Series
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/stories"
                className="nav-link fw-bold mx-3 me-5 text-danger"
              >
                Stories
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
