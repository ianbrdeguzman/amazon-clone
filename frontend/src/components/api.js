import axios from 'axios';

export const getAllProducts = async () => {
    try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getSingleProduct = async (id) => {
    try {
        const { data } = await axios.get(
            `http://localhost:5000/api/products/${id}`
        );
        return data;
    } catch (err) {
        console.log(err);
    }
};
