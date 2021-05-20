import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/actions/cart.action';
import numeral from 'numeral';

const CartItem = ({ image, price, productId, quantity, stock, title }) => {
    const dispatch = useDispatch();

    const history = useHistory();

    const handleDeleteOnClick = () => {
        dispatch(removeFromCart(productId));
        history.push('/cart');
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
                <Link to={`/product/${productId}`}>
                    <h2 className='text-xl my-2'>{title}</h2>
                </Link>
                {stock > 0 ? (
                    <p className='text-success'>In Stock</p>
                ) : (
                    <p className='text-danger'>Out of Stock</p>
                )}
                <div className='flex justify-between my-4 '>
                    <div className='border p-1 rounded-md'>
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
                    ${numeral(price).format('0,0.00')}
                </p>
            </div>
        </div>
    );
};

export default CartItem;
