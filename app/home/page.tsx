import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("https://wallpapercave.com/wp/wp3510568.jpg")',
      }}
      className="w-ful h-screen bg-cover bg-center "
    >
      <div className="flex flex-col justify-center items-center gap-5 ">
        <h1 className="font-bold text-4xl mt-12 ">Welcome To Our Resturant</h1>

        <Link href="/menu" >
        <button className=" bg-blue-500 rounded-xl px-6 py-4 hover:bg-blue-800 cursor-pointer ">
          {" "}
          Menu{" "}
        </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
