import axios from 'axios';

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
} from '../actionTypes';

export const getProductList = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get('http://localhost:5000/api/products');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: err });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });
        const { data } = await axios.get(
            `http://localhost:5000/api/products/${id}`
        );
        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: PRODUCT_DETAIL_FAIL, payload: err });
    }
};
