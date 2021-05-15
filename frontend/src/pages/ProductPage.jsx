import React, { useState, useEffect } from 'react';
import Rating from '../components/Rating';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getSingleProduct } from '../components/api';
import moment from 'moment';
import numeral from 'numeral';

const ProductPage = () => {
    const { id } = useParams();

    const [product, setProduct] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSingleProduct = async (id) => {
            setProduct(await getSingleProduct(id));
            setIsLoading(false);
        };
        fetchSingleProduct(id);
    }, [id]);

    return (
        <div>
            <Link to='/'>
                <button className='m-4 border border-gray-100 p-1 rounded'>
                    Back to result
                </button>
            </Link>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div className='w-11/12 max-w-[1500px] mx-auto md:pt-10 container flex flex-col md:flex-row'>
                    <div className='w-full max-w-[300px] mx-auto md:mx-4'>
                        <img src={product.image} alt={product.title} />
                    </div>
                    <div className='md:mr-4'>
                        <h2 className='text-2xl my-4'>{product.title}</h2>
                        <div className='flex'>
                            <Rating rating={product.rating} />
                            <p className='ml-2 text-sm text-primary'>
                                {numeral(product.reviews).format('0,0')} ratings
                            </p>
                        </div>
                        <p className='my-4 text-2xl text-danger'>
                            ${product.price}
                        </p>
                        <p className='mb-4'>{product.description}</p>
                        <p className='mb-4'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Facere error, debitis et distinctio, sapiente
                            similique quaerat possimus amet temporibus
                            blanditiis aliquam quos aperiam quidem dignissimos
                            nemo eum voluptate ut quo, dolores necessitatibus?
                            Tempora fuga doloremque exercitationem vel, ipsa
                            libero, ea dolore repudiandae porro voluptates
                            provident aspernatur aperiam tempore excepturi
                            tenetur.
                        </p>
                        <p className='mb-4'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Facere error, debitis et distinctio, sapiente
                            similique quaerat possimus amet temporibus
                            blanditiis aliquam quos aperiam quidem dignissimos
                            nemo eum voluptate ut quo, dolores necessitatibus?
                            Tempora fuga doloremque exercitationem vel, ipsa
                            libero, ea dolore repudiandae porro voluptates
                            provident aspernatur aperiam tempore excepturi
                            tenetur.
                        </p>
                    </div>
                    <div className='md:w-11/12 md:max-w-[250px] h-11/12 border border-gray-300 p-4 mb-4 rounded-lg'>
                        <p className='text-2xl text-danger'>${product.price}</p>
                        <p className='font-semibold my-2'>
                            <span className='text-primary'>FREE Delivery </span>
                            {moment().add(7, 'days').format('dddd MMMM Do')}
                        </p>
                        {product.stock ? (
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
                        {product.stock ? (
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
                </div>
            )}
        </div>
    );
};

export default ProductPage;
