import { motion } from "framer-motion";

export default function FadeInWhenVisible({ children, delay = 0, direction = "up" }) {
  // Chỉnh hướng
  let initial = { opacity: 0 };
  switch (direction) {
    case "left":
      initial.x = -50; // từ trái vào
      break;
    case "right":
      initial.x = 50; // từ phải vào
      break;
    case "down":
      initial.y = -50; // từ trên xuống
      break;
    case "up":
    default:
      initial.y = 50; // từ dưới lên
      break;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
