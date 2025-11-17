"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useMemo, memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const ParallaxScrollSecond = memo(({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Optimized scroll tracking - use direct transform instead of spring for smoother performance
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start start", "end end"],
  });

  // Simplified transforms - direct transform is faster than spring for scroll
  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const translateXFirst = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotateXFirst = useTransform(scrollYProgress, [0, 1], [0, -15]);

  const translateYSecond = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const translateYThird = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const translateXThird = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotateXThird = useTransform(scrollYProgress, [0, 1], [0, 15]);

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
        willChange: "scroll-position"
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
              }}
              key={`grid-1-${idx}`}
              className="will-change-transform"
            >
              <div 
                className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden"
                }}
              >
                <Image
                  src={el}
                  className="h-80 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  height="400"
                  width="400"
                  alt={`Gallery image ${idx + 1}`}
                  priority={idx < 2}
                  loading={idx < 2 ? "eager" : "lazy"}
                  quality={idx < 2 ? 85 : 75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
              }}
              key={`grid-2-${idx}`}
              className="will-change-transform"
            >
              <div 
                className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden"
                }}
              >
                <Image
                  src={el}
                  className="h-80 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  height="400"
                  width="400"
                  alt={`Gallery image ${imageParts.first.length + idx + 1}`}
                  priority={idx < 2}
                  loading={idx < 2 ? "eager" : "lazy"}
                  quality={idx < 2 ? 85 : 75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
              }}
              key={`grid-3-${idx}`}
              className="will-change-transform"
            >
              <div 
                className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden"
                }}
              >
                <Image
                  src={el}
                  className="h-80 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  height="400"
                  width="400"
                  alt={`Gallery image ${imageParts.first.length + imageParts.second.length + idx + 1}`}
                  priority={idx < 2}
                  loading={idx < 2 ? "eager" : "lazy"}
                  quality={idx < 2 ? 85 : 75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
});

ParallaxScrollSecond.displayName = "ParallaxScrollSecond";
