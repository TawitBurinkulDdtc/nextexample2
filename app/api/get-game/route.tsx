import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "../../../lib/supabase/server";

export async function GET(req: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const { data, error } = await supabase
    .from("gamewebgamelist")
    .select("*")
    .eq("game_id", id)
    .single();

  if (error) return NextResponse.json({ error });

  return NextResponse.json(data);
}
