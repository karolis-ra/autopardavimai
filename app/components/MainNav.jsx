"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "Pagrindinis" },
  { href: "/quiz", label: "Užklausa" },
  { href: "/apie-mus", label: "Apie mus" },
  { href: "/duk", label: "D.U.K" },
];

export default function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) => href === pathname;

  return (
    <>
      {/* Desktop / mobile header */}
      <header className="sticky inset-x-0 top-0 z-40 border-b border-gray-200 bg-white backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-md">
          {/* Logo / brand */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight text-black"
          >
            <span className="h-7 w-7 rounded-full bg-[var(--brand-accent)]" />
            <span>Autobuy</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isActive(link.href)
                    ? "text-[var(--brand-accent)]"
                    : "text-black hover:text-[var(--brand-accent)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-black/20 px-3 py-1 text-xs font-medium text-black md:hidden"
          >
            Meniu
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-white"
          >
            <div className="flex h-full flex-col">
              {/* Top bar inside overlay */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold tracking-tight text-black"
                  onClick={() => setOpen(false)}
                >
                  <span className="h-7 w-7 rounded-full bg-[var(--brand-accent)]" />
                  <span>Autobuy</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-sm text-black"
                >
                  ✕
                </button>
              </div>

              {/* Links center */}
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`w-full max-w-xs rounded-full px-4 py-3 text-center text-base font-bold transition ${
                      isActive(link.href)
                        ? "bg-[var(--brand-accent)] text-white"
                        : "text-black hover:text-[var(--brand-accent)] hover:bg-black/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
