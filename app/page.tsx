import Image from "next/image";
import Link from "next/link";

import React from "react";
import { createClient } from "../lib/supabase/server";
import { cookies } from "next/headers"

export default async function Home() {
  const games = [
    {
      title: "Test1",
      tag: "Horror",
      image: "/Angry Birb.png",
      link: "https://en.wikipedia.org/wiki/Domestic_pigeon",
    },
    {
      title: "Test2",
      tag: "Horror",
      image: "/Angry Birb2.png",
      link: "/angrybird",
    },
    {
      title: "Test3",
      tag: "Simulation",
      image: "/Angry Birb3.png",
      link: "https://en.wikipedia.org/wiki/List_of_birds",
    },
    {
      title: "Test4",
      tag: "Visual novel",
      image: "/Angry Birb4.png",
      link: "https://en.wikipedia.org/wiki/Ostrich",
    },
    {
      title: "Test5",
      tag: "Visual novel",
      image: "/Angry Birb5.png",
      link: "https://en.wikipedia.org/wiki/Kiwi_(bird)",
    },
    {
      title: "Test6",
      tag: "First-Person shooter",
      image: "/Angry Birb6.png",
      link: "https://en.wikipedia.org/wiki/Soccer",
    },
    {
      title: "Test7",
      tag: "Action",
      image: "/Angry Birb7.png",
      link: "https://en.wikipedia.org/wiki/Penguin",
    },
    {
      title: "Test8",
      tag: "Rpg",
      image: "/Angry Birb8.png",
      link: "https://en.wikipedia.org/wiki/Parrot",
    },
  ];

  //New book example stuff
  const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    const {data: newestBooks, error } = await supabase. from ('bookcopy')
      .select('copyid, book( isbn, title, publisher, pubyear,language,author(name) )')
      .order('acquisitiondate', {ascending:false})
      .limit(5);
      if (error){
        console.log("Error fetching newest book:", error);
      }
      ///////
  
  return (
    <div className="py-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Games
        </h1>
        <button className="text-pink-600 font-medium hover:underline">
          View all →
        </button>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game, index) => (
          <Link
            key={index}
            href={game.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden hover:shadow-md transition group"
          >
            {/* Game Image */}
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={game.image}
                alt={game.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              
            </div>

            {/* Game Info */}
            <div className="p-3">
              <h2 className="font-semibold text-gray-800 truncate group-hover:text-pink-600 transition-colors">
                {game.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                A unique and fun indie experience called {game.title}.
              </p>

              
              <div className="mt-3 text-right">
                <span className="text-xs font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded">
                  {game.tag}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div>
        Test book stuff, huh?????
        {games[1].tag}
      </div>
    </div>
  );
}

