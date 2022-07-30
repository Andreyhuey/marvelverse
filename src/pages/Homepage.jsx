// import React, { useEffect, useState } from "react";
// import { Card, Row, Col, Input } from "antd";

// // import { useGetCharactersQuery } from "../services/CharacterApi";

// const Homepage = () => {
//   const [result] = useState("");
//   const [characters, setCharacters] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [count, setCount] = useState("");
//   const [isLoading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(
//       ""
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.data.total);
//         setCount(data.data.total);
//         const Results = data.data.results;
//         console.log(Results);

//         setCharacters(Results);

//         setLoading(true);
//         const filteredData = Results?.filter((character) =>
//           character?.name?.toLowerCase()?.includes(searchTerm)
//         );
//         setCharacters(filteredData);
//         console.log(filteredData);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }, [searchTerm]);

//   if (isLoading)
//     return (
//       <p
//         style={{ height: "80vh" }}
//         className="text-warning display-1 text-uppercase d-flex align-items-center justify-content-center"
//       >
//         ...loading
//       </p>
//     );

//   return (
//     <div className="container text-white">
//       <div className="text-warning text-center">Total Characters : {count}</div>

//       <div className="d-flex justify-content-center text-white my-2 py-2">
//         <Input
//           placeholder="Search Characters"
//           type="text"
//           onChange={(e) => setSearchTerm(e.target.value?.toLowerCase())}

//           // onChange={}
//         />
//       </div>
//       <div className="row">
//         {characters.map((c) => {
//           return (
//             <div key={c.id} className="col-lg-4 col-md-6 col-xs-6">
//               <div className="border border-warning card my-3 bg-dark">
//                 <div className="p-2 my-3">
//                   <h4 className="card-header text-center text-warning py-3">
//                     {c.name}
//                   </h4>
//                   <img
//                     src={c.thumbnail.path + "/standard_fantastic.jpg"}
//                     className="card-img-top"
//                     alt="...img"
//                   />
//                   <div className="card-body my-2">
//                     <span className="border-bottom border-white">
//
//                       <p className="card-text text-white">{HTMLReactParser(c.description)}</p>
//                     </span>
//                   </div>

//                   <ul className="list-group list-group-flush ">
//                     <li className="list-group-item bg-dark text-muted">
//                       ID : {c.id}
//                     </li>
//                     <li className="list-group-item bg-dark text-white">
//                       Modified : {c.modified}
//                     </li>

//                     <li className="list-group-item bg-dark text-white">
//                       Stories : {c.stories["available"]}
//                     </li>
//                     <li className="list-group-item bg-dark text-white">
//                       Series : {c.series["available"]}
//                     </li>
//                     <li className="list-group-item bg-dark text-white">
//                       Comics : {c.comics["available"]}
//                     </li>

//                     <li className="list-group-item bg-dark text-white">
//                       Events : {c.events["available"]}
//                     </li>
//                     <li className="list-group-item bg-dark text-warning text-capitalize d-flex justify-content-between pt-4">
//                       <a
//                         href={c.urls[1].url}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="btn btn-outline-warning text-capitalize"
//                       >
//                         {c.urls[1].type}
//                       </a>

//                       <a
//                         href={c.urls[0].url}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="btn btn-outline-warning"
//                       >
//                         {c.urls[0].type}
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Homepage;
