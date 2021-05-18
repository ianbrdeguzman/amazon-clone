import axios from 'axios';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCESS,
    USER_REGISTER_FAIL,
} from '../actionTypes';

export const userRegister = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
        const { data } = await axios.post(
            'http://localhost:5000/api/users/register',
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
        console.log(err.response.data.message);
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
            'http://localhost:5000/api/users/signin',
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
    dispatch({ type: USER_LOGOUT });
};
