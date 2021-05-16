import React from 'react';
import Rating from './Rating';
import { useHistory } from 'react-router';
import numeral from 'numeral';

const Product = ({ _id, rating, image, reviews, title }) => {
    const history = useHistory();

    const handleOnclick = (id) => {
        history.push(`/product/${id}`);
    };

    return (
        <article
            key={_id}
            className='bg-white w-[150px] sm:w-[200px] m-1 relative -top-10 md:-top-32 lg:-top-60 cursor-pointer shadow rounded'
            onClick={() => handleOnclick(_id)}
        >
            <div className='w-[150px] sm:w-[200px] h-[250px]'>
                <img
                    src={image}
                    alt={title}
                    className='w-full h-full object-contain'
                />
            </div>
            <div className='bg-gray-50 flex flex-col p-4'>
                <p className='line-clamp-2 text-lg h-[60px]'>{title}</p>
                <div className='flex'>
                    <Rating rating={rating} />
                    <p className='ml-2 text-sm text-primary'>
                        {numeral(reviews).format('0,0')}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default Product;
