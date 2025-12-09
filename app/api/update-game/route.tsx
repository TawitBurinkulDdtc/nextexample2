import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const body = await req.json();

  const { error } = await supabase
    .from("gamewebgamelist")
    .update({
      game_name: body.game_name,
      game_tag: body.game_tag,
      game_creator: body.game_creator,
      game_picture: body.game_picture,
      game_info: body.game_info
    })
    .eq("game_id", body.game_id);

  if (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
