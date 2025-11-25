"use client";

import Image from "next/image";

export default function ApieMus() {
  return (
    <main className="w-full bg-white text-[var(--brand)]">
      {/* HERO SECTION */}
      <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <Image
          src="/images/clogs.jpg" // ← įkelk savo nuotrauką į /public/images/
          alt="Apie mus"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-white drop-shadow-lg">
            Apie mus
          </h1>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="mx-auto max-w-4xl px-6 py-16 space-y-10">
        {/* INTRO */}
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Viena užklausa. Keli pasiūlymai.
          </h2>
          <p className="text-[var(--brand)]/80 max-w-2xl mx-auto">
            Autopardavimai.lt gimė iš paprastos idėjos — automobilio paieška
            turėtų būti paprasta, greita ir skaidri. Vietoje to, kad klientai
            valandų valandas naršytų skirtingas svetaines ir derintų kainas su
            kiekvienu salonu atskirai, mūsų sistema leidžia užpildyti vieną
            užklausą ir gauti kelis realius pasiūlymus tiesiai iš patikimų
            partnerių.
          </p>
        </div>

        {/* MISSION BLOCK */}
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Mūsų misija</h3>
            <p className="text-[var(--brand)]/80">
              Padėti žmonėms greičiau ir paprasčiau surasti tinkamiausią
              automobilį, o salonams – pasiekti aktyviai ieškančius klientus.
              Mes tikime, kad skaidrumas, aiškumas ir patogumas turėtų būti
              kiekvieno automobilio įsigijimo proceso dalis.
            </p>
          </div>

          <div className="relative h-[240px] rounded-2xl overflow-hidden bg-black/5">
            <Image
              src="/images/time.jpg" // ← vieta tavo nuotraukai
              alt="Mūsų misija"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* VALUES BLOCK */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-center">Mūsų vertybės</h3>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
              <h4 className="font-semibold mb-2">Skaidrumas</h4>
              <p className="text-[var(--brand)]/75">
                Jokių paslėptų mokesčių ar įsipareigojimų. Jūs kontroliuojate,
                kam siunčiate savo užklausą ir kuriuos pasiūlymus renkatės.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
              <h4 className="font-semibold mb-2">Patikimumas</h4>
              <p className="text-[var(--brand)]/75">
                Bendradarbiaujame tik su tais salonais, kurie vertina klientų
                pasitikėjimą ir teikia realius, aiškius pasiūlymus.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
              <h4 className="font-semibold mb-2">Paprastumas</h4>
              <p className="text-[var(--brand)]/75">
                Viena forma pakeičia ilgą ir varginantį paieškų procesą
                skirtinguose tinklapiuose ir salonuose.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
              <h4 className="font-semibold mb-2">Greitis</h4>
              <p className="text-[var(--brand)]/75">
                Užklausos automatiškai nukreipiamos partneriams, kurie gali
                pasiūlyti tai, ko jums reikia — be jokios gaišaties.
              </p>
            </div>
          </div>
        </div>

        {/* FINAL STATEMENT */}
        <div className="text-center pt-10">
          <p className="text-lg font-medium text-[var(--brand)]">
            Mes tikime, kad automobilio paieška gali būti paprasta.
          </p>
          <p className="text-[var(--brand)]/70">
            Ir mes dirbame tam, kad taip būtų kiekvieną dieną.
          </p>
        </div>
      </section>
    </main>
  );
}
