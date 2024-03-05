"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
      ref.current.classList.add("block");
      ref.current.classList.remove("hidden");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
      ref.current.classList.add("hidden");
      ref.current.classList.remove("block");
    }
  };
  const ref = useRef();
  return (
    <div className="sticky top-0 bg-white z-10">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center shadow-md w-full">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-gray-900"
          >
            <Image src="/logo.png" alt="logo" width={200} height={40} />
          </Link>
          <nav className="md:ml-10 flex flex-wrap items-center text-base justify-center">
            <Link href={"/tshirts"} className="mr-5 hover:text-gray-900">
              Tshirts
            </Link>
            <Link href={"/hoodies"} className="mr-5 hover:text-gray-900">
              Hoodies
            </Link>
            <Link href={"/stickers"} className="mr-5 hover:text-gray-900">
              Stickers
            </Link>
            <Link href={"/mugs"} className="mr-5 hover:text-gray-900">
              Mugs
            </Link>
          </nav>
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Login
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
          <div className="ml-auto">
            <Link href={"/login"}>
              <MdAccountCircle className="text-3xl" />
            </Link>
          </div>

          <div
            onClick={toggleCart}
            className="cart absolute top-7 right-1 mx-5"
          >
            <MdShoppingCart className="text-3xl" />
          </div>
          <div
            ref={ref}
            className="sideCart h-[100vh] absolute top-0 right-0 bg-gray-100 p-10 transition-transform translate-x-full hidden"
          >
            <h2 className="font-bold text-x1">Shopping Cart</h2>
            <span onClick={toggleCart} className="absolute top-2 right-2">
              <IoMdCloseCircleOutline className="text-2xl cursor-pointer" />
            </span>
            <ol className="list-decimal font-semibold">
              {Object.keys(cart).length == 0 && (
                <div className="mt-4 w-3/4">Your cart is Empty.</div>
              )}
              {Object.keys(cart).map((k) => {
                return (
                  <li key={k}>
                    <div className="item flex my-5">
                      <div className="w-2/3 font-semibold">{cart[k].name}</div>
                      <div className="flex items-center justify-center w-1/3 text-md">
                        <FaMinus
                          onClick={() => {
                            removeFromCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].variant
                            );
                          }}
                          className="mx-3 cursor-pointer"
                        />
                        <span className="text-xl">{cart[k].qty}</span>
                        <FaPlus
                          onClick={() => {
                            addToCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].size,
                              cart[k].variant
                            );
                          }}
                          className="mx-3 cursor-pointer"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="total font-bold my-2"> Subtotal: ${subTotal}</div>

            <div className="flex">
              <Link href={"/checkout"}>
                <button className="flex mx-2 mt-16 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">
                  <IoBagCheckOutline className="m-1" />
                  Checkout
                </button>
              </Link>
              <button
                onClick={clearCart}
                className="flex mx-2 mt-16 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
