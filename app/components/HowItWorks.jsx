import { FaWpforms, FaGear } from "react-icons/fa6";
import { MdSell } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";

export default function HowItWorks() {
  const steps = [
    {
      title: "Užpildykite formą",
      desc: "Nurodykite markes, modelius, biudžetą ir pagrindinius kriterijus.",
      icon: <FaWpforms />,
      number: 1,
    },
    {
      title: "Sistema peržiūri duomenis",
      desc: "Automatiškai atrenkamos tinkamos markės ir modeliai.",
      icon: <FaGear />,
      number: 2,
    },
    {
      title: "Duomenys pateikiami salonams",
      desc: "Atrinkti salonai gauna užklausą su Jūsų reikalavimais.",
      icon: <MdSell />,
      number: 3,
    },
    {
      title: "Vadybininkai pateikia pasiūlymus",
      desc: "Gaunate kelių salonų pasiūlymus ir pasirenkate geriausią.",
      icon: <MdMarkEmailRead />,
      number: 4,
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 ">
      <h2 className="mb-12 text-center text-4xl font-semibold tracking-tight text-[var(--brand)]">
        Kaip tai veikia
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div
            key={s.number}
            className="group rounded-2xl bg-white p-6 transition border-1 border-[var(--brand-accent)] shadow-md"
          >
            <div className="flex justify-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-accent)] text-lg font-bold text-white shadow">
                {s.icon}
              </div>
            </div>

            <h3 className="mb-2 text-lg font-medium text-[var(--brand)]">
              {s.title}
            </h3>
            <p className="text-sm text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
