import React, { useEffect } from 'react';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { orderListMine } from '../redux/actions/order.action';
import moment from 'moment';

const OrderHistoryPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userInfo } = useSelector((state) => state.userLogin);
    const { isLoading, orderList, errorMessage } = useSelector(
        (state) => state.orderList
    );

    if (!userInfo) {
        history.push('/login?redirect=orderhistory');
    }

    useEffect(() => {
        dispatch(orderListMine());
    }, [dispatch]);

    const handleOrderOnClick = (id) => {
        history.push(`/order/${id}`);
    };

    const handleBuyAgainOnClick = (id) => {
        history.push(`/cart/${id}/1`);
    };

    return isLoading ? (
        <div className='flex justify-center mt-32'>
            <Loader />
        </div>
    ) : (
        <div>
            <div className='w-full max-w-[920px] mx-auto p-4'>
                <h1 className='text-3xl mb-4 pb-4 border-b'>Your Orders</h1>
                {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                {orderList.length === 0 ? (
                    <p>You have not placed any orders yet.</p>
                ) : (
                    orderList.map((order) => {
                        const {
                            createdAt,
                            isPaid,
                            isDelivered,
                            totalPrice,
                            orderItems,
                            shippingDetails: {
                                fullname,
                                addressOne,
                                addressTwo,
                                city,
                                postal,
                                phone,
                            },
                            _id,
                        } = order;
                        return (
                            <div
                                key={_id}
                                className='border rounded text-xs mb-4'
                            >
                                <header
                                    onClick={() => handleOrderOnClick(_id)}
                                    className='p-4 md:flex bg-gray-100 cursor-pointer'
                                >
                                    <div className='my-2 mr-4'>
                                        <p className='uppercase text-gray-500'>
                                            Order Placed
                                        </p>
                                        <p>{moment(createdAt).format('ll')}</p>
                                    </div>
                                    <div className='my-2 mr-4'>
                                        <p className='uppercase text-gray-500'>
                                            Total
                                        </p>
                                        <p>${totalPrice}</p>
                                    </div>
                                    <div className='my-2 mr-4 flex-1'>
                                        <p className='uppercase text-gray-500'>
                                            Ship To
                                        </p>
                                        <p>{fullname}</p>
                                        <p>{addressOne}</p>
                                        <p>{addressTwo}</p>
                                        <p>{city}</p>
                                        <p>{postal}</p>
                                        <p>{phone}</p>
                                    </div>
                                    <div className='my-2 mr-4'>
                                        <div className='mb-2'>
                                            <p className='uppercase text-gray-500'>
                                                Order Id
                                            </p>
                                            <p>{_id}</p>
                                        </div>
                                        <div className='mb-2'>
                                            <p className='uppercase text-gray-500'>
                                                Paid
                                            </p>
                                            {isPaid ? (
                                                <p>
                                                    {moment(
                                                        order.paidAt
                                                    ).format('ll')}
                                                </p>
                                            ) : (
                                                <p>No</p>
                                            )}
                                        </div>
                                        <div>
                                            <p className='uppercase text-gray-500'>
                                                Delivered
                                            </p>
                                            {isDelivered ? (
                                                <p>{order.deliveredAt}</p>
                                            ) : (
                                                <p>No</p>
                                            )}
                                        </div>
                                    </div>
                                </header>
                                <div className='px-4 pt-4'>
                                    {orderItems.map((item) => {
                                        const { image, title, productId } =
                                            item;
                                        return (
                                            <div
                                                key={productId}
                                                className='flex mb-4'
                                            >
                                                <div className='w-[90px] h-[90px] mr-4'>
                                                    <img
                                                        src={image}
                                                        alt={title}
                                                        className='w-full h-full object-contain'
                                                    />
                                                </div>
                                                <div>
                                                    <Link
                                                        to={`/product/${productId}`}
                                                    >
                                                        <p className='my-2 text-blue-500'>
                                                            {title}
                                                        </p>
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleBuyAgainOnClick(
                                                                productId
                                                            )
                                                        }
                                                        className='border border-gray-500 px-2 py-1 rounded bg-yellow-500'
                                                    >
                                                        Buy it again
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
