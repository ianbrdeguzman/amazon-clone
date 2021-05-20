import React from 'react';
import numeral from 'numeral';

const OrderItem = ({ productId, image, title, quantity, price }) => {
    return (
        <div key={productId} className='sm:flex sm:justify-between w-full my-4'>
            <div className='w-full sm:w-[120px] sm:h-[120px] sm:mr-4'>
                <img
                    src={image}
                    alt={title}
                    className='w-full h-full object-contain'
                />
            </div>
            <div className='my-4 sm:my-0 flex-1'>
                <h2>{title}</h2>
                <p>
                    {quantity} x ${numeral(price).format('0,0.00')}
                </p>
            </div>
            <div className='text-right'>
                <p>Price</p>
                <p className='text-base font-semibold'>
                    ${numeral(quantity * price).format('0,0.00')}
                </p>
            </div>
        </div>
    );
};

export default OrderItem;
