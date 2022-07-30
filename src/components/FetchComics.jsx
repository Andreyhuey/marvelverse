// import React, { useEffect, useState } from "react";

// const FetchComics = () => {
//   const [global, setGlobal] = useState("");
//   const [comics, setComics] = useState([]);
//   const [count, setCount] = useState([]);

//   useEffect(() => {
//     fetch(
//       ""
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.data.results);
//         console.log(data.data.total);
//         setComics(data.data.results);
//         setGlobal(data.data.total);
//         setCount(data.data.count);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }, []);

//   return (
//     <div className="container-fluid bg-dark text-white">
//       <div className="container-fluid border h1 py-3 mt-5 text-center text-uppercase bg-black">
//         Comics Collection
//       </div>

//       <div className="container mt-2 py-3 bg-dark ">
//         <h3 className="text-muted ">
//           Total Characters <p className="mx-2 text-info">{global}</p>
//         </h3>
//         <h4 className="text-muted">
//           Total Displayed <p className="mx-2 text-info">{count}</p>
//         </h4>
//       </div>

//       <div className="row">
//         {comics.map((c) => {
//           return (
//             <div className="col-lg-4 col-md-6 col-xs-6">
//               <div className="border border-info card my-3 bg-dark">
//                 <div key={c.id} className="p-2 my-3">
//                   <h4 className="card-header text-center text-info py-3">
//                     {c.title}
//                   </h4>
//                   <img
//                     src={c.thumbnail.path + "/standard_fantastic.jpg"}
//                     className="card-img-top"
//                     alt="...img"
//                   />
//                   <div className="card-body my-2">
//                     <span class="border-bottom border-white">
//
//                       <p className="card-text ">{HTMLReactParser(c.description)}</p>
//                     </span>
//                   </div>

//                   <ul className="list-group list-group-flush ">
//                     <li className="list-group-item bg-dark text-muted">
//                       ID : {c.id}
//                     </li>
//                     <li className="list-group-item bg-dark text-white">
//                       Stories : {c.stories["available"]}
//                     </li>

//                     <li className="list-group-item bg-dark text-white">
//                       issueNumber : {c.issueNumber}
//                     </li>

//                     <li className="list-group-item bg-dark text-white">
//                       Events : {c.events["available"]}
//                     </li>
//                   </ul>

//                   <div className="card-body text-end">
//                     <a
//                       href={c.urls[0].url}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="btn btn-outline-info"
//                     >
//                       Learn More
//                     </a>
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

// export default FetchComics;
