import React, { useEffect } from "react";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  useEffect(() => {
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="h-screen py-10 flex items-center justify-center bg-black">
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
