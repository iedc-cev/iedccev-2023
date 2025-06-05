"use client";
import { useEffect } from "react";
import gsap from "gsap";
import "./Cursor.css";

import React, { ReactNode } from "react";

interface CursorProps {
  children: ReactNode;
}

const Cursor = ({ children }: CursorProps) => {
  useEffect(() => {
    const handleMouseMove = (evt: { clientX: any; clientY: any }) => {
      const mouseX = evt.clientX;
      const mouseY = evt.clientY;

      gsap.set(".cursor", {
        x: mouseX,
        y: mouseY,
      });

      gsap.to(".shape", {
        x: mouseX,
        y: mouseY,
        stagger: -0.1,
      });
    };

    document.body.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div>
      <div className="cursor"></div>
      <div className="shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="content">
        {children}
        {/* <h1>Hello there!</h1> */}
      </div>
    </div>
  );
};

export default Cursor;
