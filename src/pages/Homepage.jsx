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
          <div className="p-3">
            <Link
              to={`/creators`}
              style={{ "text-decoration": "none" }}
              className="text-success fw-bold text-uppercase"
            >
              Creators
            </Link>
          </div>
          <div className="p-3">
            <Link
              to={`/events`}
              style={{ "text-decoration": "none" }}
              className="text-light fw-bold text-uppercase"
            >
              Events
            </Link>
          </div>
          <div className="p-3">
            <Link
              to={`/series`}
              style={{ "text-decoration": "none" }}
              className="text-info fw-bold text-uppercase"
            >
              Series
            </Link>
          </div>
          <div className="p-3">
            <Link
              to={`/stories`}
              style={{ "text-decoration": "none" }}
              className="text-danger fw-bold text-uppercase"
            >
              Stories
            </Link>
          </div>
          <div className="p-3">
            <Link
              to={`/test`}
              style={{ "text-decoration": "none" }}
              className="text-secondary fw-bold text-uppercase"
            >
              Test Page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
