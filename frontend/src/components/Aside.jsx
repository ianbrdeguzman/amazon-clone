import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import moment from 'moment';
import numeral from 'numeral';

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
        <div className='md:w-11/12 md:max-w-[250px] h-11/12 border p-4 mb-4 md:mt-4 rounded md:h-72'>
            <p className='text-2xl text-danger'>
                ${numeral(price).format('0,0.00')}
            </p>
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
                    Qty:
                </label>
                <select
                    name='quantity'
                    id='quantity'
                    className='py-1 px-2 border rounded'
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
            <button
                onClick={handleAddToCartOnClick}
                disabled={!stock}
                className={`border border-black w-full rounded py-1 relative ${
                    stock ? 'bg-button' : 'bg-gray-200 opacity-50'
                }`}
            >
                <AiOutlineShoppingCart
                    size={18}
                    className='absolute top-1.5 left-1'
                />
                <span>Add to Cart</span>
            </button>
        </div>
    );
};

export default Aside;
