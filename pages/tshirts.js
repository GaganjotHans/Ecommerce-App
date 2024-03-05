/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import Product from "../models/Product";
import mongoose from "mongoose";
const Tshirts = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {products.map((item) => {
              return (
                <div
                  key={item._id}
                  className="lg:w-1/4 md:w-1/2 p-8 w-full shadow-lg "
                >
                  <Link
                    href={`/product/${item.slug}`}
                    className="block relative rounded overflow-hidden"
                  >
                    <img
                      alt="ecommerce"
                      className="object-cover object-center w-full h-[40vh] block"
                      src={item.img}
                    />
                  </Link>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {item.category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {item.title}
                    </h2>
                    <p className="mt-1">${item.price}</p>
                    <p className="mt-1">{item.size}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "tshirt" });
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}
export default Tshirts;
