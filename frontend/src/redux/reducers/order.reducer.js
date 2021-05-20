import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
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
