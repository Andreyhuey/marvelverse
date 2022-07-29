// import React, { useState, useEffect } from "react";
// import HTMLReactParser from "html-react-parser";
// import Moment from "react-moment";
// // import "moment-timezone";

// const CharacterDetails = () => {
//   const [global, setGlobal] = useState("");
//   const [details, setDetails] = useState([]);
//   const [count, setCount] = useState("");
//   const [isLoading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     fetch(
//       `https://gateway.marvel.com/v1/public/characters/1009664/comics?orderBy=-modified&limit=100&ts=&apikey=&hash=`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.data.total);
//         setCount(data.data.count);
//         setDetails(data.data.results);
//         setGlobal(data.data.total);
//         console.log(data.data.results);
//         setLoading(false);
//       });
//   }, []);

//   if (isLoading)
//     return (
//       <h1
//         className="display-1 text-warning d-flex align-items-center justify-content-center"
//         style={{ height: "85vh" }}
//       >
//         ....Tales of Thunder
//       </h1>
//     );
//   return (
//     <div className="container-fluid bg-dark text-white py-3">
//       <div className="container-fluid h1 py-3 mt-4 bg-black border text-center text-uppercase">
//         Comic Details
//       </div>
//       <div className="container mt-2 py-3 bg-dark ">
//         <h3 className="text-muted ">
//           Total Comics <p className="mx-2 text-warning">{global}</p>
//         </h3>
//         <h4 className="text-muted">
//           Total Results <p className="mx-2 text-warning">{count}</p>
//         </h4>
//       </div>

//       <div className="container text-white">
//         {details.map((c) => {
//           return (
//             <div className="border border-white card my-3 bg-dark">
//               <div className="row">
//                 <div className="col-md-4">
//                   <img
//                     src={c.thumbnail.path + "/standard_fantastic.jpg"}
//                     className="card-img-top"
//                     alt="...img"
//                   />
//                 </div>
//                 <div className="col-md-8 py-2 px-3">
//                   <div className="card-header text-capitalize h5 text-center">
//                     {c.title}
//                   </div>
//                   <div className="">
//                     <p>{HTMLReactParser(c.description)}</p>
//                     <p className="text-muted">ID : {c.id}</p>
//                     <p>
//                       Price : <b>${c.prices[0].price}</b>
//                     </p>
//                     <p>Page Count : {c.pageCount}</p>
//                     Modified : <Moment>{c.modified}</Moment>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CharacterDetails;
