import Image from "next/image";
import { cookies } from "next/headers";
import { createClient } from "../../../lib/supabase/server";

type GamePageProps = {
  params: { id: string };
};

export default async function GamePage({ params }: GamePageProps) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const gameId = Number(params.id);

  // Fetch this game's data
  const { data: game, error } = await supabase
    .from("gamewebgamelist")
    .select("game_id, game_name, game_tag, game_creator, game_picture")
    .eq("game_id", gameId)
    .single();

  if (error || !game) {
    console.log("Error fetching game:", error);
    return <div className="pt-10 text-center text-red-500">Game not found.</div>;
  }

  return (
    <div className="py-10">
      {/* Game Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {game.game_name}
      </h1>

      {/* Image */}
      <div className="relative w-full max-w-3xl h-80 mx-auto mb-6 rounded-md overflow-hidden shadow">
        <Image
          src={game.game_picture}
          alt={game.game_name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Game Info */}
      <div className="bg-white p-6 rounded-md shadow max-w-3xl mx-auto">
        <p className="text-lg text-gray-700 mb-3">
          <span className="font-semibold">Creator:</span> {game.game_creator}
        </p>

        <p className="text-lg text-gray-700 mb-3">
          <span className="font-semibold">Tag:</span>{" "}
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
            {game.game_tag}
          </span>
        </p>

        {/* Link back */}
        <a
          href="/"
          className="inline-block mt-6 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          ← Back to Games
        </a>
      </div>
    </div>
  );
}
