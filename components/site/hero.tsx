"use client";

import { motion } from "framer-motion";
import { RiskConsole } from "@/components/site/risk-console";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden font-satoshi">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-faint absolute inset-x-0 top-0 h-[520px] opacity-80 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      <div className="mx-auto max-w-3xl px-5 pb-14 pt-16 text-center sm:px-8 sm:pt-24 lg:pt-28">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted"
        >
          For first-time EU e-commerce founders
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          className="mt-6 text-balance font-bold text-[2.8rem] leading-[1.04] tracking-[-0.02em] text-ink sm:text-[4rem] lg:text-[4.5rem]"
        >
          Find the risks before they{" "}
          <span className="italic">find you.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          className="mx-auto mt-6 max-w-[34rem] text-pretty text-[17px] leading-[1.7] text-muted sm:text-[18px]"
        >
          Describe your store in a sentence. Get the EU regulation, payment, and
          fraud risks you&apos;re walking into, in plain language.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
        className="mx-auto max-w-3xl px-4 pb-24 sm:px-8 sm:pb-32"
      >
        <RiskConsole />
      </motion.div>
    </section>
  );
}
