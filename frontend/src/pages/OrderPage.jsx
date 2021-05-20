import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import numeral from 'numeral';

const OrderPage = () => {
    const { id } = useParams();
    const history = useHistory();

    const { userInfo } = useSelector((state) => state.userLogin);
    if (!userInfo) {
        history.push('/login');
    }
    return (
        <div>
            <div className='w-full max-w-[1000px] mx-auto p-4'>
                <div className='p-4 border rounded'>
                    <h1 className='font-bold xs:text-2xl md:text-3xl'>
                        Order ID {id}
                    </h1>
                </div>
                <div className='sm:flex'>
                    <div className='flex-1'>
                        <div className='border rounded sm:flex p-4 my-4'>
                            <div className='md:mr-10 flex-1'>
                                <h2 className='font-bold'>Shipping address</h2>
                                <div className='text-sm mt-4'>
                                    <p>
                                        <span className='font-semibold'>
                                            Full name:
                                        </span>{' '}
                                        Lorem, ipsum dolor.
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Address Line 1:
                                        </span>{' '}
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Ipsam doloremque esse
                                        quibusdam blanditiis, expedita hic
                                        perferendis laboriosam! Aliquam,
                                        officiis sunt.
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Address Line 2:
                                        </span>{' '}
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Debitis, culpa.
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            City:
                                        </span>{' '}
                                        lorem
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Postal Code:
                                        </span>{' '}
                                        l5n3a8
                                    </p>
                                    <p>
                                        <span className='font-semibold'>
                                            Telephone Number:
                                        </span>{' '}
                                        1234567890
                                    </p>
                                </div>
                                <div>
                                    <h2 className='font-semibold text-sm text-red-700 bg-red-300 mt-4 border rounded p-2'>
                                        Not delivered
                                    </h2>
                                </div>
                            </div>
                            <div className='mt-4 sm:mt-0 min-w-[120px] md:flex md:flex-col'>
                                <h2 className='font-bold'>Payment</h2>
                                <p className='text-sm mt-4'>
                                    <span className='font-semibold'>
                                        Method:
                                    </span>{' '}
                                    PayPal
                                </p>
                                <div>
                                    <h2 className='font-semibold text-sm text-red-700 bg-red-300 mt-4 border rounded p-2'>
                                        Not paid
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className='border rounded p-4 my-4'>
                            <h2 className='font-bold'>Order items</h2>
                            <div className='sm:flex flex-col text-sm'>
                                <div className='sm:flex sm:justify-between w-full my-4'>
                                    <div className='w-full sm:w-[120px] sm:h-[120px] sm:mr-4'>
                                        <img
                                            src=''
                                            alt='Item'
                                            className='w-full h-full object-contain'
                                        />
                                    </div>
                                    <div className='my-4 sm:my-0 flex-1'>
                                        <h2>Lorem ipsum dolor sit amet.</h2>
                                        <p>1 x $99.99</p>
                                    </div>
                                    <div className='text-right'>
                                        <p>Price</p>
                                        <p className='text-base font-semibold'>
                                            $
                                            {numeral(1 * 99.99).format(
                                                '0,0.00'
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border rounded sm:my-4 sm:ml-4 p-4 w-full sm:max-w-[200px] md:h-44 sticky top-4'>
                        <h2 className='font-bold'>Order Summary</h2>
                        <div className='flex justify-between mt-2 text-sm'>
                            <p>Items (1):</p>
                            <p>$99.99</p>
                        </div>
                        <div className='flex justify-between mt-2 text-sm'>
                            <p>Shipping:</p>
                            <p>$10.00</p>
                        </div>
                        <div className='flex justify-between mt-2 text-sm border-b pb-2'>
                            <p>Tax:</p>
                            <p>$12.99</p>
                        </div>
                        <div className='flex justify-between mt-2 font-bold'>
                            <p>Order Total</p>
                            <p>$112.98</p>
                        </div>
                        {/* {isLoading ? (
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
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
