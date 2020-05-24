import Product from '../../models/Product'
import connectDB from '../../utils/connectDb'
import { connections } from 'mongoose'
connectDB();
export default async (req,res)=>{
 const products=await Product.find();
 console.log(products);
 res.status(200).json(products);

}