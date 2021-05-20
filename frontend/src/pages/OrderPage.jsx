import React, { useEffect } from 'react';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../redux/actions/order.action';
import { useHistory, useParams } from 'react-router-dom';
import OrderItem from '../components/OrderItem';
import ErrorMessage from '../components/ErrorMessage';

const OrderPage = () => {
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
        dispatch(getOrderDetails(id));
    }, [dispatch, id]);

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
                            <div className='md:mr-10 flex-1'>
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
                    <div className='border rounded sm:my-4 sm:ml-4 p-4 w-full sm:max-w-[200px] md:h-44 sticky top-4'>
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
                            <p>${orderDetails.itemPrice || 0}</p>
                        </div>
                        <div className='flex justify-between mt-2 text-sm'>
                            <p>Shipping:</p>
                            <p>${orderDetails.shippingPrice || 0}</p>
                        </div>
                        <div className='flex justify-between mt-2 text-sm border-b pb-2'>
                            <p>Tax:</p>
                            <p>${orderDetails.taxPrice || 0}</p>
                        </div>
                        <div className='flex justify-between mt-2 font-bold'>
                            <p>Order Total</p>
                            <p>${orderDetails.totalPrice || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
