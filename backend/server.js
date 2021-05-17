import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(
    process.env.MONGODB_URL ||
        `mongodb+srv://admin:${process.env.MONGODB_ADMIN_PASSWORD}@cluster0.z4nms.mongodb.net/amazonClone`,
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

// users route
app.use('/api/users', userRouter);

// products route
app.use('/api/products', productRouter);

// catch error
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
