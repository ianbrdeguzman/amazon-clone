import axios from 'axios';

import {
    CART_ADD_ITEM,
    CART_ADD_SHIPPING_ADDRESS,
    CART_REMOVE_ITEM,
} from '../actionTypes';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
    );
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            title: data.title,
            image: data.image,
            price: data.price,
            stock: data.stock,
            productId: data._id,
            quantity,
        },
    });
    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
    );
};
export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id });
    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
    );
};
export const addShippingAddress = (data) => async (dispatch) => {
    dispatch({ type: CART_ADD_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};
