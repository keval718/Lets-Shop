import mongoose, { connections } from'mongoose';
const connection={}

async function connectDb()
{
    if(connections.isConnected)
    {
        console.log("using existing database");
        return;
    }
    //use a new database connection
   const db=await mongoose.connect(process.env.MONGO_SRV, {
       useCreateIndex:true,
       useFindAndModify:false,
       useNewUrlParser:true,
       useUnifiedTopology:true
   })

   console.log("db connected");
   connection.isConnected=db.connections[0].readyState;

}
export default connectDb;
//export default connectDB;