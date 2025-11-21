import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import MainNav from "./components/MainNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "Autobuy",
  description: "Viena užklausa → keli pasiūlymai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="lt" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="min-h-dvh bg-[var(--brand-bg)] text-[var(--brand)] antialiased">
        <MainNav />
        {/* Kad turinys nepradėtųsi po navigacija */}
        <div>{children}</div>
      </body>
    </html>
  );
}
