/* eslint-disable @next/next/no-img-element */
import React from "react";
import mongoose from "mongoose";
import Order from "../models/Order";

const Orders = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Codeswear.com
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Order Id: #1234567
            </h1>
            <div className="flex mb-4">
              <a className="flex-grow border-b-2 border-pink-500 py-2 text-lg  px-1">
                Item Description
              </a>
              <a className="flex-grow border-b-2 border-pink-500 py-2 text-lg text-end px-1">
                Quantity
              </a>
              <a className="flex-grow border-b-2 border-pink-500 py-2 text-lg text-end px-1">
                Price
              </a>
            </div>

            <div className="flex border-gray-200 py-2">
              <span className="text-gray-500">Wear the code (XL/Black)</span>
              <span className="ml-auto text-gray-900">1</span>
              <span className="ml-auto text-gray-900">$58</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Wear the code(MD/White)</span>
              <span className="ml-auto text-gray-900">2</span>
              <span className="ml-auto text-gray-900">$68</span>
            </div>
            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
              <span className="text-gray-500">Wear the code(MD/White)</span>
              <span className="ml-auto text-gray-900">2</span>
              <span className="ml-auto text-gray-900">$68</span>
            </div>
            <p className="leading-relaxed mb-4">
              Your order has been successfully placed.
            </p>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                SubTotal: $58.00
              </span>
              <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.find({ slug: context.query.slug });

  return {
    props: {
      orders: orders,
    },
  };
}
export default Orders;
