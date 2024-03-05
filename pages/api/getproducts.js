// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
