"use client";

import { useEffect, useState, useRef } from "react";
import type { JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TimelineContent } from "@/components/timeline-animation";
import clsx from "clsx";
import { Briefcase, Wrench, Info, Mail } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type NavItem = { name: string; href: string; icon: React.FC<any> };

// Adjusted to site sections and original headings
const NAV_ITEMS: NavItem[] = [
  { name: "About Us", href: "/#about", icon: Briefcase },
  { name: "Register", href: "/register", icon: Wrench },
  { name: "Sponsors", href: "/#sponsors", icon: Info },
  { name: "Contact", href: "/#contact", icon: Mail },
];

export default function Navbar(): JSX.Element {
  const [active, setActive] = useState<string>(NAV_ITEMS[0].name);
  const [visible, setVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > heroHeight * 0.8) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      ref={navbarRef}
      className={clsx(
        "fixed top-0 left-0 right-0 z-40 transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <TimelineContent animationNum={0} timelineRef={navbarRef} once={false}>
          <Link href="/" className="pointer-events-auto">
            <Image
              src="/sponsors/Logo%20Spectrum.png"
              alt="Spectrum"
              width={160}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>
        </TimelineContent>

        {/* Floating pill nav (bottom-right on mobile, inline on desktop) */}
        <div
          className={clsx(
            "fixed bottom-4 right-4 z-50 w-auto sm:static sm:right-auto",
            !visible && "opacity-0 pointer-events-none"
          )}
        >
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[#FFD700]/40 bg-white/60 px-1 py-1 backdrop-blur-md shadow-lg">
            {NAV_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              const activeTab = active === item.name;
              return (
                <TimelineContent key={item.name} animationNum={idx + 1} timelineRef={navbarRef} once={false}>
                  <Link
                    href={item.href}
                    onClick={() => setActive(item.name)}
                    className={clsx(
                      "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-sans font-semibold transition-colors",
                      "text-black/70 hover:text-black",
                      activeTab && "text-[#FFD700]"
                    )}
                  >
                    <span className="hidden md:inline">{item.name}</span>
                    <span className="md:hidden">
                      <Icon size={18} strokeWidth={2.5} />
                    </span>
                    {activeTab && (
                      <motion.span
                        layoutId="navLamp"
                        className="absolute inset-0 -z-10 rounded-full bg-[#FFD700]/15"
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      />
                    )}
                  </Link>
                </TimelineContent>
              );
            })}
        </div>
        </div>
      </div>
    </header>
  );
}
