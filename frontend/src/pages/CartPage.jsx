import React from 'react';
import { useParams } from 'react-router';

const CartPage = () => {
    const { id, quantity } = useParams();
    return (
        <div>
            <h1>Cart Page</h1>
            <p>Product id: {id}</p>
            <p>Quantity: {quantity}</p>
        </div>
    );
};

export default CartPage;
