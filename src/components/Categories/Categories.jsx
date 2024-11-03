import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  async function getCategory() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategories(data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
     
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id}>
              <img
                className="w-100"
                height={200}
                src={category.image}
                alt={category.name}
              />
              <h2 className="h6 pt-2">{category.name}</h2>
            </div>
          ))}
        </Slider>
    </>
  );
}
