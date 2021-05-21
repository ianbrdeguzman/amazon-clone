import axios from 'axios';

import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    CART_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_LIST_MINE_REQUEST,
    ORDER_LIST_MINE_SUCCESS,
    ORDER_LIST_MINE_FAIL,
} from '../actionTypes';

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST });
    try {
        const {
            userLogin: { userInfo },
        } = getState();
        const { data } = await axios.post(
            'http://localhost:5000/api/orders',
            order,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_RESET });
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.response,
        });
    }
};
export const getOrderDetails = (id) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    try {
        const {
            userLogin: { userInfo },
        } = getState();
        const { data } = await axios.get(
            `http://localhost:5000/api/orders/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.response,
        });
    }
};
export const payOrder =
    (orderDetails, paymentResult) => async (dispatch, getState) => {
        dispatch({ type: ORDER_PAY_REQUEST });
        try {
            const {
                userLogin: { userInfo },
            } = getState();
            const { data } = await axios.put(
                `http://localhost:5000/api/orders/${orderDetails._id}/pay`,
                paymentResult,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: ORDER_PAY_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.response,
            });
        }
    };
export const orderListMine = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_MINE_REQUEST });
    try {
        const {
            userLogin: { userInfo },
        } = getState();
        const { data } = await axios.get(
            'http://localhost:5000/api/orders/mine',
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );
        dispatch({ type: ORDER_LIST_MINE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MINE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.response,
        });
    }
};
