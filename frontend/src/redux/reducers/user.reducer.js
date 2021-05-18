import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from '../actionTypes';

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
