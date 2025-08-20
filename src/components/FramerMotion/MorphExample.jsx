"use client";
import { motion } from "framer-motion";

export default function MorphExample() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="bg-blue-500 w-40 h-40"
        animate={{
          borderRadius: ["20%", "50%", "20%"], // morph corner radius
          rotate: [0, 180, 360], // xoay nhẹ
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
