import mongoose, { ConnectionOptions } from "mongoose";
import config from "./configuration";

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const MONGODB_DB_NAME = config.DB.MONGODB_DB_NAME;
const MONGODB_USER = config.DB.MONGODB_USER;
const MONGODB_PASSWD = config.DB.MONGODB_PASSWD;

// connected to mongodb atlas
const MONGO_DB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWD}@cluster0.nwfuy.gcp.mongodb.net/${MONGODB_DB_NAME}?retryWrites=true&w=majority`

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(MONGO_DB_URI, dbOptions)
        console.log(`Mongodb connection stablished`);
    
    } catch (error) {
        console.log(`Error connecting to database: ${err}`);
        process.exit(1);   
    }
}

export default connectDB;
