import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function ProductDetails() {
  let { id } = useParams();
  const [product, setproduct] = useState([]);
  const [isloading, setisloading] = useState(false);
  let { addToCart,setnumOfCartItems } = useContext(cartContext);
  async function getProduct() {
    setisloading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );

    setproduct(data.data);
    setisloading(false);
  }
  async function addItemCart(productId) {
    let res = await addToCart(productId);
    if (res.status == 200) {
      toast.success("added successfully ");
      setnumOfCartItems(res.data.setnumOfCartItems);
 
      
    }
  }
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <div className="container">
        <Toaster />
        <div className="row my-5 align-items-center justify-content-center ">
          {isloading ? (
            <div className="text-center">
              <i className="fas fa-spinner fa-3x fa-spin text-main"></i>
            </div>
          ) : (
            <>
              <div className="col-md-4">
                <Slider {...settings}>
                  {product.images?.map((img) => (
                    <img className="w-100" src={img} alt={product.title} />
                  ))}
                </Slider>
              </div>

              <div className="col-md-8">
                <h3>{product.title}</h3>
                <p className="text-muted p-2">{product.description}</p>
                {product.category && (
                  <span className="text-main fw-bold font-sm">
                    {product.category.name}
                  </span>
                )}
                <div className="d-flex justify-content-between">
                  <span className="text-muted mt-2">{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star rating-color mt-2"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
                <button
                  onClick={() => addItemCart(id)}
                  className=" btn bg-main text-white w-100 mt-3"
                >
                  Add To Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
