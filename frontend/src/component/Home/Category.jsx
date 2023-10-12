import React from 'react'
import { Link ,useSearchParams } from 'react-router-dom'
import { Value } from './Value'

const Category = ({setcat }) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  return (
    <div>
 
      <div>
      <table>
        <tr>
          {Value.map((category) => (
            <td key={category.id} className="category-cell flex gap-4 m" onClick={()=>{
              setcat(category.type)
            }}>
          
                {category.type}
              
            </td>
          ))}
        </tr>
      </table>
      </div>
    </div>
  )
}

export default Category
