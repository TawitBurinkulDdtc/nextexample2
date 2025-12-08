"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../lib/supabase/client"; // <-- client-side Supabase

export default function EditGame({ params }: any) {
  const id = params.id;

  const [game, setGame] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchGame() {
      const res = await fetch(`/api/get-game?id=${id}`);
      const data = await res.json();
      setGame(data);
    }
    fetchGame();
  }, [id]);

  if (!game) return <div>Loading...</div>;

  // -------------------- HANDLE UPDATE --------------------
  async function handleUpdate(e: any) {
    e.preventDefault();
    setStatus("Updating...");

    let newImageURL = game.game_picture;

    // ----------- 1. If an image was selected, upload it -------------
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `game_${id}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("game_images")
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: true
        });

      if (uploadError) {
        console.error("Upload Error:", uploadError.message, uploadError);
        setStatus("Error uploading image: " + uploadError.message);
        return;
      }


      // Get public URL
      const { data: publicURLData } = supabase.storage
        .from("game_images")
        .getPublicUrl(filePath);

      newImageURL = publicURLData.publicUrl;
    }

    // ----------- 2. Update database using your API route -------------
    const res = await fetch("/api/update-game", {
      method: "POST",
      body: JSON.stringify({
        game_id: id,
        game_name: game.game_name,
        game_tag: game.game_tag,
        game_creator: game.game_creator,
        game_picture: newImageURL,
        game_info: game.game_info
      })
    });

    if (res.ok) {
      setStatus("Game updated successfully!");
    } else {
      setStatus("Error updating game.");
    }
  }
  // --------------------------------------------------------

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Game</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>game name</div>
        <input
          className="w-full border p-2 rounded"
          value={game.game_name}
          onChange={(e) => setGame({ ...game, game_name: e.target.value })}
        />
        <div>game tag</div>
        <input
          className="w-full border p-2 rounded"
          value={game.game_tag}
          onChange={(e) => setGame({ ...game, game_tag: e.target.value })}
        />
        <div>game creator</div>
        <input
          className="w-full border p-2 rounded"
          value={game.game_creator}
          onChange={(e) => setGame({ ...game, game_creator: e.target.value })}
        />
        <div>game info</div>
        <input
          className="w-full border p-2 rounded"
          value={game.game_info}
          onChange={(e) => setGame({ ...game, game_info: e.target.value })}
        />
        
        {/* Show current image */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Current Image:</p>
          <img
            src={game.game_picture}
            alt="Current game image"
            className="w-48 rounded border"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium">Upload New Image (jpg/png)</label>
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
          Update Game
        </button>

        {status && <p className="text-green-600 mt-2">{status}</p>}
      </form>
    </div>
  );
}
