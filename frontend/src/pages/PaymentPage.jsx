import React, { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import Ad from '../components/Ad';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addPaymentMethod } from '../redux/actions/cart.action';

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const history = useHistory();

    const handlePaymentMethodOnSubmit = (e) => {
        e.preventDefault();
        dispatch(addPaymentMethod(paymentMethod));
        history.push('/placeorder');
    };

    return (
        <div className='max-w-[1000px] mx-auto'>
            <CheckoutSteps step1 step2 step3 shipping />
            <div className='p-4'>
                <h1 className='text-3xl'>Select payment method</h1>
                <Ad payment />
                <h2 className='text-2xl my-4'>Select payment method</h2>
                <form onSubmit={handlePaymentMethodOnSubmit}>
                    <div>
                        <input
                            type='radio'
                            name='paymentMethod'
                            id='paypal'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor='paypal' className='ml-2'>
                            PayPal
                        </label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            name='paymentMethod'
                            id='stripe'
                            value='Stripe'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor='stripe' className='ml-2'>
                            Stripe
                        </label>
                    </div>
                    <div className='w-full'>
                        <button
                            type='submit'
                            className='w-full md:w-auto my-4 border border-gray-500 py-1 px-2 rounded bg-yellow-300 focus:outline-none'
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
