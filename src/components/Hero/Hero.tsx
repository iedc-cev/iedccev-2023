"use client";
import React from "react";
// import HeroImg from "../HeroImg";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

function Hero() {
  const up = {
    animate: {
      y: [0, -2400],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 50,
          ease: "linear",
        },
      },
    },
  };
  const down = {
    animate: {
      y: [-2400, 0],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 50,
          ease: "linear",
        },
      },
    },
  };
  return (
    <div className="flex w-screen h-screen justify-between ">
      <div className="absolute w-screen h-screen -z-10 ">
        <Image
          src="/assets/Section.png"
          fill
          className="w-full h-full object-cover"
          alt="img"
        />
      </div>
      {/* Mobile */}
      <div className="flex flex-col justify-center lg:hidden items-center">
        <h1>IEDC CEV</h1>

        <Link href="/join" className="bg-purple-400 rounded-sm w-fit px-7 py-2">
          Join Us
        </Link>
      </div>

      <div className="hidden mr-16 ml-20 lg:flex h-full flex-col justify-center gap-4 z-10">
        <h1 className="text-5xl font-semibold text-white"> Innovation and Entrepreneurship Development Centres</h1>
        <p className="overflow-clip w-[40vw] text-white">
         College of Engineering Vadakara
        </p>
        <Link href="/join" className="bg-blue-400 rounded-sm w-fit px-7 py-2">
          Join Us
        </Link>
      </div>
      {/* <div className="w-full hidden lg:opacity-100 opacity-0 gap-3 mx-10  overflow-hidden   lg:flex justify-end flex-wrap  ">
        <motion.div
          variants={up}
          animate="animate"
          className="relative w-96 -top-16 flex flex-col gap-3 flex-nowrap"
        >
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
        </motion.div>
        <motion.div
          variants={down}
          animate="animate"
          className="relative w-96 flex  flex-col gap-3"
        >
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
          <HeroImg />
        </motion.div>
      </div> */}
    </div>
  );
}

export default Hero;
