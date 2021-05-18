import React, { useEffect, useState } from 'react';
import ChecoutSteps from '../components/CheckoutSteps';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addShippingAddress } from '../redux/actions/cart.action';

const ShippingPage = () => {
    const [fullname, setFullname] = useState('');
    const [addressOne, setAddressOne] = useState('');
    const [addressTwo, setAddressTwo] = useState('');
    const [city, setCity] = useState('');
    const [postal, setPostal] = useState('');
    const [phone, setPhone] = useState('');

    const [fullnameErr, setFullnameErr] = useState(null);
    const [addressOneErr, setAddressOneErr] = useState(null);
    const [cityErr, setCityErr] = useState(null);
    const [postalErr, setPostalErr] = useState(null);
    const [phoneErr, setPhoneErr] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const { userInfo } = useSelector((state) => state.userLogin);
    const { cartItems } = useSelector((state) => state.cart);

    if (!userInfo) {
        history.push('/login');
    }

    if (cartItems.length === 0) {
        history.push('/');
    }

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        fullname.length === 0 ? setFullnameErr(true) : setFullnameErr(false);
        addressOne.length === 0
            ? setAddressOneErr(true)
            : setAddressOneErr(false);
        city.length === 0 ? setCityErr(true) : setCityErr(false);
        postal.length === 0 ? setPostalErr(true) : setPostalErr(false);
        phone.length === 0 ? setPhoneErr(true) : setPhoneErr(false);
    };

    useEffect(() => {
        if (
            fullnameErr === false &&
            addressOneErr === false &&
            cityErr === false &&
            postalErr === false &&
            phoneErr === false
        ) {
            setFullnameErr(null);
            setAddressOneErr(null);
            setCityErr(null);
            setPostalErr(null);
            setPhoneErr(null);

            setFullname('');
            setAddressOne('');
            setAddressTwo('');
            setCity('');
            setPostal('');
            setPhone('');

            dispatch(
                addShippingAddress({
                    fullname,
                    addressOne,
                    addressTwo,
                    city,
                    postal,
                    phone,
                })
            );

            history.push('/payment');
        }
    }, [
        fullnameErr,
        addressOneErr,
        cityErr,
        postalErr,
        phoneErr,
        setFullnameErr,
        setAddressOneErr,
        setCityErr,
        setPostalErr,
        setPhoneErr,
        setFullname,
        setAddressOne,
        setAddressTwo,
        setCity,
        setPostal,
        setPhone,
        fullname,
        addressOne,
        addressTwo,
        city,
        postal,
        phone,
        history,
        dispatch,
    ]);
    return (
        <div>
            <ChecoutSteps step1 step2 />
            <div className='w-full max-w-[540px] mx-auto p-4'>
                <h1 className='text-3xl'>Select a shipping address</h1>
                <form
                    className='my-4 font-semibold text-sm'
                    onSubmit={handleShippingSubmit}
                >
                    <div className='mb-2'>
                        <label htmlFor='fullname'>
                            Full name (First and Last name)
                        </label>
                        <input
                            className='w-full border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-yellow-500'
                            type='text'
                            name='fullname'
                            id='fullname'
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                        {fullnameErr && (
                            <p className='text-red-500 font-normal text-xs'>
                                Please enter a name.
                            </p>
                        )}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='addressOne'>
                            Address Line 1 (or Company Name)
                        </label>
                        <input
                            className='w-full border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-yellow-500'
                            type='text'
                            name='addressOne'
                            id='addressOne'
                            value={addressOne}
                            placeholder='Street address, P.O. box, company name, c/o'
                            onChange={(e) => setAddressOne(e.target.value)}
                        />
                        {addressOneErr && (
                            <p className='text-red-500 font-normal text-xs'>
                                Please enter an address.
                            </p>
                        )}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='addressTwo'>
                            Address Line 2 (optional)
                        </label>
                        <input
                            className='w-full border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-yellow-500'
                            type='text'
                            name='addressTwo'
                            id='addressTwo'
                            value={addressTwo}
                            placeholder='Apartment, suite, unit, building, floor etc.'
                            onChange={(e) => setAddressTwo(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='city'>City</label>
                        <input
                            className='w-full border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-yellow-500'
                            type='text'
                            name='city'
                            id='city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        {cityErr && (
                            <p className='text-red-500 font-normal text-xs'>
                                Please enter a city.
                            </p>
                        )}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='postal'>Postal Code/ZIP</label>
                        <input
                            className='w-full border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-yellow-500 uppercase'
                            type='text'
                            name='postal'
                            id='postal'
                            value={postal}
                            pattern='[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]'
                            onChange={(e) => setPostal(e.target.value)}
                        />
                        {postalErr && (
                            <p className='text-red-500 font-normal text-xs'>
                                Please enter a postal code.
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor='phone'>Telephone number</label>
                        <input
                            className='w-full border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-yellow-500'
                            type='tel'
                            name='phone'
                            id='phone'
                            value={phone}
                            pattern='[0-9]{3}[0-9]{3}[0-9]{4}'
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {phoneErr && (
                            <p className='text-red-500 font-normal text-xs'>
                                Please enter a phone number so we can call if
                                there are any issues with delivery.
                            </p>
                        )}
                        <p className='text-xs font-normal'>
                            May be printed on the label to assist delivery.
                        </p>
                    </div>
                    <button
                        type='submit'
                        className='border border-gray-500 py-1 px-2 my-4 rounded bg-yellow-400 focus:outline-none'
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingPage;
