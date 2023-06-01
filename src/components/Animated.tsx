import { motion } from "framer-motion";

export type AnimatedProps = {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
};

export const Animated: React.FC<AnimatedProps> = ({
  children,
  className,
  delay,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, translateY: 16, rotateX: "15deg" }}
      animate={{ opacity: 1, translateY: 0, rotateX: "0deg" }}
      transition={{
        type: "spring",
        delay,
        bounce: 0,
        damping: 300,
        stiffness: 3000,
      }}
    >
      {children}
    </motion.div>
  );
};
