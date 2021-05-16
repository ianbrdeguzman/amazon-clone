import axios from 'axios';

import { ADD_TO_CART } from '../actionTypes';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
    );
    dispatch({
        type: ADD_TO_CART,
        payload: {
            title: data.title,
            image: data.image,
            price: data.price,
            stock: data.stock,
            productId: data._id,
            quantity,
        },
    });
    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
};
