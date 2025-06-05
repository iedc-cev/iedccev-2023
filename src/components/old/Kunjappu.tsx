// "use client";
// import PropTypes from "prop-types";
// import React from "react";
// import { useReducer } from "react";
// import "./Kunjappu.css";
// import Image from "next/image";

// export const Group = ({ property1, smileyBoyHolding = "image.png" }) => {
//   const [state, dispatch] = useReducer(reducer, {
//     property1: property1 || "default",
//   });

//   return (
//     <div
//       className={`group ${state.property1}`}
//       onMouseLeave={() => {
//         dispatch("mouse_leave");
//       }}
//       onMouseEnter={() => {
//         dispatch("mouse_enter");
//       }}
//     >
//       {state.property1 === "default" && (
//         <img
//           className="smiley-boy-holding"
//           alt="Smiley boy holding"
//           src={smileyBoyHolding}
//         />
//       )}
//     </div>
//   );
// };

// function reducer(state, action) {
//   switch (action) {
//     case "mouse_enter":
//       return {
//         ...state,
//         property1: "variant-2",
//       };

//     case "mouse_leave":
//       return {
//         ...state,
//         property1: "default",
//       };
//   }

//   return state;
// }

// Group.propTypes = {
//   property1: PropTypes.oneOf(["variant-2", "default"]),
//   smileyBoyHolding: PropTypes.string,
// };
