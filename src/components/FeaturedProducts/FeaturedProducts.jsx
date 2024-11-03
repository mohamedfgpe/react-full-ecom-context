import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import toast ,{ Toaster } from "react-hot-toast";
export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [isloading, setisloading] = useState(false);
  let {addToCart,addWishProduct,setwishListCount,setnumOfCartItems} = useContext(cartContext);
  async function getProducts() {
    setisloading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProducts(data.data);
    setisloading(false);
  }
  async function addProductToCart(productId) {
    let res= await addToCart(productId);
  if (res?.status===200) {
    toast.success(res.data.message,{
      duration: 2000,
          })
          setnumOfCartItems(res.data.numOfCartItems)
  }else{
    toast.error(res.data.message,{
      duration: 2000,
      })
  }
  }
async function addWishItem(productId) {
 let res=  await addWishProduct(productId)
 if (res?.status===200) {
  toast.success("added  successfully to wishList")
  setwishListCount(res.data.data.length)
  // console.log(res,"this is the result");
  
  
 }
 

}
  useEffect(() => {
    getProducts();
    
  }, []);

  return (
    <>
      <div className="row g-2">
        {isloading ? (
          <div className="text-center">
            <i className="fas fa-spinner fa-3x fa-spin text-main"></i>
          </div>
        ) : (
          <>
          < Toaster/>
            {products.map((product) => (
              <div key={product._id} className="col-md-2 text-center">
                <div className="product cursor-pointer px-2 py-3 position-relative">
                  <Link to={"/product-details/" + product._id}>
                    <img className="w-100" src={product.imageCover} />
                    <span className="text-main fw-bold font-sm">
                      {product.category.name}
                    </span>
                    <h3 className="h6 fw-bolder">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <div className="d-flex align-items-center justify-content-around mt-2">
                    <div>
                      <i
                        onClick={() => {
                          addProductToCart(product._id);
                        }}
                        className="fa-solid fa-cart-plus text-main fa-2x "
                      ></i>
                    </div>

                    <div>
                      <i onClick={()=>addWishItem(product._id)} className="fa-solid fa-heart text-main fa-2x "></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
