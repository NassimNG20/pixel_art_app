// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //

// import { immer } from "zustand/middleware/immer";
// import { SetPixelsMethodsType } from "../types";

// //
// export const EventsMethods = immer(
//   (set: SetPixelsMethodsType, _get, _store): EventsMethodsTypes => {
//     return {
//       eventsMethods: {
//         setOnMouseDown: () =>
//           set((e) => {
//             e.events.canvasOnmMouseDown = true;
//           }),
//         setOnMouseUp: () =>
//           set((e) => {
//             e.events.canvasOnmMouseDown = false;
//           }),
//         setOnMouseEnter: () =>
//           set((e) => {
//             e.events.canvasOnMouseEnter = true;
//           }),
//         setOnMouseLeave: () =>
//           set((e) => {
//             e.events.canvasOnMouseEnter = false;
//           }),
//       },
//     };
//   }
// );
// //
// //
// //
// //
// export interface EventsMethodsTypes {
//   eventsMethods: {
//     setOnMouseDown: () => void;
//     setOnMouseUp: () => void;

//     setOnMouseEnter: () => void;
//     setOnMouseLeave: () => void;
//   };
// }
