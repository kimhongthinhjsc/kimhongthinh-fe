import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2, // lần lượt ráp vào
    },
  },
};

const item = (direction) => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
    y: direction === "top" ? -100 : direction === "bottom" ? 100 : 0,
    scale: 0.5,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
});

export default function MorphExample() {
  return (
    <motion.div
      className="flex justify-center items-center gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="w-16 h-16 bg-red-400 rounded-lg"
        variants={item("left")}
      />
      <motion.div
        className="w-16 h-16 bg-blue-400 rounded-lg"
        variants={item("top")}
      />
      <motion.div
        className="w-16 h-16 bg-green-400 rounded-lg"
        variants={item("right")}
      />
      <motion.div
        className="w-16 h-16 bg-yellow-400 rounded-lg"
        variants={item("bottom")}
      />
    </motion.div>
  );
}
