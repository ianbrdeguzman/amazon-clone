import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cart.action';

const CartItem = ({ image, price, productId, quantity, stock, title }) => {
    const dispatch = useDispatch();

    const handleDeleteOnClick = () => {
        // remove item from cart
        dispatch(removeFromCart(productId));
    };

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
                <h2 className='text-xl my-2'>{title}</h2>
                {stock > 0 ? (
                    <p className='text-success'>In Stock</p>
                ) : (
                    <p className='text-danger'>Out of Stock</p>
                )}
                <div className='flex justify-between my-4 '>
                    <div className='border border-gray-300 p-1 rounded-md'>
                        <label htmlFor='quantity' className='mr-2'>
                            Qty:
                        </label>
                        <select
                            name='quantity'
                            id='quantity'
                            className='focus:outline-none'
                            value={quantity}
                            onChange={(e) =>
                                dispatch(addToCart(productId, +e.target.value))
                            }
                        >
                            {[...new Array(stock).keys()].map((index) => {
                                return (
                                    <option value={index + 1} key={index}>
                                        {index + 1}
                                    </option>
                                );
                            })}
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
};

export default CartItem;
