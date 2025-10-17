import { motion, useInView, useReducedMotion } from "framer-motion"
import type React from "react"
import type { Variants } from "framer-motion"

type TimelineContentProps = {
  children?: React.ReactNode
  animationNum: number
  className?: string
  timelineRef: React.RefObject<HTMLElement | null>
  customVariants?: Variants
  once?: boolean
} & Record<string, unknown>

export const TimelineContent = ({
  children,
  animationNum,
  timelineRef,
  className,
  customVariants,
  once = false,
  ...props
}: TimelineContentProps) => {
  const shouldReduceMotion = useReducedMotion()
  const defaultSequenceVariants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1, // even smaller delay for better responsiveness
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
    hidden: {
      filter: "blur(8px)", // reduced blur for smoother transition
      y: 30, // more noticeable movement for better visibility
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  // Use custom variants if provided, otherwise use default
  const sequenceVariants = customVariants || defaultSequenceVariants

  const isInView = useInView(timelineRef, {
    once,
    margin: "-10% 0px -10% 0px", // balanced margin for both directions
    amount: 0.2, // trigger when 20% visible for better reliability
  })

  const MotionComponent = motion.div

  // If reduced motion is enabled, show content immediately without animation
  if (shouldReduceMotion) {
    return (
      <div className={className} {...(props as Record<string, unknown>)}>
        {children}
      </div>
    )
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
  )
}