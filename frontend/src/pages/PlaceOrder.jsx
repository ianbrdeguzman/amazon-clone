import React from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { useSelector } from 'react-redux';
import numeral from 'numeral';

const PlaceOrder = () => {
    const { shippingAddress, paymentMethod, cartItems } = useSelector(
        (state) => state.cart
    );

    const cartQuantity = numeral(
        cartItems.reduce((a, c) => a + c.quantity, 0)
    ).format('0,0');

    const itemPrice = numeral(
        cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
    ).format('0,0.00');

    const shippingPrice = numeral(cartQuantity > 5 ? 0 : 10).format('0,0.00');

    const taxPrice = numeral(
        cartItems.reduce((a, c) => a + c.price * c.quantity, 0) * 0.13
    ).format('0,0.00');

    const totalPrice = numeral(+itemPrice + +shippingPrice + +taxPrice).format(
        '0,0.00'
    );

    const handlePlaceOrderOnClick = () => {
        console.log('place order...');
    };

    return (
        <div>
            <div className='w-full max-w-[1000px] mx-auto'>
                <CheckoutSteps step1 step2 step3 step4 placeorder />
            </div>
            <div className='w-full max-w-[1000px] mx-auto p-4'>
                <h1 className='text-3xl'>Review your order</h1>
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
                                        {shippingAddress.fullname}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Address Line 1:
                                        </span>{' '}
                                        {shippingAddress.addressOne}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Address Line 2:
                                        </span>{' '}
                                        {shippingAddress.addressTwo}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            City:
                                        </span>{' '}
                                        {shippingAddress.city}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Postal Code:
                                        </span>{' '}
                                        <span className='uppercase'>
                                            {shippingAddress.postal}
                                        </span>
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Telephone Number:
                                        </span>{' '}
                                        {shippingAddress.phone}
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
                        <button
                            onClick={handlePlaceOrderOnClick}
                            className='mt-4 py-1 text-sm border border-gray-500 bg-yellow-500 rounded w-full focus:outline-none'
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
