import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function GET(req:NextRequest){
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const {data: gameweb, error } = await supabase. from ('gamewebgamelist')
    .select('game_id,game_name,game_tag')
    .order('game_id', {ascending:false});
    if (error){
      console.log("Error fetching newest book:", error);
      return NextResponse.json({error: error.message},{status:500});
    }
    return NextResponse.json(gameweb);
}