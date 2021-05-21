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

orderRouter.get(
    '/:id',
    isAuthenticated,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order Not Found.' });
        }
    })
);

orderRouter.put(
    '/:id/pay',
    isAuthenticated,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = new Date();
            paymentDetails = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };
            const updatedOrder = await order.save();
            res.send({ message: 'Order Paid.', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found.' });
        }
    })
);

export default orderRouter;
