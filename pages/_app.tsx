import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

interface CartItem {
  qty: number;
  price: number;
  name: string;
  size: string;
  variant: string;
}

export default function App({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    try {
      console.log("Hey there");
      const storedCart = localStorage.getItem("cart");
      if (storedCart !== null) {
        setCart(JSON.parse(storedCart));
      } else {
        console.log("Nothing in the local storage cart");
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

  const addToCart = (
    itemCode: string,
    qty: number,
    price: number,
    name: string,
    size: string,
    variant: string
  ) => {
    const newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const saveCart = (myCart: any) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart({});
    setSubTotal(0);
  };
  const removeFromCart = (
    itemCode: string,
    qty: number,
    price: number,
    name: string,
    size: string,
    variant: string
  ) => {
    const newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };
  return (
    <>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
      />
      ;
      <Footer />
    </>
  );
}
