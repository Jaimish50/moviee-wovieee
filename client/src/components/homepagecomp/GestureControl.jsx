// import { Hands } from "@mediapipe/hands";
// import {Camera} from "@mediapipe/camera_utils";
// import Webcam from "react-webcam";
// import * as tf from "@tensorflow/tfjs";
// import { useEffect, useRef } from "react";

// export default function GestureControl({ onSwipe }) {
//   const webcamRef = useRef(null);
//   const prevX = useRef(null);

//   useEffect(() => {
//     const hands = new Hands({
//       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
//     });

//     hands.setOptions({
//       maxNumHands: 1,
//       modelComplexity: 0,
//       minDetectionConfidence: 0.5,
//       minTrackingConfidence: 0.5,
//     });
//     function isOpenPalm(landmarks) {
//   // Landmark indexes:
//   // Thumb: tip(4), lower joint(3)
//   // Index: tip(8), lower joint(6)
//   // Middle: tip(12), lower joint(10)
//   // Ring: tip(16), lower joint(14)
//   // Pinky: tip(20), lower joint(18)

//   // For each finger, check if tip is “above” lower joint (assuming y=0 top)
//   const fingersExtended = [
//     // landmarks[4].x < landmarks[3].x,   // Thumb usually points sideways, check x instead of y
//     landmarks[8].y < landmarks[6].y
//     // landmarks[12].y < landmarks[10].y,
//     // landmarks[16].y < landmarks[14].y,
//     // landmarks[20].y < landmarks[18].y,
//   ];

//   // Return true if all fingers extended
//   return fingersExtended.every(Boolean);
// }

// // In your onResults handler:
// hands.onResults((results) => {
//   if (results.multiHandLandmarks.length > 0) {
//     const landmarks = results.multiHandLandmarks[0];

//     if (isOpenPalm(landmarks)) {
//       console.log("Open Palm detected!");
//       onSwipe('right', 200);
//     }
//   }
// });

// //     hands.onResults((results) => {
// //     //   if (results.multiHandLandmarks.length > 0) {
// //     //     const landmarks = results.multiHandLandmarks[0];
// //     //     const palmX = landmarks[0].x;

// //     //     if (prevX.current !== null) {
// //     //       const diff = palmX - prevX.current;

// //     //       if (diff > 0.05) {
// //     //         onSwipe("right");
// //     //       } else if (diff < -0.05) {
// //     //         onSwipe("left");
// //     //       }
// //     //     }

// //     //     prevX.current = palmX;
// //     //   }
// //       if (results.multiHandLandmarks.length > 0) {
// //         const landmarks = results.multiHandLandmarks[0];

// //     // Get two fingers positions
// //         const indexFinger = landmarks[8].y;
// //         if(prevX.current != null){
// //             if(indexFinger - prevX.current > 0){
// //                 onSwipe('right', 300);
// //             }else{
// //                 onSwipe('right', -300);
// //             }
// //         }

// //         prevX.current = indexFinger


// //     // const middleFinger = landmarks[12];
// //     // const palmCenter = landmarks[0];

// //     // Calculate distance between index & middle finger tips (normalized 0 to 1)
// //     // const dist = Math.sqrt(
// //     //   (indexFinger.x - middleFinger.x) ** 2 +
// //     //   (indexFinger.y - middleFinger.y) ** 2
// //     // );

// //     // Calculate horizontal offset from palm center (for scroll direction and amount)
// //     // const offsetX = ((indexFinger.x + middleFinger.x) / 2) - palmCenter.x;

// //     // // Decide scroll amount based on offsetX and distance
// //     // // For example:
// //     // const SCROLL_FACTOR = 1000; // tweak this for scroll speed

// //     // const scrollAmount = offsetX * dist * SCROLL_FACTOR;

// //     // // Call your onScroll callback with scrollAmount
// //     // onSwipe(scrollAmount > 0 ? "right" : "left", Math.abs(scrollAmount));
// //   }
// //     });

//     if (webcamRef.current) {
//       const camera = new Camera(webcamRef.current.video, {
//         onFrame: async () => {
//           await hands.send({ image: webcamRef.current.video });
//         },
//         width: 1200,
//         height: 800,
//       });

//       camera.start();
//     }
//   }, [onSwipe]);

//   return <Webcam ref={webcamRef} style={{ display: "none" }} />;
// }




// import { useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import socket from "./Socket";

// export default function GestureControl({ onSwipe }) {
//   useEffect(() => {
//     if (!socket.connected) {
//       socket.connect();
//     }

//     socket.on("connect", () => {
     
//     });

//     socket.on("gesture", (data) => {
      
//       onSwipe(data.dir);
//     });

//     return () => {
//       socket.off("gesture"); // remove only specific listener
//     };
//   }, []);

//   return null;
// }
