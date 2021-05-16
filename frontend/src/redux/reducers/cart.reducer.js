import { ADD_TO_CART } from '../actionTypes';

export const cartReducer = (
    state = {
        cartItems: [],
    },
    action
) => {
    switch (action.type) {
        case ADD_TO_CART:
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

        default:
            return { ...state };
    }
};
