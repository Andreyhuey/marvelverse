// import React, { useState, useEffect } from "react";

// const FetchEvents = () => {
//   const [global, setGlobal] = useState("");
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetch(
//       ""
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.data);
//         console.log(data.data.total);
//         setEvents(data.data.results);
//         setGlobal(data.data.total);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }, []);

//   return (
//     <div>
//       <div>
//         <h2>Total Events : {global}</h2>
//       </div>
//     </div>
//   );
// };

// export default FetchEvents;
