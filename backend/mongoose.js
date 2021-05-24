import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectMongoose = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGODB_ADMIN_USER}:${process.env.MONGODB_ADMIN_PASS}@cluster0.7jott.mongodb.net/amazonCloneDB?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            }
        );
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
};

export default connectMongoose;
