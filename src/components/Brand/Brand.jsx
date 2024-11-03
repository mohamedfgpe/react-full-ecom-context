import React, {useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function Brand() {

  const [products, setproducts] = useState([])
  const [isloading, setisloading] = useState(false)

  async function getBrands() {
    setisloading(true)
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    setproducts(data.data);
    setisloading(false)
  }

  useEffect(() => {
    getBrands()
  }, [])

 

  return (
    <div className="row">
      {isloading ? (
        <div className='text-center'><i className='fas fa-spinner fa-3x fa-spin text-main'></i></div>
      ) : (
        <>
          {products.map((product) => (
            <div key={product._id} className="col-md-2">
              <div className="product cursor-pointer px-2 py-3">
                <Link to={''}>
                  <img className='w-100' src={product.image} />
                  <div className="text-center">

                  <h3 className='text-main fw-bold font-sm'>{product.name}</h3>
                  
                  </div>
                  
                </Link>
             
              </div>
            </div>
          ))}
        </>
        
      )}
      
    </div>
    
  )
}