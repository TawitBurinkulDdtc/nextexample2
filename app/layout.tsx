import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game Search Showcase",
  description: "Inspired by Itch.io, made with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* Top Navigation Bar */}
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-14">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-6 text-sm font-medium text-gray-700">
              <a href="/#" className="hover:text-pink-600">
                Game web Uni Project
              </a>
            </nav>

            {/* Search Bar + Buttons */}
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search for games with tags or creators"
                className="w-64 sm:w-80 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              
              <button className="text-sm font-medium text-gray-700 hover:text-pink-600">
                <a href="/loginPage" className="hover:text-pink-600">
                  Log in
                </a>
              </button>
              <button className="text-sm font-medium bg-pink-600 text-white px-3 py-1.5 rounded hover:bg-pink-700 transition">
                <a href="/registerPage" className="hover:text-pink-600">
                  Register
                </a>
              </button>
            </div>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="pt-16 max-w-7xl mx-auto px-6">{children}</main>
      </body>
    </html>
  );
}
