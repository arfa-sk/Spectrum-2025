"use client";
import { useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useMemo, useCallback } from "react";
import { motion, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const ParallaxScrollSecond = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Ultra-smooth scroll tracking with optimized performance
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start start", "end end"],
  });

  // Ultra-smooth spring config for zero lag
  const springConfig = { 
    stiffness: 200, 
    damping: 40, 
    restDelta: 0.0001,
    mass: 0.8
  };
  
  // Motion values for ultra-smooth transforms with optimized range
  const translateYFirst = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -600]),
    springConfig
  );
  const translateXFirst = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -200]),
    springConfig
  );
  const rotateXFirst = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -20]),
    springConfig
  );

  const translateYSecond = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -300]),
    springConfig
  );

  const translateYThird = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -600]),
    springConfig
  );
  const translateXThird = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 200]),
    springConfig
  );
  const rotateXThird = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 20]),
    springConfig
  );

  // Memoize image splitting for better performance
  const imageParts = useMemo(() => {
    const third = Math.ceil(images.length / 3);
    return {
      first: images.slice(0, third),
      second: images.slice(third, 2 * third),
      third: images.slice(2 * third),
    };
  }, [images]);

  return (
    <div
      className={cn("h-[80rem] w-full overflow-hidden", className)}
      ref={gridRef}
      style={{ 
        contain: "layout style paint",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: "1000px"
      }}
    >
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-7xl mx-auto gap-6 py-20 px-4"
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden"
        }}
      >
        {/* First Column - Left movement */}
        <div className="grid gap-6">
          {imageParts.first.map((el, idx) => (
            <motion.div
              style={{
                y: translateYFirst,
                x: translateXFirst,
                rotateZ: rotateXFirst,
                transformOrigin: "center center",
                transformStyle: "preserve-3d"
              }}
              key={`grid-1-${idx}`}
              className="will-change-transform"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: idx * 0.1,
                ease: "easeOut"
              }}
            >
              <div 
                className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 ease-out group"
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden"
                }}
              >
                <Image
                  src={el}
                  className="h-80 w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                  height="400"
                  width="400"
                  alt={`Gallery image ${idx + 1}`}
                  priority={idx < 3}
                  loading={idx < 3 ? "eager" : "lazy"}
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second Column - Static with subtle movement */}
        <div className="grid gap-6">
          {imageParts.second.map((el, idx) => (
            <motion.div
              style={{
                y: translateYSecond,
                transformOrigin: "center center",
                transformStyle: "preserve-3d"
              }}
              key={`grid-2-${idx}`}
              className="will-change-transform"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: idx * 0.1 + 0.2,
                ease: "easeOut"
              }}
            >
              <div 
                className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 ease-out group"
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden"
                }}
              >
                <Image
                  src={el}
                  className="h-80 w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                  height="400"
                  width="400"
                  alt={`Gallery image ${imageParts.first.length + idx + 1}`}
                  priority={idx < 3}
                  loading={idx < 3 ? "eager" : "lazy"}
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Third Column - Right movement */}
        <div className="grid gap-6">
          {imageParts.third.map((el, idx) => (
            <motion.div
              style={{
                y: translateYThird,
                x: translateXThird,
                rotateZ: rotateXThird,
                transformOrigin: "center center",
                transformStyle: "preserve-3d"
              }}
              key={`grid-3-${idx}`}
              className="will-change-transform"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: idx * 0.1 + 0.4,
                ease: "easeOut"
              }}
            >
              <div 
                className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 ease-out group"
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden"
                }}
              >
                <Image
                  src={el}
                  className="h-80 w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                  height="400"
                  width="400"
                  alt={`Gallery image ${imageParts.first.length + imageParts.second.length + idx + 1}`}
                  priority={idx < 3}
                  loading={idx < 3 ? "eager" : "lazy"}
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
