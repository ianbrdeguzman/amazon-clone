import axios from 'axios';

export const getAllProducts = async () => {
    try {
        const { data } = await axios.get('products.json');
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getSingleProduct = async (id) => {
    try {
        const { data } = await axios.get('../products.json');
        return data;
    } catch (err) {
        console.log(err);
    }
};
