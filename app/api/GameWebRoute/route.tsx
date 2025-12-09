import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

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
