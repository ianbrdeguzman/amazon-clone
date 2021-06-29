import axios from 'axios';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,
    USER_UPDATE_DETAILS_REQUEST,
    USER_UPDATE_DETAILS_FAIL,
    USER_UPDATE_DETAILS_SUCCESS,
    USER_UPDATE_DETAILS_RESET,
} from '../actionTypes';
export const userRegister = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
        const { data } = await axios.post(
            // 'https://protected-brook-28606.herokuapp.com/api/users/register',
            'https://us-central1-fir-functions-71d1b.cloudfunctions.net/app/api/user/register',
            {
                name,
                email,
                password,
            }
        );

        dispatch({ type: USER_REGISTER_SUCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
    }
};
export const userLogin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
        const { data } = await axios.post(
            // 'https://protected-brook-28606.herokuapp.com/api/users/signin',
            'https://us-central1-fir-functions-71d1b.cloudfunctions.net/app/api/user/signin',
            {
                email,
                password,
            }
        );

        dispatch({ type: USER_LOGIN_SUCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
    }
};
export const userLogout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingDetails');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_UPDATE_DETAILS_RESET });
};
export const userDetails = (userId) => async (dispatch) => {
    dispatch({ type: USER_DETAILS_REQUEST });
    try {
        const { data } = await axios.get(
            // `https://protected-brook-28606.herokuapp.com/api/users/${userId}`
            `https://us-central1-fir-functions-71d1b.cloudfunctions.net/app/api/user/${userId}`
        );
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
    }
};
export const userUpdateDetails = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_DETAILS_REQUEST });
    try {
        const {
            userLogin: { userInfo },
        } = getState();
        const { data } = await axios.put(
            // `https://protected-brook-28606.herokuapp.com/api/users/profile`,
            'https://us-central1-fir-functions-71d1b.cloudfunctions.net/app/api/user/profile',
            user,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );
        dispatch({ type: USER_UPDATE_DETAILS_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        dispatch({
            type: USER_UPDATE_DETAILS_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        });
    }
};
