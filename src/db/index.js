import mongoose from "mongoose";
import { DB_NAME } from "../constaints.js";


const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDb connected !! DB HOST: ${
            connectionInstance.connection.host
        }`);
    } catch (error) {
        console.log('MONGODOB CONNECTION ERROR ', error);
        process.exit(1)
    }
}

export default connectDB;