import React from "react";
import { useParams } from "react-router-dom";

const Collection = () => {
  const { searchTerm } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center text-[40px]">
      <p className="capitalize">{searchTerm} Collection</p>
    </div>
  );
};

export default Collection;
