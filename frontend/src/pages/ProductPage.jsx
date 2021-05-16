import React, { useEffect } from 'react';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../redux/actions/product.action';
import Aside from '../components/Aside';

const ProductPage = () => {
    const { id } = useParams();

    const { productDetails, isLoading } = useSelector(
        (state) => state.productDetails
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [id, dispatch]);

    return (
        <div>
            <Link to='/'>
                <button className='ml-4 p-1 my-4 bg-checkout rounded-md'>
                    Back to result
                </button>
            </Link>
            {isLoading ? (
                <div className='flex justify-center align-center'>
                    <Loader />
                </div>
            ) : (
                <div className='w-11/12 max-w-[1500px] mx-auto md:pt-10 container flex flex-col md:flex-row'>
                    <div className='w-full max-w-[300px] mx-auto md:mx-4'>
                        <img
                            src={productDetails.image}
                            alt={productDetails.title}
                        />
                    </div>
                    <div className='md:mr-4'>
                        <h2 className='text-2xl my-4'>
                            {productDetails.title}
                        </h2>
                        <div className='flex'>
                            <Rating rating={productDetails.rating} />
                            <p className='ml-2 text-sm text-primary'>
                                {numeral(productDetails.reviews).format('0,0')}{' '}
                                ratings
                            </p>
                        </div>
                        <p className='my-4 text-2xl text-danger'>
                            ${productDetails.price}
                        </p>
                        <p className='mb-4'>{productDetails.description}</p>
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
                    <Aside />
                </div>
            )}
        </div>
    );
};

export default ProductPage;
