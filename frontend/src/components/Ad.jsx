import React from 'react';
import image from '../assets/ad.png';

const Ad = ({ cart, payment }) => {
    return (
        <div className='bg-cartBackground pt-4'>
            <div
                className={`bg-white p-4 flex ${
                    cart
                        ? 'w-11/12 mx-auto'
                        : payment
                        ? 'w-full mx-0 border rounded'
                        : 'md:mx-4'
                }`}
            >
                <div className='min-w-[90px] mr-4'>
                    <img src={image} alt='ad' />
                </div>
                <div>
                    <p>
                        You could{' '}
                        <span className='font-bold text-primary'>
                            get 5% back at Amazon.ca
                        </span>
                        , grocery stores, and restaurants for 6 months upon
                        approval for the{' '}
                        <span className='font-bold'>Amazon.ca</span>
                    </p>
                    <p className='font-bold'>Rewards Mastercard.</p>
                    <p>
                        Welcome offer on the first $3,000 in eligible purchases.
                        See terms.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Ad;
