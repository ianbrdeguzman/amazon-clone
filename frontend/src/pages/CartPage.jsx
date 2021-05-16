import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Ad from '../components/Ad';
import { addToCart } from '../redux/actions/cart.action';
import emptyCart from '../assets/empty_cart.svg';

const CartPage = () => {
    const { id, quantity } = useParams();

    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        if (id) dispatch(addToCart(id, +quantity));
    }, [id, quantity, dispatch]);

    const handleDeleteOnClick = () => {
        // remove item from cart
    };

    if (cartItems.length === 0) {
        return (
            <>
                <Ad />
                <div className='bg-cartBackground py-4 min-h-screenSm md:min-h-screenMd'>
                    <div className='w-11/12 mx-4 bg-white p-4 md:flex'>
                        <div className='w-full md:w-1/3'>
                            <img
                                src={emptyCart}
                                alt='empty cart'
                                className='w-full h-full object-contain'
                            />
                        </div>
                        <div>
                            <h2 class='text-4xl my-4'>
                                Your Amazon Cart is empty
                            </h2>
                            <button className='w-full p-1 my-4 bg-checkout rounded-md'>
                                Go back shopping
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className='bg-cartBackground py-4 min-h-screenSm md:min-h-screenMd'>
            <Ad cart />
            <div className='w-11/12 mx-auto lg:flex'>
                <div className='mt-4 p-4 border bg-white flex-1 lg:mr-4'>
                    <div>
                        <div className='border-b'>
                            <h1 className='text-4xl my-4'>Shopping Cart</h1>
                            <p className='text-right'>Price</p>
                        </div>
                        {cartItems.map((item) => {
                            const {
                                image,
                                price,
                                productId,
                                quantity,
                                stock,
                                title,
                            } = item;
                            return (
                                <div className='border-b relative'>
                                    <div className='w-[180px] h-[180px]'>
                                        <img
                                            className='container object-contain w-full h-full mt-4'
                                            src={image}
                                            alt={title}
                                        />
                                    </div>
                                    <div className=''>
                                        <h2 className='text-xl my-2'>
                                            {title}
                                        </h2>
                                        {stock > 0 ? (
                                            <p className='text-success'>
                                                In Stock
                                            </p>
                                        ) : (
                                            <p className='text-danger'>
                                                Out of Stock
                                            </p>
                                        )}
                                        <div className='flex justify-between my-4 '>
                                            <div className='border border-gray-300 p-1 rounded-md'>
                                                <label
                                                    htmlFor='quantity'
                                                    className='mr-2'
                                                >
                                                    Qty:
                                                </label>
                                                <select
                                                    name='quantity'
                                                    id='quantity'
                                                >
                                                    {[...new Array(10)].map(
                                                        (index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        index +
                                                                        1
                                                                    }
                                                                >
                                                                    {index + 1}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            </div>
                                            <button
                                                onClick={handleDeleteOnClick}
                                                className='text-primary'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <p className='absolute top-4 right-0 text-lg font-bold'>
                                            ${price}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='text-right text-xl my-4'>
                        <p>
                            Subtotal (
                            {cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                            items):{' '}
                            <span className='font-bold'>
                                $
                                {cartItems.reduce(
                                    (a, c) => a + c.quantity * c.price,
                                    0
                                )}
                            </span>
                        </p>
                    </div>
                </div>
                <div className='lg:flex-initial mx-auto p-4 border bg-white max-h-28 mt-4 sticky top-4'>
                    <p className='text-xl'>
                        Subtotal (
                        {cartItems.reduce((a, c) => a + c.quantity, 0)} items):{' '}
                        <span className='font-bold'>
                            $
                            {cartItems.reduce(
                                (a, c) => a + c.quantity * c.price,
                                0
                            )}
                        </span>
                    </p>
                    <button className='w-full p-1 my-4 bg-checkout rounded-md'>
                        Proceed to checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
