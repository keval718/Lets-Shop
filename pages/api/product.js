import Product from '../../models/Product';
import ProductList from '../../components/Index/ProductList';
import connectDB from '../../utils/connectDb';

connectDB();

export default async (req,res)=>{
  switch(req.method)
  {
    case "GET": 
    await handleGetRequest(req,res);
    break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "DELETE":
    await handleDeleteRequest(req,res);
    break;
    default:
      res.status(405).send(`Method:${req.method} not allowed`)
      break;

  }
}

async function handleGetRequest(req,res){
  const {_id}=req.query
  const response=await Product.findOne({_id})
  res.status(200).json(response);

}

async function handleDeleteRequest(req,res){
  const {_id}=req.query
   await Product.findOneAndDelete({_id})
   res.status(204).json({})

}
async function handlePostRequest(req, res) {
  //this is called destructing
  const { name, price, description, mediaUrl } = req.body;
  console.log("In product end point "+name+price+description+mediaUrl);
  try {
    if (!name || !price || !description || !mediaUrl) {
      return res.status(422).send("Product missing one or more fields");
    }
    const product = await new Product({
      name,
      price,
      description,
      mediaUrl
    }).save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error in creating product");
  }
}