import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actionTypes';

export const cartReducer = (
    state = {
        cartItems: [],
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
        default:
            return { ...state };
    }
};
