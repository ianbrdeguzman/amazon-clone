import mongoose from 'mongoose';

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

const Product = mongoose.model('Product', productSchema);

export default Product;
