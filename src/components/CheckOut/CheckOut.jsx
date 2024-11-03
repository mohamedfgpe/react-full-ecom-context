import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { cartContext } from "./../../context/CartContext";

export default function CheckOut() {
  const { onlinePayment ,GetLoggedUserCart } = useContext(cartContext);
  const [cartId, setcartId] = useState(null)
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: onlinePay,
  });
async  function onlinePay() {
const res=  await onlinePayment(cartId,formik?.values);
if (res?.status===200) {
  window.location.href=res?.data?.session?.url
}else{
  
}

  }
 async function getCartId() {
    const res=await GetLoggedUserCart();
    if (res?.status===200) {
      setcartId(res?.data?.cartId)
    }

  }

useEffect(() => {
  getCartId()
}, [])


  return (
    <>
      <br />
      <h6 className="h3 text-center">Shipping Address</h6>
      <form onSubmit={formik.handleSubmit} className="w-50 m-auto">
        <label htmlFor="details">Details : </label>
        <input
          type="text"
          id="details"
          onChange={formik.handleChange}
          value={formik.values.details}
          name="details"
          className="form-control mb-3"
        />

        <label htmlFor="city">City : </label>
        <input
          type="text"
          id="city"
          onChange={formik.handleChange}
          value={formik.values.city}
          name="city"
          className="form-control mb-3"
        />

        <label htmlFor="phone">Phone : </label>
        <input
          type="text"
          id="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
          name="phone"
          className="form-control mb-3"
        />

        <button type="submit" className="btn bg-main mt-4">
          <a className="text-white">Check Out</a>
        </button>
      </form>
    </>
  );
}
