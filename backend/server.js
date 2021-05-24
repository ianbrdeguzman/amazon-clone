import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(
    `mongodb://admin:${process.env.MONGODB_ADMIN_PASSWORD}@cluster0-shard-00-00.z4nms.mongodb.net:27017,cluster0-shard-00-01.z4nms.mongodb.net:27017,cluster0-shard-00-02.z4nms.mongodb.net:27017/amazonClone?ssl=true&replicaSet=atlas-q19ry3-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }
);

mongoose.connection.once('open', () => {
    console.log('MongoDB Atlas connection successful');
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID_SB || 'sb');
});

// users route
app.use('/api/users', userRouter);

// products route
app.use('/api/products', productRouter);

// order route
app.use('/api/orders', orderRouter);

// catch error
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
