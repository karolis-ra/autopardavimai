"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Hero() {
  const router = useRouter();
  return (
    <>
      {/* Content */}
      <div
        className="
        
          relative z-10 mx-auto flex 
          h-[400px] md:h-[900px]
           flex-col items-center justify-center 
          px-6 text-center
          bg-fit bg-center
           
        "
        style={{ backgroundImage: "url('/images/new car.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="flex flex-col items-center z-20">
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-balance text-4xl font-semibold sm:text-6xl"
          >
            Viena užklausa keliems pasiūlymams
          </motion.h1>

          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="mt-4 max-w-2xl text-pretty text-lg text-white/95 sm:text-xl center"
          >
            Minimalistiška, greita ir paprasta. Gaukite pasiūlymus iš kelių
            salonų vienu paspaudimu.
          </motion.p>

          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/quiz" className="btn-primary">
              Teikti užklausą
            </Link>

            <button
              type="button"
              onClick={() => router.push("/apie-mus")}
              className="inline-flex items-center justify-center rounded-full 
                 px-8 py-3 text-sm font-medium tracking-wide
                 border border-white/80 text-white
                 hover:bg-white hover:text-black transition"
            >
              Sužinoti daugiau
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
