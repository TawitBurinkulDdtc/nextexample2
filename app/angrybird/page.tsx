import Image from "next/image";
import Link from "next/link"; // ✅ add this import
export default function AngryBirdPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold text-green-700">Angry Bird</h1>
      <p className="mt-4">Welcome to the Angry Bird info page!</p>
    </div>
  );
}