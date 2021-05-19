import React, { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import Ad from '../components/Ad';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addPaymentMethod } from '../redux/actions/cart.action';
import PayPalLogo from '../assets/PayPal.svg.png';
import StripeLogo from '../assets/Stripe.svg.png';

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const history = useHistory();

    const { shippingAddress } = useSelector((state) => state.cart);

    if (!shippingAddress.addressOne) {
        history.push('/shipping');
    }

    const handlePaymentMethodOnSubmit = (e) => {
        e.preventDefault();
        dispatch(addPaymentMethod(paymentMethod));
        history.push('/placeorder');
    };

    return (
        <div className='max-w-[1000px] mx-auto'>
            <CheckoutSteps step1 step2 step3 payment />
            <div className='p-4'>
                <h1 className='text-3xl'>Select payment method</h1>
                <Ad payment />
                <form onSubmit={handlePaymentMethodOnSubmit}>
                    <div className='flex my-4 h-[33px] align-center'>
                        <input
                            type='radio'
                            name='paymentMethod'
                            id='paypal'
                            value='PayPal'
                            checked
                            className='mt-2'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor='paypal' className='ml-4 cursor-pointer'>
                            <img src={PayPalLogo} alt='PayPal' />
                        </label>
                    </div>
                    <div className='flex my-4 align-center h-[59px] align-center'>
                        <input
                            type='radio'
                            name='paymentMethod'
                            id='stripe'
                            value='Stripe'
                            className='mt-5'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor='stripe' className='ml-2 cursor-pointer'>
                            <img
                                src={StripeLogo}
                                alt='Stripe'
                                className='w-[100px]'
                            />
                        </label>
                    </div>
                    <div className='w-full'>
                        <button
                            type='submit'
                            className='w-full md:w-auto my-4 border border-gray-500 py-1 px-2 rounded bg-yellow-400 focus:outline-none text-sm'
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;
