import { NextResponse } from "next/server";
import { cookies } from "next/headers";
//import { createClient } from "@/app/lib/supabase/server";
import { createClient } from "../../../lib/supabase/server";
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const body = await req.json();

  const { error } = await supabase.from("gamewebgamelist").insert([
    {
      game_name: body.game_name,
      game_tag: body.game_tag,
      game_creator: body.game_creator,
      game_picture: body.game_picture,
      game_info: body.game_info
    },
  ]);

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
