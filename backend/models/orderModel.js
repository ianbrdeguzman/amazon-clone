import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                title: { type: String, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            },
        ],
        shippingDetails: {
            fullname: { type: String, required: true },
            addressOne: { type: String, required: true },
            addressTwo: { type: String },
            city: { type: String, required: true },
            postal: { type: String, required: true },
            phone: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true },
        itemPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            requried: true,
        },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
