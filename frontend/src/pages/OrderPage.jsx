import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../redux/actions/order.action';
import { useHistory, useParams } from 'react-router-dom';
import OrderItem from '../components/OrderItem';
import ErrorMessage from '../components/ErrorMessage';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import numeral from 'numeral';

const OrderPage = () => {
    const [paypalSdkReady, setPaypalSdkReady] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.userLogin);
    if (!userInfo) {
        history.push('/login');
    }

    const { orderDetails, isLoading, errorMessage } = useSelector(
        (state) => state.orderDetails
    );

    const { isDelivered, isPaid, orderItems, shippingDetails } = orderDetails;

    useEffect(() => {
        const addPayPalSdk = async () => {
            const { data } = await axios.get(
                `http://localhost:5000/api/config/paypal`
            );
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setPaypalSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!orderDetails._id) {
            dispatch(getOrderDetails(id));
        } else {
            if (!orderDetails.isPaid) {
                if (!window.paypal) {
                    addPayPalSdk();
                } else {
                    setPaypalSdkReady(true);
                }
            }
        }
    }, [dispatch, id, orderDetails]);

    const handlePaypalSuccess = () => {};

    return isLoading ? (
        <div className='w-full flex justify-center'>
            <Loader />
        </div>
    ) : (
        <div>
            <div className='w-full max-w-[1000px] mx-auto p-4'>
                <div className='p-4 border rounded'>
                    <h1 className='font-bold xs:text-2xl md:text-3xl'>
                        Order ID {orderDetails._id}
                    </h1>
                </div>
                {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                <div className='sm:flex'>
                    <div className='flex-1'>
                        <div className='border rounded sm:flex p-4 my-4 relative'>
                            <div className='flex-1 sm:mr-4'>
                                <h2 className='font-bold'>Shipping address</h2>
                                <div className='text-sm mt-4'>
                                    <p>
                                        <span className='font-semibold'>
                                            Full name:
                                        </span>{' '}
                                        {shippingDetails?.fullname}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Address Line 1:
                                        </span>{' '}
                                        {shippingDetails?.addressOne}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Address Line 2:
                                        </span>{' '}
                                        {shippingDetails?.addressTwo}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            City:
                                        </span>{' '}
                                        {shippingDetails?.city}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Postal Code:
                                        </span>{' '}
                                        <span className='uppercase'>
                                            {shippingDetails?.postal}
                                        </span>
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Telephone Number:
                                        </span>{' '}
                                        {shippingDetails?.phone}
                                    </p>
                                </div>
                                {isDelivered ? (
                                    <div className='md:w-48'>
                                        <h2 className='font-semibold text-sm text-green-700 bg-green-300 mt-4 rounded p-2'>
                                            Delivered at May 21, 2021
                                        </h2>
                                    </div>
                                ) : (
                                    <div className='md:w-28'>
                                        <h2 className='font-semibold text-sm text-red-700 bg-red-300 mt-4 rounded p-2'>
                                            Not delivered
                                        </h2>
                                    </div>
                                )}
                            </div>
                            <div className='mt-4 sm:mt-0 min-w-[160px] md:flex md:flex-col relative'>
                                <h2 className='font-bold'>Payment</h2>
                                <p className='text-sm mt-4'>
                                    <span className='font-semibold'>
                                        Method:
                                    </span>{' '}
                                    {orderDetails.paymentMethod}
                                </p>
                                {isPaid ? (
                                    <div className='sm:absolute sm:bottom-0'>
                                        <h2 className='font-semibold text-sm text-green-700 bg-green-300 mt-4 rounded p-2'>
                                            Paid at May 21, 2021
                                        </h2>
                                    </div>
                                ) : (
                                    <div className='sm:absolute sm:bottom-0'>
                                        <h2 className='font-semibold text-sm text-red-700 bg-red-300 mt-4 rounded p-2'>
                                            Not paid
                                        </h2>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='border rounded p-4 my-4'>
                            <h2 className='font-bold'>Order items</h2>
                            <div className='sm:flex flex-col text-sm'>
                                {orderItems?.map((product) => {
                                    return (
                                        <OrderItem
                                            {...product}
                                            key={product.productId}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='border rounded sm:my-4 sm:ml-4 p-4 w-full sm:max-w-[232px] sm:h-80 sticky top-4'>
                        <h2 className='font-bold'>Order Summary</h2>
                        <div className='flex justify-between mt-2 text-sm'>
                            <p>
                                Items (
                                {orderItems?.reduce(
                                    (a, c) => a + c.quantity,
                                    0
                                ) || 0}
                                ):
                            </p>
                            <p>
                                $
                                {numeral(orderDetails.itemPrice).format(
                                    '0,0.00'
                                ) || numeral(0).format('0,0.00')}
                            </p>
                        </div>
                        <div className='flex justify-between mt-2 text-sm'>
                            <p>Shipping:</p>
                            <p>
                                $
                                {numeral(orderDetails.shippingPrice).format(
                                    '0,0.00'
                                ) || numeral(0).format('0,0.00')}
                            </p>
                        </div>
                        <div className='flex justify-between mt-2 text-sm border-b pb-2'>
                            <p>Tax:</p>
                            <p>
                                $
                                {numeral(orderDetails.taxPrice).format(
                                    '0,0.00'
                                ) || numeral(0).format('0,0.00')}
                            </p>
                        </div>
                        <div className='flex justify-between mt-2 font-bold'>
                            <p>Order Total</p>
                            <p>
                                $
                                {numeral(orderDetails.totalPrice).format(
                                    '0,0.00'
                                ) || numeral(0).format('0,0.00')}
                            </p>
                        </div>
                        {!orderDetails.isPaid && !paypalSdkReady ? (
                            <div className='flex justify-center mt-8'>
                                <Loader />
                            </div>
                        ) : (
                            <div className='mt-8 w-full'>
                                <PayPalButton
                                    amount={orderDetails.totalPrice}
                                    onSuccess={handlePaypalSuccess}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
