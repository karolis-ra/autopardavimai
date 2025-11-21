import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import nodemailer from "nodemailer";

function mailer() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}
const FROM = process.env.SMTP_FROM || "Auto pirkimai <info@orditek.lt>";

const toInt = (v) =>
  v === "" || v == null ? null : parseInt(String(v).replace(/\D/g, ""), 10);
const toNum = (v) =>
  v === "" || v == null ? null : Number(String(v).replace(",", "."));

export async function POST(req) {
  try {
    const { quiz } = await req.json();
    if (!quiz?.contact?.phone)
      return NextResponse.json({ error: "Phone required" }, { status: 400 });
    if (!quiz?.brandIds?.length)
      return NextResponse.json(
        { error: "Select at least one brand" },
        { status: 400 }
      );

    // 1) lead
    const { data: lead, error: leadErr } = await supabaseAdmin
      .from("leads")
      .insert({
        first_name: quiz.contact.firstName || null,
        last_name: quiz.contact.lastName || null,
        email: quiz.contact.email || null,
        phone: quiz.contact.phone,
        status: "new",
      })
      .select("*")
      .single();
    if (leadErr) throw leadErr;

    // 2) preferences
    const pref = {
      lead_id: lead.id,
      budget_from: toInt(quiz.budget?.from),
      budget_to: toInt(quiz.budget?.to),
      year_from: toInt(quiz.year?.from),
      year_to: toInt(quiz.year?.to),
      color: quiz.color || null,
      fuel: quiz.fuel || null,
      body: quiz.body || null,
      engine_from: toNum(quiz.engine?.from),
      engine_to: toNum(quiz.engine?.to),
      gearbox: quiz.gearbox || null,
      power_from: toInt(quiz.power?.from),
      power_to: toInt(quiz.power?.to),
    };
    const { error: prefErr } = await supabaseAdmin
      .from("lead_preferences")
      .insert(pref);
    if (prefErr) throw prefErr;

    // 3) relations
    await supabaseAdmin
      .from("lead_brands")
      .insert(quiz.brandIds.map((id) => ({ lead_id: lead.id, brand_id: id })));
    if (quiz.modelIds?.length) {
      await supabaseAdmin
        .from("lead_models")
        .insert(
          quiz.modelIds.map((id) => ({ lead_id: lead.id, model_id: id }))
        );
    }

    // 4) readable names
    const { data: brandRows } = await supabaseAdmin
      .from("car_brands")
      .select("name")
      .in("id", quiz.brandIds);
    const { data: modelRows } = await supabaseAdmin
      .from("car_models")
      .select("name")
      .in("id", quiz.modelIds || []);
    const brandList = (brandRows || []).map((b) => b.name);
    const modelList = (modelRows || []).map((m) => m.name);

    // 5) matching dealers (overlap)
    const { data: dealers } = await supabaseAdmin
      .from("dealers")
      .select("id,name,email,brands")
      .overlaps("brands", brandList);

    // 6) compact console message
    const msg = `🚗 Nauja užklausa
— Kontaktas: ${quiz.contact.firstName || ""} ${quiz.contact.lastName || ""} | ${
      quiz.contact.email || "—"
    } | ${quiz.contact.phone}
— Markės: ${brandList.join(", ") || "—"}
— Modeliai: ${modelList.join(", ") || "—"}
— Biudžetas: ${quiz.budget?.from || "—"} – ${quiz.budget?.to || "—"} €
— Metai: ${quiz.year?.from || "—"} – ${quiz.year?.to || "—"}
— Spalva: ${quiz.color || "—"} | Kuras: ${quiz.fuel || "—"} | Kėbulas: ${
      quiz.body || "—"
    } | Pavarų dėžė: ${quiz.gearbox || "—"}
— Tūris: ${quiz.engine?.from || "—"}–${quiz.engine?.to || "—"} L | Galia: ${
      quiz.power?.from || "—"
    }–${quiz.power?.to || "—"}
— Atitinkantys salonai (${dealers?.length || 0}): ${
      (dealers || []).map((d) => d.name).join(", ") || "—"
    }`;

    console.log(msg);

    // 7) Email (jei sukonfigūruotas SMTP)
    const tx = mailer();
    if (tx && dealers?.length) {
      const toList = dealers.filter((d) => !!d.email).map((d) => d.email);
      if (toList.length) {
        await tx.sendMail({
          from: FROM,
          to: "info@orditek.lt", // tavo adresas
          bcc: toList, // visi dealeriai paslepti
          subject: `Nauja užklausa: ${brandList.join(", ")}`,
          text: msg,
        });
        console.log("✅ Email sent to:", toList.join(", "));
      }
    }

    return NextResponse.json({
      ok: true,
      leadId: lead.id,
      dealers: dealers?.length || 0,
    });
  } catch (e) {
    console.error("sendRequest error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
