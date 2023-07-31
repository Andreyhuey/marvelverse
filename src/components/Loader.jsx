import React from "react";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <BeatLoader
        color="#ffff"
        size={13}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
