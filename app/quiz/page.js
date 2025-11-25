"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Paprasti žodynai (jei nori – vėliau perkelsim į DB)
const FUEL = ["Benzinas", "Dyzelinas", "Hibridas", "Elektra", "Dujos"];
const BODY = ["Sedanas", "Hečbekas", "Universalas", "SUV", "Kupė"];
const GEARBOX = ["Mechaninė", "Automatinė"];

const stepAnim = {
  initial: { y: 16, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -12, opacity: 0 },
  transition: { duration: 0.25, ease: "easeOut" },
};

export default function Quiz() {
  const [step, setStep] = useState(0);

  // Žodynai iš DB
  const [brandsDict, setBrandsDict] = useState([]); // [{id,name}]
  const [modelsDict, setModelsDict] = useState([]); // [{id,name,brand_id}]

  // Pasirinkimai (saugom ID)
  const [brandIds, setBrandIds] = useState([]);
  const [modelIds, setModelIds] = useState([]);

  // Kiti laukai
  const [budgetFrom, setBudgetFrom] = useState("");
  const [budgetTo, setBudgetTo] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [color, setColor] = useState("");
  const [fuel, setFuel] = useState("");
  const [body, setBody] = useState("");
  const [engineFrom, setEngineFrom] = useState("");
  const [engineTo, setEngineTo] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [powerFrom, setPowerFrom] = useState("");
  const [powerTo, setPowerTo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // Užkraunam markes
  useEffect(() => {
    (async () => {
      const r = await fetch("/api/car/brands");
      const data = await r.json();
      setBrandsDict(Array.isArray(data) ? data : []);
    })();
  }, []);

  // Užkraunam modelius, kai pasirinktos markės
  useEffect(() => {
    if (!brandIds.length) {
      setModelsDict([]);
      setModelIds([]);
      return;
    }
    (async () => {
      const qs = brandIds.map((id) => `brandId=${id}`).join("&");
      const r = await fetch(`/api/car/models?${qs}`);
      const data = await r.json();
      setModelsDict(Array.isArray(data) ? data : []);
      // išvalom modelius, kurie nebepriklauso pasirinktom markėm
      setModelIds((ids) => ids.filter((id) => data.some((m) => m.id === id)));
    })();
  }, [brandIds]);

  // Modeliai sugrupuoti pagal markę
  const groupedModels = useMemo(() => {
    const byBrand = new Map();
    brandsDict
      .filter((b) => brandIds.includes(b.id))
      .forEach((b) => byBrand.set(b.id, { brandName: b.name, models: [] }));
    modelsDict.forEach((m) => {
      if (byBrand.has(m.brand_id)) byBrand.get(m.brand_id).models.push(m);
    });
    return Array.from(byBrand.values());
  }, [brandsDict, brandIds, modelsDict]);

  // Peržiūros pavadinimai
  const brandNames = useMemo(
    () =>
      brandIds
        .map((id) => brandsDict.find((b) => b.id === id)?.name)
        .filter(Boolean),
    [brandIds, brandsDict]
  );
  const modelNames = useMemo(
    () =>
      modelIds
        .map((id) => modelsDict.find((m) => m.id === id)?.name)
        .filter(Boolean),
    [modelIds, modelsDict]
  );

  // Toggle helperiai
  const toggleBrand = (id) =>
    setBrandIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const toggleModel = (id) =>
    setModelIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  // „Toliau“ validacijos
  const totalModelsCount = groupedModels.reduce(
    (acc, g) => acc + g.models.length,
    0
  );
  const canNext =
    (step === 0 && brandIds.length > 0) ||
    (step === 1 && (modelIds.length > 0 || totalModelsCount === 0)) ||
    (step === 2 && phone.trim() && firstName.trim());

  // Siuntimas
  const summary = {
    brandIds,
    modelIds,
    budget: { from: budgetFrom, to: budgetTo },
    year: { from: yearFrom, to: yearTo },
    color,
    fuel,
    body,
    engine: { from: engineFrom, to: engineTo },
    gearbox,
    power: { from: powerFrom, to: powerTo },
    contact: { firstName, lastName, email, phone },
  };

  async function submit() {
    try {
      setLoading(true);
      setMsg(null);
      const res = await fetch("/api/sendRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quiz: summary }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Klaida");
      setMsg({ ok: true, text: "Užklausa išsiųsta!" });
    } catch (e) {
      setMsg({ ok: false, text: e.message });
    } finally {
      setLoading(false);
    }
  }

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 min-h-142">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">
          Automobilio paieškos užklausa
        </h1>

        <Link href="/" className="text-sm text-muted hover:text-black">
          ← Grįžti
        </Link>
      </header>

      {/* Žingsnių juosta */}
      <div className="mb-6 grid grid-cols-4 gap-2">
        {["Markė", "Apie", "Kontaktai", "Peržiūra"].map((t, i) => (
          <div
            key={t}
            className={`rounded-full px-3 py-2 text-center text-xs sm:text-sm ${
              i <= step
                ? "bg-[var(--brand-accent)] text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {t}
          </div>
        ))}
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5">
        <AnimatePresence mode="wait">
          {/* STEP 1: Markės */}
          {step === 0 && (
            <motion.div key="s1" {...stepAnim} className="space-y-6">
              <h2 className="text-xl font-medium">1. Kokios markės domina?</h2>
              <p className="text-sm text-muted">
                Galite pasirinkti kelias markes – pagal jas bus atrenkami
                modeliai ir salonai.
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                {brandsDict.map((b) => (
                  <label
                    key={b.id}
                    className={`flex items-center justify-between rounded-xl border bg-white px-4 py-3 text-sm hover:shadow-sm cursor-pointer transition
                    ${
                      brandIds.includes(b.id)
                        ? "border-[var(--brand-accent)] ring-1 ring-[var(--brand-accent)]/30"
                        : "border-gray-200"
                    }`}
                  >
                    <span>{b.name}</span>
                    <input
                      type="checkbox"
                      className="size-4 accent-[var(--brand-accent)]"
                      checked={brandIds.includes(b.id)}
                      onChange={() => toggleBrand(b.id)}
                    />
                  </label>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={next}
                  disabled={brandIds.length === 0}
                  className={`btn-primary ${
                    brandIds.length === 0 ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  Toliau
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Modeliai + parametrai */}
          {step === 1 && (
            <motion.div key="s2" {...stepAnim} className="space-y-6">
              <h2 className="text-xl font-medium">
                2. Iš pasirinktų markių pasirinkite modelius
              </h2>

              {groupedModels.length === 0 ? (
                <p className="text-muted">
                  Pasirinkite bent vieną markę ankstesniame žingsnyje.
                </p>
              ) : (
                <div className="space-y-5">
                  {groupedModels.map(({ brandName, models }) => (
                    <div
                      key={brandName}
                      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-base font-semibold">{brandName}</h3>
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-muted">
                          {models.length} modelių
                        </span>
                      </div>

                      {models.length === 0 ? (
                        <div className="text-sm text-muted">
                          Šiai markei modelių nėra.
                        </div>
                      ) : (
                        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                          {models.map((m) => (
                            <label
                              key={m.id}
                              className={`flex items-center justify-between rounded-xl border bg-white px-4 py-3 text-sm hover:shadow-sm cursor-pointer transition
                              ${
                                modelIds.includes(m.id)
                                  ? "border-[var(--brand-accent)] ring-1 ring-[var(--brand-accent)]/30"
                                  : "border-gray-200"
                              }`}
                            >
                              <span>{m.name}</span>
                              <input
                                type="checkbox"
                                className="size-4 accent-[var(--brand-accent)]"
                                checked={modelIds.includes(m.id)}
                                onChange={() => toggleModel(m.id)}
                              />
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Techniniai parametrai */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Biudžetas (€) nuo–iki
                  </label>
                  <div className="flex gap-3">
                    <input
                      value={budgetFrom}
                      onChange={(e) => setBudgetFrom(e.target.value)}
                      placeholder="nuo"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                    />
                    <input
                      value={budgetTo}
                      onChange={(e) => setBudgetTo(e.target.value)}
                      placeholder="iki"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Metai nuo–iki
                  </label>
                  <div className="flex gap-3">
                    <input
                      value={yearFrom}
                      onChange={(e) => setYearFrom(e.target.value)}
                      placeholder="nuo"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                    />
                    <input
                      value={yearTo}
                      onChange={(e) => setYearTo(e.target.value)}
                      placeholder="iki"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Spalva
                  </label>
                  <input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="pvz. juoda"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Kuro tipas
                  </label>
                  <select
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                  >
                    <option value="">Pasirinkite</option>
                    {FUEL.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Kėbulo tipas
                  </label>
                  <select
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                  >
                    <option value="">Pasirinkite</option>
                    {BODY.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Darbinis tūris (L) nuo–iki
                  </label>
                  <div className="flex gap-3">
                    <input
                      value={engineFrom}
                      onChange={(e) => setEngineFrom(e.target.value)}
                      placeholder="nuo"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                    />
                    <input
                      value={engineTo}
                      onChange={(e) => setEngineTo(e.target.value)}
                      placeholder="iki"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Pavarų dėžė
                  </label>
                  <select
                    value={gearbox}
                    onChange={(e) => setGearbox(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                  >
                    <option value="">Pasirinkite</option>
                    {GEARBOX.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Galia (AG/kW) nuo–iki
                  </label>
                  <div className="flex gap-3">
                    <input
                      value={powerFrom}
                      onChange={(e) => setPowerFrom(e.target.value)}
                      placeholder="nuo"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                    />
                    <input
                      value={powerTo}
                      onChange={(e) => setPowerTo(e.target.value)}
                      placeholder="iki"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button onClick={back} className="btn-ghost">
                  Atgal
                </button>
                <button
                  onClick={next}
                  disabled={!canNext}
                  className={`btn-primary ${
                    !canNext ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  Toliau
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Kontaktai */}
          {step === 2 && (
            <motion.div key="s3" {...stepAnim} className="space-y-6">
              <h2 className="text-xl font-medium">3. Kontaktiniai duomenys</h2>
              <p className="text-sm text-muted">
                Šie duomenys bus perduoti tik salonams, kurie galės pateikti
                jums pasiūlymą.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Vardas
                  </label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Pavardė
                  </label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    El. paštas
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Telefonas
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[var(--brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--brand-accent)]/30"
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button onClick={back} className="btn-ghost">
                  Atgal
                </button>
                <button
                  onClick={next}
                  disabled={!canNext}
                  className={`btn-primary ${
                    !canNext ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  Toliau
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Peržiūra */}
          {step === 3 && (
            <motion.div key="s4" {...stepAnim} className="space-y-6">
              <h2 className="text-xl font-medium">4. Peržiūra</h2>
              <p className="text-sm text-muted">
                Patikrinkite informaciją prieš siųsdami – salonai matys būtent
                šiuos duomenis.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Summary label="Markės" value={brandNames.join(", ") || "—"} />
                <Summary
                  label="Modeliai"
                  value={modelNames.join(", ") || "—"}
                />
                <Summary
                  label="Biudžetas"
                  value={`${budgetFrom || "—"} – ${budgetTo || "—"} €`}
                />
                <Summary
                  label="Metai"
                  value={`${yearFrom || "—"} – ${yearTo || "—"}`}
                />
                <Summary label="Spalva" value={color || "—"} />
                <Summary label="Kuras" value={fuel || "—"} />
                <Summary label="Kėbulas" value={body || "—"} />
                <Summary
                  label="Darbinis tūris"
                  value={`${engineFrom || "—"} – ${engineTo || "—"} L`}
                />
                <Summary label="Pavarų dėžė" value={gearbox || "—"} />
                <Summary
                  label="Galia"
                  value={`${powerFrom || "—"} – ${powerTo || "—"}`}
                />
                <Summary
                  label="Vardas, pavardė"
                  value={`${firstName} ${lastName}`.trim() || "—"}
                />
                <Summary
                  label="Kontaktai"
                  value={`${email || "—"} / ${phone || "—"}`}
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button onClick={back} className="btn-ghost">
                  Atgal
                </button>
                <button
                  onClick={submit}
                  disabled={loading}
                  className={`btn-primary ${
                    loading ? "opacity-70 cursor-wait" : ""
                  }`}
                >
                  {loading ? "Siunčiama…" : "Siųsti užklausą"}
                </button>
                {msg && (
                  <span className={msg.ok ? "text-green-600" : "text-red-600"}>
                    {msg.text}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

function Summary({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}
