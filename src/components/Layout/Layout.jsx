import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from './../Footer/Footer';

export default function Layout({userData,logOut}) {
  return (
    <>
      <NavBar logOut={logOut} userData={userData} />{" "}
      <div className="container">
        <Outlet></Outlet>

     </div>        <Footer/>

    </>
  );
}
