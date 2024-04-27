import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Value } from './Value';

const Category = ({ setcat }) => {
  const [searchParams] = useSearchParams();
  const cat = searchParams.get('category');

  return (
    <div>
      <div className="flex gap-4">
        {Value.map((category) => (
          <button
            key={category.id}
            className={`py-2 px-4 bg-purple-700 mb-8 text-white rounded hover:bg-purple-800 ${
              cat === category.type ? "bg-purple-800" : ""
            }`}
            onClick={() => {
              setcat(category.type);
            }}
          >
            {category.type}
          </button>
        ))}
      </div>
      {cat && <p>Selected Category: {cat}</p>}
    </div>
  );
}

export default Category;
