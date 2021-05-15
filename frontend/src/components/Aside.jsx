import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Aside = () => {
    const {
        productDetails: { price, stock },
    } = useSelector((state) => state.productDetails);

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
                >
                    {[...new Array(10)].map((item, index) => {
                        return (
                            <option value={index + 1} key={index}>
                                {index + 1}
                            </option>
                        );
                    })}
                </select>
            </div>
            {stock ? (
                <button className='border border-black w-full rounded py-1 relative bg-button'>
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
