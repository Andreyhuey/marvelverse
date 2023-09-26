import React from "react";
import { BsFillTriangleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { collection } from "../data";

let activeNav = {
  color: "#14744C",
  backgroundColor: "#B1FD5559",
  borderLeft: "3px solid #14744C",
  height: "100%",
  width: "100%",
};

const CollectionBar = ({ closeCollectionBar }) => {
  return (
    <div
      className="absolute top-[4.5rem] left-[-180px]"
      onMouseLeave={closeCollectionBar}
    >
      <div className="relative w-[100%] h-full bg-[#fff] rounded-[10px] shadow-md p-8">
        <span className="absolute top-[-20px] right-[34.5%]">
          {" "}
          <BsFillTriangleFill color="#fff" size={"22"} />{" "}
        </span>

        <div className="flex items-start justify-start gap-4 w-full">
          <div className="flex flex-col items-start gap-4 w-[264px]">
            {collection?.map((item, index) => (
              <>
                <NavLink
                  to={`/collection/${item?.name}`}
                  reloadDocument
                  style={({ isActive }) => isActive && activeNav}
                  className="text-[#333333]"
                >
                  <span className="text-[14px] font-bold leading-[40px] hover:text-[#14744c] hover:border-l-4 hover:border-[#14744c] hover:bg-[#B1FD5559] w-full hover:py-4 hover:pr-40 pl-2">
                    {" "}
                    {item?.name}
                  </span>
                </NavLink>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionBar;
