import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
    },
    {
        timestamps: true,
    }
);

const conn = await mongoose.createConnection(
    `mongodb+srv://admin:${process.env.MONGODB_ADMIN_PASS}@cluster0.7jott.mongodb.net/amazonCloneDB?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }
);

const User = conn.model('User', userSchema);

export default User;
