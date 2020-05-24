import Productlist from '../../models/Product';
export default async (req,res)=>{
    const {_id}=req.query
    const response=await Productlist.findOne({_id})
      res.status(200).json(response);
    
}