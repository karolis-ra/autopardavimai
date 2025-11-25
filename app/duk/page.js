"use client";
import { useState } from "react";

const faqs = [
  {
    question: "Per kiek laiko gausiu atsakymą į užklausą?",
    answer:
      "Į visas užklausas paprastai atsakome per 1–3 darbo valandas. Sudėtingesniems atvejams gali prireikti iki 24 val.",
  },
  {
    question: "Kaip veikia automobilio paieškos paslauga?",
    answer:
      "Jūs pateikiate savo poreikius, o mes atliekame rinkos analizę, tikriname skelbimus, techninę būklę bei pateikiame tik atrinktus variantus.",
  },
  {
    question: "Ar mano pateikti duomenys yra saugūs?",
    answer:
      "Taip, visi duomenys tvarkomi tik pagal Jūsų užklausą ir nėra perduodami tretiesiems asmenims. Laikomės GDPR reikalavimų.",
  },
  {
    question: "Ar užklausos pateikimas yra nemokamas?",
    answer:
      "Taip, pirminė konsultacija ir užklausos pateikimas yra visiškai nemokami.",
  },
  {
    question: "Kiek laiko trunka automobilio paieška?",
    answer:
      "Vidutiniškai 1–3 dienas iki pirmųjų pasiūlymų, priklausomai nuo modelio populiarumo ir biudžeto.",
  },
  {
    question: "Ar tikrinate automobilio istoriją?",
    answer:
      "Taip, tikriname VIN ataskaitas, ridą, servisus, atliktus darbus ir galimus defektus.",
  },
  {
    question: "Ar apžiūrite automobilį gyvai?",
    answer:
      "Taip, galime atlikti pirminę apžiūrą gyvai arba rekomenduoti patikimą servisą detaliai diagnostikai.",
  },
  {
    question: "Ar teikiate konsultacijas dėl automobilio finansavimo?",
    answer:
      "Taip, galime patarti dėl lizingo, draudimo ir kitų finansavimo galimybių.",
  },
  {
    question: "Kokia automobilio paieškos paslaugos kaina?",
    answer:
      "Pirminiai pasiūlymai pateikiami nemokamai. Pilna automobilio paieška kainuoja pagal susitarimą, priklausomai nuo darbų apimties.",
  },
  {
    question: "Ar galite padėti derėtis dėl kainos?",
    answer:
      "Taip, galime rekomenduoti argumentus ar net patys padėti derėtis, jei to pageidaujate.",
  },
  {
    question: "Kiek automobilio variantų gausiu?",
    answer:
      "Paprastai pateikiame 3–10 atrinktų variantų, priklausomai nuo Jūsų kriterijų.",
  },
  {
    question: "Ką daryti, jei nė vienas pasiūlymas netinka?",
    answer:
      "Tada tęsiame paiešką ir koreguojame kriterijus, kol randame tinkamą variantą.",
  },
  {
    question: "Ar padedate įvertinti realią rinkos kainą?",
    answer:
      "Taip, pateikiame objektyvią rinkos analizę pagal panašius modelius ir kainų pokyčius.",
  },
  {
    question: "Ar dirbate tik Lietuvoje?",
    answer:
      "Daugiausia dirbame su Lietuva, tačiau galime padėti ir su automobiliais iš užsienio.",
  },
  {
    question: "Ar galiu pateikti kelis automobilio modelius?",
    answer: "Taip, galite nurodyti keletą pageidaujamų modelių ar variantų.",
  },
  {
    question: "Ar galiu pakeisti paieškos kriterijus?",
    answer:
      "Taip, kriterijus galima koreguoti bet kuriuo metu – tiesiog susisiekite.",
  },
  {
    question: "Kaip sužinosiu, kad gavote mano užklausą?",
    answer:
      "Iš karto gausite patvirtinimą el. paštu. Jei reikia papildomos informacijos, susisieksime patys.",
  },
  {
    question: "Ar automobiliai tikrinami dėl paslėptų defektų?",
    answer:
      "Taip, prireikus atliekamas serviso patikrinimas, diagnostika ir vizuali apžiūra.",
  },
  {
    question: "Ar padedate sutvarkyti dokumentus?",
    answer:
      "Taip, padedame pasiruošti reikalingus dokumentus ir suteikiame rekomendacijas visam procesui.",
  },
  {
    question: "Kaip galiu susisiekti, jei turiu papildomų klausimų?",
    answer:
      "Galite rašyti el. paštu arba užpildyti kontaktinę formą. Atsakome greitai ir aiškiai.",
  },
];

export default function DUK() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-10">
        Dažniausiai užduodami klausimai
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <span className="text-2xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <p className="mt-3 text-muted text-sm leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
