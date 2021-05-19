import { createStore, applyMiddleware, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import {
    productListReducer,
    productDetailsReducer,
} from './reducers/product.reducer';

import { cartReducer } from './reducers/cart.reducer';

import { userLoginReducer, userRegisterReducer } from './reducers/user.reducer';

const initialState = {
    cart: {
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
        shippingDetails:
            JSON.parse(localStorage.getItem('shippingDetails')) || {},
        paymentMethod: 'PayPal',
    },
    userLogin: {
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    },
};

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
