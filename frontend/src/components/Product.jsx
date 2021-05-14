import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import numeral from 'numeral';

const Product = ({ _id, rating, image, price, reviews, title }) => {
    const handleOnclick = () => {
        console.log('clicked');
    };
    return (
        <article
            key={_id}
            className='bg-white w-[150px] sm:w-[200px] m-1 relative -top-10 md:-top-32 lg:-top-60 cursor-pointer shadow rounded'
            onClick={handleOnclick}
        >
            <div className='w-[150px] sm:w-[200px] h-[250px]'>
                <img
                    src={image}
                    alt={title}
                    className='w-full h-full object-contain'
                />
            </div>
            <div className='bg-gray-50 flex flex-col p-4'>
                <p className='text-lg font-semibold'>${price}</p>
                <p className='line-clamp-2 text-sm h-[42px]'>{title}</p>
                <div className='flex items-center'>
                    <span className='text-yellow-500'>
                        {rating >= 1 ? (
                            <BsStarFill />
                        ) : rating >= 0.5 ? (
                            <BsStarHalf />
                        ) : (
                            <BsStar />
                        )}
                    </span>
                    <span className='text-yellow-500'>
                        {rating >= 2 ? (
                            <BsStarFill />
                        ) : rating >= 1.5 ? (
                            <BsStarHalf />
                        ) : (
                            <BsStar />
                        )}
                    </span>
                    <span className='text-yellow-500'>
                        {rating >= 3 ? (
                            <BsStarFill />
                        ) : rating >= 2.5 ? (
                            <BsStarHalf />
                        ) : (
                            <BsStar />
                        )}
                    </span>
                    <span className='text-yellow-500'>
                        {rating >= 4 ? (
                            <BsStarFill />
                        ) : rating >= 3.5 ? (
                            <BsStarHalf />
                        ) : (
                            <BsStar />
                        )}
                    </span>
                    <span className='text-yellow-500'>
                        {rating >= 5 ? (
                            <BsStarFill />
                        ) : rating >= 4.5 ? (
                            <BsStarHalf />
                        ) : (
                            <BsStar />
                        )}
                    </span>
                    <p className='ml-2 text-sm'>
                        {numeral(reviews).format('0,0')}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default Product;
