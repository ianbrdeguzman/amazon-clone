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
        const { data } = await axios.get(
            // 'https://protected-brook-28606.herokuapp.com/api/products'
            'https://us-central1-fir-functions-71d1b.cloudfunctions.net/app/api/product'
        );
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: err });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });
        const { data } = await axios.get(
            // `https://protected-brook-28606.herokuapp.com/api/products/${id}`
            `https://us-central1-fir-functions-71d1b.cloudfunctions.net/app/api/product/${id}`
        );
        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: PRODUCT_DETAIL_FAIL, payload: err });
    }
};
