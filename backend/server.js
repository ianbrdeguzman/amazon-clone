import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { data } from './data.js';
import userRouter from './routers/userRouter.js';

mongoose.connect(
    process.env.MONGODB_URL ||
        'mongodb+srv://admin:admin123@cluster0.z4nms.mongodb.net/amazonClone',
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

app.get('/api/products', (req, res) => {
    res.json(data.products);
});

app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const product = data.products.find((item) => item._id === parseInt(id));
    res.json(product);
});

app.use('/api/users', userRouter);

// catch error
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
