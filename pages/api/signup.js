import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import Cart from '../../models/Cart';

connectDb();

export default async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        //validations
        if(!isLength(name,{min:3,max:10})){
            return res.status(422).send("Name must be 3 to 10 characters");
        } else if(!isLength(password,{min:6})){
            return res.status(422).send("Password must be 6 or more characters long");
        } else if(!isEmail(email)){
            return res.status(422).send("Email must be valid");
        }

        //Check if user exists
        const user = await User.findOne({email : email});
        if(user){
            return res.status(422).send(`User exists with email ${email}`);
        }

        //hash the password
        const hash = await bcrypt.hash(password, 10);

        //create user
        const newUser = await new User({
            name,
            email,
            password:hash
        }).save();
        console.log({newUser})

        //create cart for new user
        const cart = await new Cart({user:newUser._id}).save();

        //create token for new user
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {expiresIn:'7d'})

        //send token
        res.status(201).json(token);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Server error. Error signing up. Please try again');
    }
}