import React from "react";
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
    <div className="absolute top-[20px] lg:left-[-180px] md:right-[-185px]">
      <div className="relative">
        <div className="flex items-start justify-start">
          <div className="grid grid-cols-3 gap-y-4 justify-center md:min-w-[600px] lg:min-w-[800px] bg-black p-4  rounded-[10px] shadow-md">
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
