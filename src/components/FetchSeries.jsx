// import React, { useState, useEffect } from "react";

// const FetchSeries = () => {
//   const [global, setGlobal] = useState("");
//   const [series, setSeries] = useState([]);

//   useEffect(() => {
//     fetch(
//       ""
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.data);
//         console.log(data.data.total);
//         setSeries(data.data.results);
//         setGlobal(data.data.total);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }, []);

//   return (
//     <div>
//       <div>
//         <h2>Total Series : {global}</h2>
//       </div>
//     </div>
//   );
// };

// export default FetchSeries;
