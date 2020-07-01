import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import Cart from '../../models/Cart';

connectDb();
export default async (req,res)=>{
    const {name,email,password}=req.body
    try{
        //validations
        if(!isLength(name,{min:3,max:10})){
            return res.status(422).send("Name must be 3 to 10 characters");
        } else if(!isLength(password,{min:6})){
            return res.status(422).send("Password must be 6 or more characters long");
        } else if(!isEmail(email)){
            return res.status(422).send("Email must be valid");
        }
        //1)check if the user already exist in database or not
        //2)if not hash password
        //3)crerate user
        //4)create token for new user

      const user= await   User.findOne({email})
        if(user)
        {
            return res.status(422).send("user already exists please login");
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser= await new User({
            name,
            email,
            password:hash
        }).save();

        console.log(newUser);

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {expiresIn:'1d'})
        res.status(201).json(token);
    }
    catch(error)
    {
       console.log(error);
       
    }
}