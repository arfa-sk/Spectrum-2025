import { motion, useInView, useReducedMotion } from "framer-motion";
import type React from "react";
import type { Variants } from "framer-motion";

type TimelineContentProps = {
  children?: React.ReactNode;
  animationNum: number;
  className?: string;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
  once?: boolean;
} & Record<string, unknown>;

export const TimelineContent = ({
  children,
  animationNum,
  timelineRef,
  className,
  customVariants,
  once = false,
  ...props
}: TimelineContentProps) => {
  const shouldReduceMotion = useReducedMotion();

  const staggerDelay = 0.05;
  const defaultSequenceVariants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      y: 0,
      opacity: 1,
      transition: {
        delay: i * staggerDelay,
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
    hidden: {
      filter: "blur(6px)",
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const sequenceVariants = customVariants || defaultSequenceVariants;

  const isInView = useInView(timelineRef, {
    once,
    margin: "-5% 0px -5% 0px",
    amount: 0.15,
  });

  const MotionComponent = motion.div;

  if (shouldReduceMotion) {
    return (
      <div className={className} {...(props as Record<string, unknown>)}>
        {children}
      </div>
    );
  }

  return (
    <MotionComponent
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={sequenceVariants}
      className={className}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </MotionComponent>
  );
};