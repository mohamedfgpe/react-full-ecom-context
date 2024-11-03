import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "./../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';

export default function Cart() {
  const { GetLoggedUserCart, removeFromCart, clearCart, setnumOfCartItems,updateFromCart } =
    useContext(cartContext);
  const [cartDetails, setcartDetails] = useState(null);
  const [isloading, setisloading] = useState(true); 

  async function getCartDetails() {
    setisloading(true); 
    try {
      const res = await GetLoggedUserCart();
      if (res?.status === 200) {
        setcartDetails(res.data.data);
      } else {
        toast.error("Failed to fetch cart details");
      }
    } catch (error) {
      console.error("Error fetching cart details:", error);
      toast.error("An error occurred while fetching cart details");
    } finally {
      setisloading(false); 
    }
  }

  async function deleteItemsCart(productId) {
    try {
      const res = await removeFromCart(productId);
      if (res?.status === 200) {
        setcartDetails(res.data.data);
        setnumOfCartItems(res?.data?.data?.products?.length)

        toast.success("Item successfully removed");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("An error occurred while removing item");
    } 
  }

  async function cleanCart() {
    try {
      await clearCart();
      setcartDetails(null);
      toast.success("Cart cleared successfully");

      setnumOfCartItems(0)
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("An error occurred while clearing the cart");
    } 
  }

  async function updateProductCount(productId, count) {
    if (count < 1) return; 
    try {
      const res = await updateFromCart(productId, count);
      if (res?.status === 200) {
        setcartDetails(res.data.data);
        toast.success("Quantity successfully updated");
      } else {
        toast.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
      toast.error("An error occurred while updating quantity");
    } finally {
    }
  }

  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <>
      <Toaster />
      {isloading ? (
        <div className="text-center">
          <i className="fas fa-spinner fa-3x fa-spin text-main"></i>
        </div>
      ) : (
        <div className="bg-main-light p-4 my-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3>Shop Cart:</h3>
              <h6 className="text-main">
                Total Cart Price: {cartDetails?.totalCartPrice} EGP
              </h6>
            </div>
            <div className="text-white">
              <button onClick={cleanCart} className="btn bg-main btn-main m-auto">
                Clear Cart
              </button>
            </div>
          </div>
          {cartDetails?.products?.map((product) => (
            <div
              key={product.product._id}
              className="row align-items-center border-bottom py-2"
            >
              <div className="col-md-2">
                <img
                  className="w-100"
                  src={product.product.imageCover}
                  alt={product.product.title}
                />
              </div>
              <div className="col-md-10 d-flex justify-content-between">
                <div>
                  <h6>{product.product.title}</h6>
                  <h6 className="text-main">{product.price} EGP</h6>
                  <button
                    onClick={() => deleteItemsCart(product.product._id)}
                    className="btn m-0 p-0"
                  >
                    <i className="fa-regular text-main fa-trash-can"></i> Remove
                  </button>
                </div>
                <div>
                  <button
                    onClick={() =>
                      updateProductCount(product.product._id, product.count + 1)
                    }
                    className="btn border-main btn-sm"
                  >
                    +
                  </button>
                  <span>{product.count}</span>
                  <button
                    onClick={() =>
                      updateProductCount(product.product._id, product.count - 1)
                    }
                    className="btn border-main btn-sm"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="btn bg-main mt-4" >
            <Link className="text-white" to={"/checkout"}>
            Check Out
            </Link>
          </button>
        </div>
      )}
    </>
  );
}
