import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export function CartContextProvider(props) {
  const [wishListCount, setwishListCount] = useState(0);
  //   const [wishList, setwishList] = useState(null);
  const [cartId, setcartId] = useState(null);
  const [numOfCartItems, setnumOfCartItems] = useState(0);

  async function getWishCount() {
    const res = await getWishProducts();
    setwishListCount(res?.data?.count);
  }
  async function getCart() {
    const response = await GetLoggedUserCart();
    if (response?.status === 200) {
      setcartId({cartId:response?.data?.cartId});
      setnumOfCartItems(response?.data?.numOfCartItems);
    }
  }
  useEffect(() => {
    getWishCount();
    getCart();
  }, []);

  const headers = {
    token: localStorage.getItem("userToken"),
  };

  function GetLoggedUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((reponse) => reponse)
      .catch((error) => error);
  }
  function addToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((reponse) => reponse)
      .catch((error) => error);
  }
  function removeFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((reponse) => reponse)
      .catch((error) => error);
  }
  function updateFromCart(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((reponse) => reponse)
      .catch((error) => error);
  }
  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((reponse) => reponse)
      .catch((error) => error);
  }
  function onlinePayment(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://mohamedfgpe.github.io/`,
        { shippingAddress:shippingAddress },
        {
          headers,
        }
      )
      .then((reponse) => reponse)
      .catch((error) => error);
  }
  function addWishProduct(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        {
          headers,
        }
      )
      .then((reponse) => reponse)
      .catch((error) => error);
  }
  function getWishProducts() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then((reponse) => reponse)
      .catch((error) => error);
  }
  function removeWishProduct(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((reponse) => reponse)
      .catch((error) => error);
  }
  return (
    <cartContext.Provider
      value={{
        cartId,
        numOfCartItems,
        removeWishProduct,
        // setwishList,
        // wishList,

        wishListCount,
        addToCart,
        GetLoggedUserCart,
        removeFromCart,
        getWishProducts,
        addWishProduct,
        clearCart,
        updateFromCart,
        setnumOfCartItems,
        setwishListCount,
        getWishCount,
        getWishProducts,
        onlinePayment,
        getCart
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
