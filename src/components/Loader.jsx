import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div
      className="loader"
      style={{
        height: "75vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></div>
  );
};

export default Loader;
