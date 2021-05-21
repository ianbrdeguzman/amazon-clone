import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS,
} from '../actionTypes';

export const orderCreateReducer = (
    state = {
        isLoading: false,
        success: false,
        order: {},
        errorMessage: '',
    },
    action
) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { ...state, isLoading: true };
        case ORDER_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                order: action.payload,
            };
        case ORDER_CREATE_FAIL:
            return { ...state, isLoading: false, errorMessage: action.payload };
        case ORDER_CREATE_RESET:
            return {
                isLoading: false,
                success: false,
                order: {},
                errorMessage: '',
            };
        default:
            return { ...state };
    }
};
export const orderDetailsReducer = (
    state = {
        isLoading: false,
        orderDetails: {},
        errorMessage: '',
    },
    action
) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, isLoading: true };
        case ORDER_DETAILS_SUCCESS:
            return { ...state, isLoading: false, orderDetails: action.payload };
        case ORDER_DETAILS_FAIL:
            return { ...state, isLoading: false, errorMessage: action.payload };
        default:
            return { ...state };
    }
};
export const orderPayReducer = (
    state = {
        isLoading: false,
        success: false,
        errorMessage: '',
    },
    action
) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { ...state, isLoading: true };
        case ORDER_PAY_SUCCESS:
            return { ...state, isLoading: false, success: true };
        case ORDER_PAY_FAIL:
            return { ...state, isLoading: false, errorMessage: action.payload };
        case ORDER_PAY_RESET:
            return {
                isLoading: false,
                success: false,
                errorMessage: '',
            };
        default:
            return { ...state };
    }
};
