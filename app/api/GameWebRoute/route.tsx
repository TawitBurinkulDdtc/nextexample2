import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

export async function GET(req: NextRequest) {
  // ❌ REMOVE THIS — no more cookieStore
  // const cookieStore = await cookies();

  // ✔ Correct — createClient has NO parameters now
  const supabase = createClient();

  const { data: gameweb, error } = await supabase
    .from("gamewebgamelist")
    .select("game_id, game_name, game_tag")
    .order("game_id", { ascending: false });

  if (error) {
    console.error("Error fetching newest game:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(gameweb);
}
