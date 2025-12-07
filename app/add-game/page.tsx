"use client";

import { useState } from "react";

export default function AddGame() {
  const [gameName, setGameName] = useState("");
  const [gameTag, setGameTag] = useState("");
  const [gameCreator, setGameCreator] = useState("");
  const [gamePicture, setGamePicture] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/add-game", {
      method: "POST",
      body: JSON.stringify({
        game_name: gameName,
        game_tag: gameTag,
        game_creator: gameCreator,
        game_picture: gamePicture
      }),
    });

    if (res.ok) {
      setStatus("Game added successfully!");
      setGameName("");
      setGameTag("");
      setGameCreator("");
      setGamePicture("");
    } else {
      setStatus("Error adding game.");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Add New Game</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Game Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Tag"
          value={gameTag}
          onChange={(e) => setGameTag(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Creator"
          value={gameCreator}
          onChange={(e) => setGameCreator(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Image URL"
          value={gamePicture}
          onChange={(e) => setGamePicture(e.target.value)}
        />
        
        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Add Game
        </button>

        {status && <p className="text-green-600 mt-2">{status}</p>}
      </form>
    </div>
  );
}