"use client";

import { useState, useEffect } from "react";

export default function EditGame({ params }: any) {
  const id = params.id;

  const [game, setGame] = useState<any>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchGame() {
      const res = await fetch(`/api/get-game?id=${id}`);
      const data = await res.json();
      setGame(data);
    }
    fetchGame();
  }, [id]);

  if (!game) return <div>Loading...</div>;

  async function handleUpdate(e: any) {
    e.preventDefault();

    const res = await fetch("/api/update-game", {
      method: "POST",
      body: JSON.stringify({
        game_id: id,
        game_name: game.game_name,
        game_tag: game.game_tag,
        game_creator: game.game_creator,
        game_picture: game.game_picture
      })
    });

    if (res.ok) {
      setStatus("Game updated successfully!");
    } else {
      setStatus("Error updating game.");
    }
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Game</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          value={game.game_name}
          onChange={(e) => setGame({ ...game, game_name: e.target.value })}
        />
        <input
          className="w-full border p-2 rounded"
          value={game.game_tag}
          onChange={(e) => setGame({ ...game, game_tag: e.target.value })}
        />
        <input
          className="w-full border p-2 rounded"
          value={game.game_creator}
          onChange={(e) => setGame({ ...game, game_creator: e.target.value })}
        />
        <input
          className="w-full border p-2 rounded"
          value={game.game_picture}
          onChange={(e) => setGame({ ...game, game_picture: e.target.value })}
        />

        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Update Game
        </button>

        {status && <p className="text-green-600 mt-2">{status}</p>}
      </form>
    </div>
  );
}
