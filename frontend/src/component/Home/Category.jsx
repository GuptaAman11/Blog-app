import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Value } from './Value';

const Category = ({ setcat }) => {
  const [searchParams] = useSearchParams();
  const cat = searchParams.get('category');

  return (
    <div className="container mx-auto px-4 max-w-6xl flex flex-col items-center justify-center">
      <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center items-center">
        {Value?.map((category) => (
          <button
            key={category?.id}
            className={`py-2 px-4 sm:py-2.5 sm:px-6 bg-purple-700 mb-4 text-white rounded-lg hover:bg-purple-800 
            text-sm sm:text-base font-bold transition-all duration-300 shadow-md hover:shadow-lg
            ${cat === category?.type ? "bg-purple-800 scale-105" : ""}`}
            onClick={() => {
              setcat(category?.type);
            }}
          >
            {category?.type}
          </button>
        ))}
      </div>
      {cat && <p className="text-center text-xl font-semibold mt-4">Selected Category: {cat}</p>}
    </div>
  );
}

export default Category;
