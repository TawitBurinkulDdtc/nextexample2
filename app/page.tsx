import Image from "next/image";
import Link from "next/link";

import React from "react";
import { createClient } from "../lib/supabase/server";
import { cookies } from "next/headers"





export default async function Home() {
    const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
    
    const {data: gameList, error } = await supabase. from ('gamewebgamelist')
      .select('game_id,game_name,game_tag,game_creator,game_picture')
      .order('game_id', {ascending:false});
      if (error){
        console.log("Error fetching newest book:", error);
      }
      ///////
  
  

  if(gameList == null){
    return(<div>No data </div>);
  }


  return (
    <div className="py-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Games
        </h1>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {gameList.map((game, index) => (
          <Link
            key={index}
            href={"fake link"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden hover:shadow-md transition group"
          >
            {/* Game Image */}
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={game.game_picture} //picure here
                alt={"/Angry Birb5.png"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              
            </div>

            {/* Game Info */}
            <div className="p-3">
              <h2 className="font-semibold text-gray-800 truncate group-hover:text-pink-600 transition-colors">
                {game.game_name}
              </h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                by {game.game_creator}.
              </p>

              
              <div className="mt-3 text-right">
                <span className="text-xs font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded">
                  {game.game_tag}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

