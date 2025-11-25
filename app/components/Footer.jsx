"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 text-[var(--brand)]">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-10 md:grid-cols-4">
        {/* LEFT — Logo */}
        <div className="flex flex-col gap-3">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            AUTOPARDAVIMAI
          </Link>

          <p className="text-sm text-[var(--brand)]/60">
            Viena užklausa — keli pasiūlymai.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--brand)]/60">
            Navigacija
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-[var(--brand-accent)] transition"
              >
                Pagrindinis
              </Link>
            </li>
            <li>
              <Link
                href="/pasiulymai"
                className="hover:text-[var(--brand-accent)] transition"
              >
                Pasiūlymai
              </Link>
            </li>
            <li>
              <Link
                href="/apie"
                className="hover:text-[var(--brand-accent)] transition"
              >
                Apie mus
              </Link>
            </li>
            <li>
              <Link
                href="/duk"
                className="hover:text-[var(--brand-accent)] transition"
              >
                DUK
              </Link>
            </li>
            <li>
              <Link
                href="/kontaktai"
                className="hover:text-[var(--brand-accent)] transition"
              >
                Kontaktai
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--brand)]/60">
            Kontaktai
          </h4>

          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-[var(--brand)]/70">El. paštas:</span>
              <a
                href="mailto:info@autopardavimai.lt"
                className="hover:text-[var(--brand-accent)] transition"
              >
                info@autopardavimai.lt
              </a>
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--brand)]/70">Telefonas:</span>
              <a
                href="tel:+37060000000"
                className="hover:text-[var(--brand-accent)] transition"
              >
                +370 600 00000
              </a>
            </li>
          </ul>
        </div>

        {/* SOCIAL ICONS */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--brand)]/60">
            Sekite mus
          </h4>

          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              className="p-2 rounded-full border border-gray-300 hover:bg-[var(--brand-accent)] hover:text-white transition"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="p-2 rounded-full border border-gray-300 hover:bg-[var(--brand-accent)] hover:text-white transition"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM LINE */}
      <div className="border-t border-gray-200 py-4 text-center text-xs text-[var(--brand)]/60">
        © {new Date().getFullYear()} Autopardavimai. Visos teisės saugomos.
      </div>
    </footer>
  );
}
