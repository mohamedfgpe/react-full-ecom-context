import React, { useContext, useEffect } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
export default function NavBar({ userData, logOut }) {
  const { wishListCount, setwishListCount,numOfCartItems } = useContext(cartContext);


  return (
    <>
      <nav className="navbar  navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="">
            <img src={logo} alt="fresh cart logo" />
          </Link>

          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userData ? (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to="/" aria-current="page">
                    Home
                    <span className="visually-hidden">(current)</span>
                  </Link>
                </li>{" "}
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/cart"
                    aria-current="page"
                  >
                    Cart
                    <span className="visually-hidden">(current)</span>
                  </Link>
                </li>{" "}
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="products"
                    aria-current="page"
                  >
                    Products
                    <span className="visually-hidden">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="/brands"
                    aria-current="page"
                  >
                    Brands
                    <span className="visually-hidden">(current)</span>
                  </Link>
                </li>{" "}
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-youtube"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-tiktok"></i>
              </li>
              {userData ? (
                <>
                  <Link to={"/wish-list"}>
                    {" "}
                    <button
                      type="button"
                      className="btn  mt-1 position-relative"
                    >
                      <i className="fa-solid fa-heart text-main fa-2x "></i>{" "}
                      <span className="position-absolute top-15 start-100 translate-middle badge rounded-pill bg-danger">
                        {wishListCount}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </button>
                  </Link>
                  <Link to={"/cart"}>
                    {" "}
                    <button
                      type="button"
                      className="btn  mt-1 position-relative"
                    >
                      <i className="fa-solid fa-shopping-cart text-main fa-regular fs-2 "></i>{" "}
                      <span className="position-absolute top-15 start-100 translate-middle badge rounded-pill bg-danger">
                        {numOfCartItems}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </button>
                  </Link>
                  <li className="nav-item">
                    <Link
                      onClick={logOut}
                      className="nav-link active"
                      to="#"
                      aria-current="page"
                    >
                      Log out
                      <span className="visually-hidden">(current)</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      to="/login"
                      aria-current="page"
                    >
                      Log In
                      <span className="visually-hidden">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
