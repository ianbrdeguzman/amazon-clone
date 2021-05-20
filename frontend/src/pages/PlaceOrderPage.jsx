import React, { useEffect } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../redux/actions/order.action';
import { useHistory } from 'react-router';
import numeral from 'numeral';
import { ORDER_CREATE_RESET } from '../redux/actionTypes';
import Loader from '../components/Loader';
import { FiAlertTriangle } from 'react-icons/fi';

const PlaceOrderPage = () => {
    const cart = useSelector((state) => state.cart);
    const { isLoading, success, order, errorMessage } = useSelector(
        (state) => state.orderCreate
    );
    const { shippingDetails, paymentMethod, cartItems } = useSelector(
        (state) => state.cart
    );

    const cartQuantity = numeral(
        cartItems.reduce((a, c) => a + c.quantity, 0)
    ).format('0,0');

    const itemPrice = numeral(
        cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
    ).format('0,0.00');

    const shippingPrice = numeral(
        cartQuantity > 5 ? 0 : cartQuantity < 1 ? 0 : 10
    ).format('0,0.00');

    const taxPrice = numeral(
        cartItems.reduce((a, c) => a + c.price * c.quantity, 0) * 0.13
    ).format('0,0.00');

    const totalPrice = numeral(+itemPrice + +shippingPrice + +taxPrice).format(
        '0,0.00'
    );

    const dispatch = useDispatch();
    const history = useHistory();

    const handlePlaceOrderOnClick = () => {
        dispatch(
            createOrder({
                ...cart,
                orderItems: cart.cartItems,
                cartQuantity: +cartQuantity,
                itemPrice: +itemPrice,
                shippingPrice: +shippingPrice,
                taxPrice: +taxPrice,
                totalPrice: +totalPrice,
            })
        );
    };

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [success, history, order, dispatch]);

    return (
        <div>
            <div className='w-full max-w-[1000px] mx-auto'>
                <CheckoutSteps step1 step2 step3 step4 placeorder />
            </div>
            <div className='w-full max-w-[1000px] mx-auto p-4'>
                <h1 className='text-3xl'>Review your order</h1>
                {errorMessage && (
                    <div className='border border-red-500 rounded mt-4 p-4 flex'>
                        <div className='text-red-500 mt-1'>
                            <FiAlertTriangle size={26} />
                        </div>
                        <div className='ml-4'>
                            <h2 className='text-red-500 font-bold'>
                                Something went wrong.
                            </h2>
                            <p className='text-sm'>{errorMessage}</p>
                        </div>
                    </div>
                )}
                <div className='sm:flex'>
                    <div className='flex-1'>
                        <div className='border rounded sm:flex p-4 my-4'>
                            <div className='mr-10'>
                                <h2 className='font-bold'>Shipping address</h2>
                                <div className='text-sm mt-4'>
                                    <p>
                                        <span className='font-semibold'>
                                            Full name:
                                        </span>{' '}
                                        {shippingDetails.fullname}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Address Line 1:
                                        </span>{' '}
                                        {shippingDetails.addressOne}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Address Line 2:
                                        </span>{' '}
                                        {shippingDetails.addressTwo}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            City:
                                        </span>{' '}
                                        {shippingDetails.city}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Postal Code:
                                        </span>{' '}
                                        <span className='uppercase'>
                                            {shippingDetails.postal}
                                        </span>
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Telephone Number:
                                        </span>{' '}
                                        {shippingDetails.phone}
                                    </p>
                                </div>
                            </div>
                            <div className='mt-4 sm:mt-0'>
                                <h2 className='font-bold'>Payment</h2>
                                <p className='text-sm mt-4'>
                                    <span className='font-semibold'>
                                        Method:{' '}
                                    </span>
                                    {paymentMethod}
                                </p>
                            </div>
                        </div>
                        <div className='border rounded p-4 my-4'>
                            <h2 className='font-bold'>Order items</h2>
                            <div className='sm:flex flex-col text-sm'>
                                {cartItems.map((product) => {
                                    return (
                                        <div
                                            key={product.productId}
                                            className='sm:flex sm:justify-between w-full my-4'
                                        >
                                            <div className='w-full sm:w-[120px] sm:h-[120px] sm:mr-4'>
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className='w-full h-full object-contain'
                                                />
                                            </div>
                                            <div className='my-4 sm:my-0 flex-1'>
                                                <h2>{product.title}</h2>
                                                <p>
                                                    {product.quantity} x $
                                                    {product.price}
                                                </p>
                                            </div>
                                            <div className='text-right'>
                                                <p>Price</p>
                                                <p className='text-lg font-semibold'>
                                                    $
                                                    {numeral(
                                                        product.quantity *
                                                            product.price
                                                    ).format('0,0.00')}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='border rounded sm:my-4 sm:ml-4 p-4 w-full sm:max-w-[200px] h-56 sticky top-4'>
                        <h2 className='font-bold'>Order Summary</h2>
                        <div className='flex justify-between mt-2 text-sm'>
                            <p>Items ({cartQuantity}):</p>
                            <p>${itemPrice}</p>
                        </div>
                        <div className='flex justify-between mt-2 text-sm'>
                            <p>Shipping:</p>
                            <p>${shippingPrice}</p>
                        </div>
                        <div className='flex justify-between mt-2 text-sm border-b pb-2'>
                            <p>Tax:</p>
                            <p>${taxPrice}</p>
                        </div>
                        <div className='flex justify-between mt-2 text-sm font-bold'>
                            <p>Order Total</p>
                            <p>${totalPrice}</p>
                        </div>
                        {isLoading ? (
                            <div className='flex justify-center'>
                                <Loader />
                            </div>
                        ) : (
                            <button
                                onClick={handlePlaceOrderOnClick}
                                className='mt-4 py-1 text-sm border border-gray-500 bg-yellow-500 rounded w-full focus:outline-none'
                            >
                                Place Order
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderPage;
