"use client";

import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  const gologin = async () => {
    router.push("/login");
  };



  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <h1 className="text-3xl gap-20">Home</h1>



      <button
        onClick={gologin}
        className=" bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Login
      </button>
    </div>
  );
}
