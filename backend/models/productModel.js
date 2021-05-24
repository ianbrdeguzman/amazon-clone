import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        reviews: { type: Number, required: true },
        rating: { type: Number, required: true },
        stock: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
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

const Product = conn.model('Product', productSchema);

export default Product;
