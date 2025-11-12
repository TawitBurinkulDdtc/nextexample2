import Image from "next/image";
import Link from "next/link"; 

export default function Home() {
  const games = [
    {
      title: "Bittersweet Birthday",
      price: "$14.39",
      discount: "20% OFF",
      image: "/Angry Birb.png",
    },
    {
      title: "Indiepocalypse #70",
      price: "$15",
      image: "/Angry Birb2.png",
    },
    {
      title: "No Players Online",
      price: "$13.49",
      discount: "10% OFF",
      image: "/Angry Birb3.png",
    },
    {
      title: "Doce Fim ~sweetend placebo~",
      price: "WEB",
      image: "/Angry Birb4.png",
    },
    {
      title: "Servant of the Lake",
      price: "FREE",
      image: "/Angry Birb5.png",
    },
    {
      title: "Sokker",
      price: "$3",
      image: "/Angry Birb6.png",
    },
    {
      title: "Gnomeball",
      price: "FREE",
      image: "/Angry Birb7.png",
    },
    {
      title: "Sportaldislexicartaphobia",
      price: "FREE",
      image: "/Angry Birb8.png",
    },
  ];

  return (
    <div className="py-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Latest Featured Games
        </h1>
        <button className="text-pink-600 font-medium hover:underline">
          View all →
        </button>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden hover:shadow-md transition"
          >
            {/* Game Image */}
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={game.image}
                alt={game.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                unoptimized
              />
              <Link
                href="https://en.wikipedia.org/wiki/Domestic_pigeon" 
                className="bg-gradient-to-r from-green-600 to-green-600 text-white px-6 py-3 rounded-full 
                text-lg font-semibold hover:to-green-700 transition"
              ></Link>
              {game.discount && (
                <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {game.discount}
                </div>
              )}
            </div>

            {/* Game Info */}
            <div className="p-3">
              <h2 className="font-semibold text-gray-800 truncate">
                {game.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                A unique and fun adventure featuring {game.title}.
              </p>

              <div className="mt-3 text-right">
                <span className="text-xs font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded">
                  {game.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
