import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="p-1 bg-dark-black fixed-top mb-4">
      <div className="pt-1 d-flex justify-content-between">
        <h1 className=" text-uppercase mx-3">
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className="text-warning"
          >
            MARVEL-X
          </Link>
        </h1>

        <Link
          to="/search"
          style={{ textDecoration: "none" }}
          className="text-warning"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-search"
            // style={{ color: "white" }}
            className="display-5 me-3 text-warning"
          />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
