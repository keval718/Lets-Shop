import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name:{
        required:true,
        type: String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    role:{
        type:String,
        required:true,
        default:'user',
        enum:['admin','user','root']
    }
}, {
    timestamps:true
})

export default mongoose.models.User || mongoose.model("User",UserSchema);