import express from 'express';
import cors from 'cors';
import { data } from './data.js';

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
