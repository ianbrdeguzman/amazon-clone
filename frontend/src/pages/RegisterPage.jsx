import React, { useEffect, useState } from 'react';
import logo from '../assets/Amazon_logo.svg.png';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/actions/user.action';
import { FiAlertTriangle } from 'react-icons/fi';

const RegisterPage = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const [nameErr, setNameErr] = useState(null);
    const [emailErr, setEmailErr] = useState(null);
    const [passwordErr, setPasswordErr] = useState(null);
    const [passwordAgainErr, setPasswordAgainErr] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();

    const { errorMessage, userInfo } = useSelector(
        (state) => state.userRegister
    );

    const handleSubmitOnClick = (e) => {
        e.preventDefault();
        name.length === 0 ? setNameErr(true) : setNameErr(false);
        email.length === 0 ? setEmailErr(true) : setEmailErr(false);
        password.length < 6 ? setPasswordErr(true) : setPasswordErr(false);
        password !== passwordAgain || passwordAgain.length === 0
            ? setPasswordAgainErr(true)
            : setPasswordAgainErr(false);
    };

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    useEffect(() => {
        if (
            nameErr === false &&
            emailErr === false &&
            passwordErr === false &&
            passwordAgainErr === false
        ) {
            setNameErr(null);
            setEmailErr(null);
            setPasswordErr(null);
            setPasswordAgainErr(null);
            setName('');
            setEmail('');
            setPassword('');
            setPasswordAgain('');
            dispatch(userRegister(name, email, password));
        }
    }, [
        name,
        email,
        password,
        passwordAgain,
        history,
        nameErr,
        emailErr,
        passwordErr,
        passwordAgainErr,
        dispatch,
        redirect,
    ]);

    useEffect(() => {
        if (errorMessage) {
            history.push(`/register?redirect=${redirect}`);
        }
        if (userInfo) {
            history.push(redirect);
        }
    }, [errorMessage, userInfo, redirect, history]);

    return (
        <div>
            <div className='w-11/12 mx-auto max-w-[348px] py-8 flex flex-col justify-center'>
                <div className='w-[100px] mx-auto mb-4'>
                    <img
                        src={logo}
                        alt='logo'
                        className='w-full h-full object-contain'
                    />
                </div>
                {errorMessage && (
                    <div className='flex border border-red-500 my-4 p-4 rounded'>
                        <div className='mt-1 mr-4 text-red-500'>
                            <FiAlertTriangle size={26} />
                        </div>
                        <div>
                            <h2 className='font-semibold text-lg text-red-500'>
                                There was a problem
                            </h2>
                            <p className='text-sm'>{errorMessage}</p>
                        </div>
                    </div>
                )}
                <div className='border rounded p-4'>
                    <h1 className='text-3xl'>Sign In</h1>
                    <form onSubmit={handleSubmitOnClick}>
                        <label
                            htmlFor='name'
                            className='block mt-4 text-sm font-bold'
                        >
                            Your name
                        </label>
                        <input
                            className='border border-gray-500 w-full py-1 px-2 rounded text-sm'
                            type='text'
                            name='name'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {nameErr && (
                            <p className='text-xs text-red-500'>
                                Enter your name
                            </p>
                        )}
                        <label
                            htmlFor='email'
                            className='block mt-4 text-sm font-bold'
                        >
                            E-mail address
                        </label>
                        <input
                            className='border border-gray-500 w-full py-1 px-2 rounded text-sm'
                            type='text'
                            name='email'
                            id='email'
                            pattern='[^@\s]+@[^@\s]+\.[^@\s]+'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailErr && (
                            <p className='text-xs text-red-500'>
                                Enter your e-mail
                            </p>
                        )}
                        <label
                            htmlFor='password'
                            className='block mt-4 text-sm font-bold'
                        >
                            Password
                        </label>
                        <input
                            className='border border-gray-500 w-full py-1 px-2 rounded text-sm'
                            type='password'
                            name='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordErr && (
                            <p className='text-xs text-red-500'>
                                Password must consist of at least 6 characters
                            </p>
                        )}
                        <label
                            htmlFor='password'
                            className='block mt-4 text-sm font-bold'
                        >
                            Password again
                        </label>
                        <input
                            className='border border-gray-500 w-full py-1 px-2 rounded text-sm'
                            type='password'
                            name='password'
                            id='passwordAgain'
                            value={passwordAgain}
                            onChange={(e) => setPasswordAgain(e.target.value)}
                        />
                        {passwordAgainErr && (
                            <p className='text-xs text-red-500'>
                                Passwords do not match
                            </p>
                        )}
                        <button
                            type='submit'
                            className='w-full border border-gray-500 rounded my-4 py-1 text-sm bg-button'
                        >
                            Create your Amazon account
                        </button>
                    </form>
                    <p className='text-xs'>
                        By creating an account, you agree to Amazon's{' '}
                        <span className='text-blue-700'>Conditions of Use</span>{' '}
                        and{' '}
                        <span className='text-blue-700'>Privacy Notice.</span>
                    </p>
                </div>
                <div className='text-sm my-4 flex'>
                    <p className='mr-2'>Already have an account?</p>
                    <Link
                        to={`/login?redirect=${redirect}`}
                        className='text-blue-700'
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
