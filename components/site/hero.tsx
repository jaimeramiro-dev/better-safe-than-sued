"use client";

import { motion } from "framer-motion";
import { RiskConsole } from "@/components/site/risk-console";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-faint absolute inset-x-0 top-0 h-[460px] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      <div className="mx-auto max-w-3xl px-5 pb-12 pt-14 text-center sm:px-8 sm:pt-20 lg:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted"
        >
          For first-time EU e-commerce founders
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          className="mt-4 text-balance pb-1 font-serif text-[2.5rem] font-medium leading-[1.08] tracking-[-0.01em] text-ink sm:text-[3.4rem]"
        >
          Find the risks before they <span className="italic">find you.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          className="mx-auto mt-5 max-w-xl text-pretty text-[16.5px] leading-relaxed text-muted sm:text-[17.5px]"
        >
          Describe your store in a sentence. Get the EU regulation, payment, and
          fraud risks you&apos;re walking into, in plain language.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
        className="mx-auto max-w-3xl px-4 pb-20 sm:px-8 sm:pb-28"
      >
        <RiskConsole />
      </motion.div>
    </section>
  );
}
