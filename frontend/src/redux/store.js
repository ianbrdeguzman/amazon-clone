import { createStore, applyMiddleware, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import {
    productListReducer,
    productDetailsReducer,
} from './reducers/product.reducer';

import { cartReducer } from './reducers/cart.reducer';

const initialState = {
    cart: {
        cartItems: JSON.parse(localStorage.getItem('cart')) || [],
    },
};

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
