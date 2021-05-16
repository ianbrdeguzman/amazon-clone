import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { addToCart } from '../redux/actions/cart.action';

const CartPage = () => {
    const { id, quantity } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        if (id) dispatch(addToCart(id, +quantity));
    }, [id, quantity, dispatch]);

    return (
        <div>
            <h1>Cart Page</h1>
            <p>Product id: {id}</p>
            <p>Quantity: {quantity}</p>
        </div>
    );
};

export default CartPage;
