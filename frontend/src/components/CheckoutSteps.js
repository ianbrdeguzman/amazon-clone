import React from 'react';
import logo from '../assets/Amazon_logo.svg.png';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({
    step1,
    step2,
    step3,
    step4,
    shipping,
    payment,
    placeorder,
}) => {
    return (
        <div>
            <div
                className={`w-full max-w-[540px] p-4 uppercase text-xs font-semibold flex flex-col md:flex-row justify-self-start ${
                    shipping
                        ? 'mx-auto'
                        : placeorder
                        ? ''
                        : payment
                        ? ''
                        : 'mx-auto'
                }`}
            >
                <div className='w-24 mx-auto md:mr-4'>
                    <Link to='/'>
                        <img src={logo} alt='logo' />
                    </Link>
                </div>
                <div className='flex-1 flex justify-center md:justify-start mt-4'>
                    <div
                        className={`${
                            step1
                                ? 'pl-4 text-yellow-500 border-t border-yellow-500'
                                : 'pl-4 border-t border-gray-300 text-gray-300'
                        }`}
                    >
                        <Link to='/cart'>
                            <p>cart</p>
                        </Link>
                    </div>
                    <div
                        className={` ${
                            step2
                                ? 'pl-4 text-yellow-500 border-t border-yellow-500'
                                : 'pl-4 border-t border-gray-300 text-gray-300'
                        }`}
                    >
                        <Link to='/shipping'>
                            <p>address</p>
                        </Link>
                    </div>
                    <div
                        className={`${
                            step3
                                ? 'pl-4 text-yellow-500 border-t border-yellow-500'
                                : 'pl-4 border-t border-gray-300 text-gray-300'
                        }`}
                    >
                        <Link to='/payment'>
                            <p>payment</p>
                        </Link>
                    </div>
                    <div
                        className={`${
                            step4
                                ? 'pl-4 text-yellow-500 border-t border-yellow-500'
                                : 'pl-4 border-t border-gray-300 text-gray-300'
                        }`}
                    >
                        <Link to='/placeorder'>
                            <p>place order</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSteps;
