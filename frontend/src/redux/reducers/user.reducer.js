import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_DETAILS_SUCCESS,
    USER_UPDATE_DETAILS_REQUEST,
    USER_UPDATE_DETAILS_FAIL,
    USER_UPDATE_DETAILS_RESET,
    USER_DETAILS_RESET,
} from '../actionTypes';

export const userRegisterReducer = (
    state = {
        isLoading: false,
        userInfo: null,
        errorMessage: null,
    },
    action
) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { ...state, isLoading: true };
        case USER_REGISTER_SUCESS:
            return { ...state, isLoading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { ...state, isLoading: false, errorMessage: action.payload };
        default:
            return { ...state };
    }
};
export const userLoginReducer = (
    state = {
        isLoading: false,
        userInfo: null,
        errorMessage: null,
    },
    action
) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, isLoading: true };
        case USER_LOGIN_SUCESS:
            return { ...state, isLoading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { ...state, isLoading: false, errorMessage: action.payload };
        case USER_LOGOUT:
            return {
                ...state,
                isLoading: false,
                userInfo: null,
                errorMessage: null,
            };
        default:
            return { ...state };
    }
};
export const userDetailsReducer = (
    state = {
        isLoading: false,
        user: null,
        errorMessage: '',
    },
    action
) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, isLoading: true };
        case USER_DETAILS_SUCCESS:
            return { ...state, isLoading: false, user: action.payload };
        case USER_DETAILS_FAIL:
            return { ...state, isLoading: false, errorMessage: action.payload };
        case USER_DETAILS_RESET:
            return {
                isLoading: false,
                user: null,
                errorMessage: '',
            };
        default:
            return { ...state };
    }
};
export const userUpdateDetailsReducer = (
    state = {
        isLoading: false,
        success: false,
        errorMessage: '',
    },
    action
) => {
    switch (action.type) {
        case USER_UPDATE_DETAILS_REQUEST:
            return { ...state, isLoading: true };
        case USER_UPDATE_DETAILS_SUCCESS:
            return { ...state, isLoading: false, success: true };
        case USER_UPDATE_DETAILS_FAIL:
            return { ...state, isLoading: false, errorMessage: action.payload };
        case USER_UPDATE_DETAILS_RESET:
            return {};
        default:
            return { ...state };
    }
};
