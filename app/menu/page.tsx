"use client";


import ChatBot from "@/components/ChatBot";
import { menuApi } from "@/services/menuApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LiaRobotSolid } from "react-icons/lia";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

const MenuPage = () => {
  const [products, setProducts] = useState<Meal[]>([]);
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(true);
  };

  useEffect(() => {
    const getProducts = async () => {
      const data = await menuApi();
      setProducts(data.meals);
    };

    getProducts();
  }, []);

  return (
    <div className="w-full min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            key={item.idMeal}
            className="rounded-xl overflow-hidden shadow-md"
          >
            <Image
              src={item.strMealThumb}
              alt={item.strMeal}
              width={400}
              height={300}
              className="w-full h-60 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-bold">{item.strMeal}</h2>

              <p className="text-gray-500">{item.strCategory}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        onClick={handleClick}
        className="fixed right-6 bottom-4 cursor-pointer"
      >
        <LiaRobotSolid className="text-5xl" />
      </div>

      {/* ChatBot Modal */}
      {click && (
        <div className="fixed right-6 bottom-20 z-50">
          <ChatBot
            onClose={() => setClick(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MenuPage;
