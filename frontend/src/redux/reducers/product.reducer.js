import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
} from '../actionTypes';

export const productListReducer = (
    state = {
        products: [],
        errorMessage: '',
        isLoading: false,
    },
    action
) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                products: action.payload,
                isLoading: false,
            };
        case PRODUCT_LIST_FAIL:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };
        default:
            return { ...state };
    }
};

export const productDetailsReducer = (
    state = {
        productDetails: {},
        errorMessage: '',
        isLoading: false,
    },
    action
) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                productDetails: action.payload,
                isLoading: false,
            };
        case PRODUCT_DETAIL_FAIL:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
            };
        default:
            return { ...state };
    }
};
