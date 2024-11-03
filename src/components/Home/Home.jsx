import React from 'react'
import FeaturedProducts from './../FeaturedProducts/FeaturedProducts';
import Categories from './../Categories/Categories';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
  return (
    <>
    <MainSlider/>
    <Categories/>
    <br />
    <FeaturedProducts/>
    </>  )
}
