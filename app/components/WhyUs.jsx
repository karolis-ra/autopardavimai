"use client";

import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";

export default function WhyUs() {
  const benefits = [
    {
      title: "Taupote laiką",
      desc: "Viena užklausa vietoje dešimčių skambučių ir žinučių į skirtingus salonus.",
    },
    {
      title: "Keli pasiūlymai",
      desc: "Gausite kelis realius pasiūlymus ir galėsite palyginti kainą, komplektaciją ir sąlygas.",
    },
    {
      title: "Tik patikrinti salonai",
      desc: "Dirbame tik su patikimais partneriais, kurie atsako už savo pasiūlymus.",
    },
    {
      title: "Nemokama paslauga",
      desc: "Jums – visiškai nemokama. Moka salonai, kurie nori gauti daugiau klientų.",
    },
  ];

  return (
    <section className="flex justify-center w-full bg-white px-7 py-20 text-[var(--brand)]">
      <div className="max-w-6xl grid gap-10 lg:grid-cols-2 lg:items-center">
        {/* Tekstas + benefitai */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]/60">
            Kodėl mes
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Protingesnis būdas ieškoti automobilio
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--brand)]/80">
            Vietoje to, kad patys ieškotumėte skirtingų salonų, derintumėte
            laikus ir kainas – užpildykite vieną aiškią užklausą ir leiskite
            darbą atlikti sistemai ir vadybininkams.
          </p>

          <div className="mt-8 space-y-4">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-3">
                <div className="mt-1">
                  <FiCheckCircle className="text-xl text-[var(--brand-accent)]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold sm:text-base">
                    {b.title}
                  </h3>
                  <p className="text-sm text-[var(--brand)]/75">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[400px] overflow-hidden rounded-3xl bg-black/5 sm:h-[320px] lg:h-[500px]">
          <Image
            src="/images/fast.jpg"
            alt="Klientas gauna kelių salonų pasiūlymus"
            fill
            className="object-fit"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
        </div>
      </div>
    </section>
  );
}
