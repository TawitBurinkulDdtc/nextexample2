import Image from "next/image";
import Link from "next/link";
import React from "react";
import { createClient } from "../lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// ---------- DELETE GAME SERVER ACTION ----------
async function deleteGame(game_id: number) {
  "use server";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("gamewebgamelist")
    .delete()
    .eq("game_id", game_id);

  if (error) {
    console.log("Delete error:", error);
  }

  revalidatePath("/"); // Refresh the page
}
// -------------------------------------------------

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: gameList, error } = await supabase
    .from("gamewebgamelist")
    .select("game_id,game_name,game_tag,game_creator,game_picture")
    .order("game_id", { ascending: false });

  if (error) {
    console.log("Error fetching:", error);
  }

  if (!gameList) return <div>No data</div>;

  return (
    <div className="py-10">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Games</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {gameList.map((game) => (
          <div
            key={game.game_id}
            className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden hover:shadow-md transition group"
          >
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={game.game_picture}
                alt={game.game_name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
            </div>

            <div className="p-3">
              <a
              href={`/gamePage/${game.game_id}`}
              className="font-semibold text-gray-800 truncate group-hover:text-pink-600 transition-colors"
              >
                {game.game_name}
              </a>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                by {game.game_creator}
              </p>
              

              {/* EDIT LINK */}
              <a
                href={`/edit-game/${game.game_id}`}
                className="text-sm text-blue-600 hover:underline block mt-2"
              >
                Edit Game
              </a>

              {/* DELETE BUTTON */}
              <form action={deleteGame.bind(null, game.game_id)}>
                <button
                  type="submit"
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Delete Game
                </button>
              </form>

              <div className="mt-3 text-right">
                <span className="text-xs font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded">
                  {game.game_tag}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Games</h1>
        <a
          href="/"
          className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          Refresh
        </a>
      </div>
    </div>
  );
}
