"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client"; // client-side supabase

export default function AddGame() {
  const supabase = createClient();

  const [gameName, setGameName] = useState("");
  const [gameTag, setGameTag] = useState("");
  const [gameCreator, setGameCreator] = useState("");
  const [gameInfo, setGameInfo] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Adding game...");

    let imageURL = "";

    // -------- 1. Upload image if selected ----------
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const fileName = `game_${Date.now()}.${ext}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("game_images")
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false
        });

      if (uploadError) {
        console.error(uploadError);
        setStatus("Error uploading image: " + uploadError.message);
        return;
      }

      // Get public URL
      const { data: publicURLData } = supabase.storage
        .from("game_images")
        .getPublicUrl(filePath);

      imageURL = publicURLData.publicUrl;
    }

    // -------- 2. Submit to your API route ----------
    const res = await fetch("/api/add-game", {
      method: "POST",
      body: JSON.stringify({
        game_name: gameName,
        game_tag: gameTag,
        game_creator: gameCreator,
        game_picture: imageURL, // ← important
        game_info: gameInfo
      })
    });

    if (res.ok) {
      setStatus("Game added successfully!");
      setGameName("");
      setGameTag("");
      setGameCreator("");
      setGameInfo("");
      setImageFile(null);
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
          placeholder="Game Info"
          value={gameInfo}
          onChange={(e) => setGameInfo(e.target.value)}
        />

        {/* Image Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium">Upload Image (jpg/png)</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="w-full border p-2 rounded"
          />
        </div>

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
