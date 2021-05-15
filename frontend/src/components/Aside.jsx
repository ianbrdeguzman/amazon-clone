import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import moment from 'moment';

const Aside = () => {
    const {
        productDetails: { price, stock, _id },
    } = useSelector((state) => state.productDetails);

    const [quantity, setQuantity] = useState(1);

    const history = useHistory();

    const handleAddToCartOnClick = () => {
        history.push(`/cart/${_id}/${quantity}`);
    };

    return (
        <div className='md:w-11/12 md:max-w-[250px] h-11/12 border border-gray-300 p-4 mb-4 rounded-lg'>
            <p className='text-2xl text-danger'>${price}</p>
            <p className='font-semibold my-2'>
                <span className='text-primary'>FREE Delivery </span>
                {moment().add(7, 'days').format('dddd MMMM Do')}
            </p>
            {stock ? (
                <p className='text-success text-xl'>In Stock</p>
            ) : (
                <p className='text-red-500 text-xl'>Out of Stock</p>
            )}
            <div className='my-4 flex justify-between align-center'>
                <label htmlFor='quantity' className='mr-2'>
                    Quantity
                </label>
                <select
                    name='quantity'
                    id='quantity'
                    className='py-1 px-2 border border-black-100 rounded'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
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
            {stock ? (
                <button
                    onClick={handleAddToCartOnClick}
                    className='border border-black w-full rounded py-1 relative bg-button'
                >
                    <AiOutlineShoppingCart
                        size={18}
                        className='absolute top-1.5 left-1'
                    />
                    <span>Add to Cart</span>
                </button>
            ) : (
                <button
                    className='border border-black w-full rounded py-1 relative bg-gray-200 opacity-50'
                    disabled
                >
                    <AiOutlineShoppingCart
                        size={18}
                        className='absolute top-1.5 left-1'
                    />
                    <span>Add to Cart</span>
                </button>
            )}
        </div>
    );
};

export default Aside;
