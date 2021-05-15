import { createStore, applyMiddleware, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import {
    productListReducer,
    productDetailsReducer,
} from './reducers/product.reducer';

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
});

const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
