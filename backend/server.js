import express from 'express';
import cors from 'cors';
import { data } from './data.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
    res.json(data.products);
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
