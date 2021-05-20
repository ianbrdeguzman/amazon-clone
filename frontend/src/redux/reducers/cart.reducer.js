import {
    CART_ADD_ITEM,
    CART_ADD_PAYMENT_METHOD,
    CART_ADD_SHIPPING_DETAILS,
    CART_REMOVE_ITEM,
    CART_RESET,
} from '../actionTypes';

export const cartReducer = (
    state = {
        cartItems: [],
        shippingAddress: {},
    },
    action
) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const itemInCart = state.cartItems.find(
                (inCartItem) =>
                    inCartItem.productId === action.payload.productId
            );
            if (itemInCart) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((inCartItem) =>
                        inCartItem.productId === itemInCart.productId
                            ? action.payload
                            : inCartItem
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.productId !== action.payload
                ),
            };
        case CART_ADD_SHIPPING_DETAILS:
            return {
                ...state,
                shippingAddress: action.payload,
            };
        case CART_ADD_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };
        case CART_RESET:
            return { ...state, cartItems: [] };
        default:
            return { ...state };
    }
};
