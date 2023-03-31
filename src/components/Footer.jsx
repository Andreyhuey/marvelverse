import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className="container-fluid bg-black">
      <footer className="container py-4  ">
        <div className="row py-2 mt-2 text-muted">
          <div className="">
            <div className="h4 text-center text-warning">Marvel-X</div>
            <div className="h5">
              Allows users everywhere to access information about Marvel's vast
              character library from who's coming up, to 70 years ago
            </div>
          </div>
          <div className="h4 text-center pt-3">
            <div className="icons py-2">
              <a
                href="https://github.com/andreyhuey"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <FontAwesomeIcon
                  icon="fa-brands fa-github"
                  className="px-5 text-warning"
                />
              </a>

              <a
                href="https://www.linkedin.com/in/oluwadara-ola-obaado-64b5511b4"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <FontAwesomeIcon
                  icon="fa-brands fa-linkedin"
                  className="px-5 text-warning"
                />
              </a>

              <a
                href="mailto:andreyhuey777@gmail.com"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-envelope-open"
                  className="px-5 text-warning"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className="text-center">
        <a
          className="link-secondary link-center"
          href="https://marvel.com"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          Data Provided By Marvel @2022
        </a>
      </div>
      <div className="text-center pb-1">
        <b className="text-white ">
          Copyright @ 2022 All Rights Reserved by{" "}
          <a
            className="link-secondary"
            href="https://culturex.space"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            CultureX
          </a>
        </b>
      </div>
    </div>
  );
};

export default Footer;
