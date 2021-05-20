import express from 'express';
import Order from '../models/orderModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuthenticated } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
    '/',
    isAuthenticated,
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: 'Cart is empty' });
        } else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingDetails: req.body.shippingDetails,
                paymentMethod: req.body.paymentMethod,
                itemPrice: req.body.itemPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
            });
            const createdOrder = await order.save();
            res.status(201).send({
                message: 'New order created',
                order: createdOrder,
            });
        }
    })
);

export default orderRouter;
