// import React, { useState, useEffect } from "react";

// const FetchStories = () => {
//   const [global, setGlobal] = useState("");
//   const [count, setCount] = useState("");
//   const [stories, setStories] = useState([]);

//   useEffect(() => {
//     fetch("")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.data);
//         console.log(data.data.total);
//         setStories(data.data.results);
//         setGlobal(data.data.total);
//         setCount(data.data.count);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }, []);

//   return (
//     <div className="container-fluid bg-dark text-white">
//       <div className="container-fluid h1 py-3 mt-4 border bg-black text-center text-uppercase">
//         Stories Collection
//       </div>
//       <div className="container mt-2 py-3 bg-dark">
//         <h3 className="text-muted ">
//           Total Stories <p className="mx-2 text-primary">{global}</p>
//         </h3>
//         <h4 className="text-muted">
//           Total Displayed <p className="mx-2 text-primary">{count}</p>
//         </h4>
//       </div>

//       <div className=" row">
//         {stories.map((s) => {
//           return (
//             <div className="col-lg-4 col-md-6 col-xs-6">
//               <div className="border border-primary card my-3 bg-dark">
//                 <div key={s.id} className="p-2 my-3">
//                   <h4 className="card-header text-center text-primary py-3">
//                     {s.originalIssue.name}
//                   </h4>

//                   <div className="card-body my-2">
//                     <h4 className="card-title text-muted">Description </h4>
//                     <p className="card-text">{s.title}</p>
//                   </div>

//                   <ul className="list-group list-group-flush ">
//                     <li className="list-group-item bg-dark text-muted ">
//                       ID : {s.id}
//                     </li>
//                     <li className="list-group-item bg-dark text-white">
//                       Series : {s.series["available"]}
//                     </li>
//                     <li className="list-group-item bg-dark text-white">
//                       Comics : {s.comics["available"]}
//                     </li>
//                     <li className="list-group-item bg-dark text-white">
//                       Creators : {s.creators["available"]}
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

// export default FetchStories;
