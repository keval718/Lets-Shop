import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb();

export default async(req,res)=>{
    const {email,password} = req.body;
    try 
    {
        //check if user exists
        const user = await User.findOne({email}).select('+password');
        
        //return error if user doesn't exist
        if(!user){
            return res.status(404).send("No user exists with this email");
        }

        //check if password is correct
        const isPassword = await bcrypt.compare(password,user.password);

        //generate token
        if(isPassword){
            const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
            //send token
            res.status(200).json(token);
        }
        else{
            res.status(401).send('Passwords do not match');
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in a user')
    }
}