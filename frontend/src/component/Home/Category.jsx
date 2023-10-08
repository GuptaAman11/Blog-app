import React from 'react'
import { Link ,useSearchParams } from 'react-router-dom'
import { Value } from './Value'

const Category = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  return (
    <div>
 
      <div>
      <table>
        <tr>
          {Value.map((category) => (
            <td key={category.id} className="category-cell">
              <Link to={`catpost/?category=${category.type}`}>
                {category.type}
              </Link>
            </td>
          ))}
        </tr>
      </table>
      </div>
    </div>
  )
}

export default Category
