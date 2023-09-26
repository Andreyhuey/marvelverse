import React from "react";
import { BsFillTriangleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { collection } from "../data";

let activeNav = {
  color: "#EF4444",
  backgroundColor: "#EF4444",
  borderLeft: "3px solid #EF4444",
  height: "100%",
  width: "100%",
};

function CollectionBar(props) {
  return (
    <div className="absolute top-[20px] left-[-180px]">
      <div className="relative w-[100%] h-full bg-black rounded-[10px] shadow-md p-8">
        <div className="flex items-start justify-start gap-4 w-full">
          <div className="grid grid-cols-2 gap-y-4 justify-center min-w-[400px]">
            {collection?.map((item, index) => (
              <>
                <NavLink
                  key={index}
                  to={`/collection/${item?.name}`}
                  reloadDocument
                  style={({ isActive }) => isActive && activeNav}
                  className="text-white"
                  onClick={props.collectionCloseHandler}
                >
                  <span className="text-[14px] font-bold leading-[40px] hover:text-[#EF4444] hover:border-l-2 hover:border-[#EF4444]  w-full hover:py-4 px-4 hover:pr-10 pl-2">
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
}

export default CollectionBar;
