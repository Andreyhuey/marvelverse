import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <section className="bg-dark vh-100 d-flex align-items-center justify-content-center">
        <div className="">
          <div className="p-3">
            <Link
              to={`/characters`}
              style={{ "text-decoration": "none" }}
              className="text-warning fw-bold text-uppercase"
            >
              Characters
            </Link>
          </div>
          <div className="p-3">
            <Link
              to={`/comics`}
              style={{ "text-decoration": "none" }}
              className="text-primary fw-bold text-uppercase"
            >
              Comics
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
