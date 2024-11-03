import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function WishList() {
  const { removeWishProduct, getWishProducts, getWishCount, setwishListCount } =
    useContext(cartContext);
  const [wishList, setwishList] = useState(null);
  const [isloading, setisloading] = useState(true); 

  async function deleteWishProduct(productId) {
    const res = await removeWishProduct(productId);
    if (res.status === 200) {
      await getLovedProducts();
    }
 
  }

  async function getLovedProducts() {
    setisloading(true); 
    const res = await getWishProducts();
    if (res?.status === 200) {
      setwishList(res?.data?.data);
      setwishListCount(res?.data?.data.length);
    }
    setisloading(false); 
  }

  useEffect(() => {
    getLovedProducts();
  }, []);

  return (
    <>
      <h6 className="h2 mt-3 text-center text-main">Your Wish List</h6>
      {isloading ? (
        <div className="text-center">
          <i className="fas fa-spinner fa-3x fa-spin text-main"></i>
        </div>
      ) : (
        <div className="row">
          {wishList?.map((product) => (
            <div key={product._id} className="col-md-2 text-center">
              <div className="product cursor-pointer px-2 py-3 position-relative">
                <Link to={"/product-details/" + product._id}>
                  <img className="w-100" src={product.imageCover} alt={product.title} />
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
                        // addProductToCart(product._id);
                      }}
                      className="fa-solid fa-cart-plus fs-4 text-main fa-regular "
                    ></i>
                  </div>

                  <div>
                    <i
                      onClick={() => deleteWishProduct(product._id)}
                      className="fa-solid fa-trash text-main fs-5 fa-regular "
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
