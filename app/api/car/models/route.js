// app/api/car/models/route.js
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const brandIds = searchParams.getAll("brandId"); // ?brandId=...&brandId=...
  let q = supabaseAdmin
    .from("car_models")
    .select("id,name,brand_id")
    .order("name");
  if (brandIds.length) q = q.in("brand_id", brandIds);
  const { data, error } = await q;
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
