import React, { useRef, useState, useEffect } from "react";
import socket from "../homepagecomp/Socket";

export default function DrawCircle({handleStartDrawing, handleStopDrawing, drawing, setDrawing}){
const canvasRef = useRef(null);
    const pointsRef = useRef([]);
    debugger

    useEffect(() => {
        if (!socket.connected) socket.connect();

        socket.emit("join_room", { room: "streaming" });
        socket.emit("set_mode", { mode: "draw" });
        console.log("i am in useefect");

        socket.on("gesture", (data) => {
            console.log("hello gesture event executed");
            debugger
            console.log("drwaing is :",drawing);
            if (data.type === "draw" && canvasRef.current ) {
                const ctx = canvasRef.current.getContext("2d");
                const newPoint = data.point;

                const lastPoint = pointsRef.current[pointsRef.current.length - 1];
                pointsRef.current.push(newPoint);

                if(data.stop) lastPoint = [];

                if (lastPoint) {
                    ctx.beginPath();
                    ctx.moveTo(lastPoint[0], lastPoint[1]);
                    ctx.lineTo(newPoint[0], newPoint[1]);
                    ctx.strokeStyle = "white";
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    ctx.closePath();
                } else {
                    // Start point (draw a dot)
                    ctx.beginPath();
                    ctx.arc(newPoint[0], newPoint[1], 2, 0, 2 * Math.PI);
                    ctx.fillStyle = "#00ff00";
                    ctx.fill();
                    ctx.closePath();
                }

                console.log("Frame point drawn:", newPoint);
            }else if(!drawing){
                console.log("⛔ Ignoring point because drawing is OFF");
            }else if(data.type === "scroll"){
                console.log("Data type is scroll");
            }else{
                console.log("canvasRef is not initialized");
            }
        });

        return () => {
            socket.off("gesture");
        };
    }, []);

    handleStartDrawing.current = () => {
        debugger
        pointsRef.current = [];

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        console.log("drwaing is started ")

        setDrawing(true);
        debugger
    };

    handleStopDrawing.current = () => {
        debugger
        setDrawing(false);
        console.log("Drawing finished. Points:", pointsRef.current);
        debugger
        // Send to backend for processing, if needed
    };

    return (
        <div className="draw-circle" style={{position: "relative"}}>
            <canvas
                ref={canvasRef}
                width={1180}
                height={600}
                style={{ 
                    position: "absolute",
                    
                }}
            />
            
        </div>
    );

}