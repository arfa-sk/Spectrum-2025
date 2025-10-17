import { motion, useInView } from "framer-motion"
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
  const defaultSequenceVariants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.5,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(20px)",
      y: 0,
      opacity: 0,
    },
  }

  // Use custom variants if provided, otherwise use default
  const sequenceVariants = customVariants || defaultSequenceVariants

  const isInView = useInView(timelineRef, {
    once
  })

  const MotionComponent = motion.div

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