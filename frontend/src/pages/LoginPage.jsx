import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/Amazon_logo.svg.png';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/actions/user.action';
import { FiAlertTriangle } from 'react-icons/fi';

const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { userInfo, errorMessage } = useSelector((state) => state.userLogin);

    const dispatch = useDispatch();
    const history = useHistory();

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const handleSubmitOnClick = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password));
        setEmail('');
        setPassword('');
    };

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [redirect, userInfo, history]);

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
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                            htmlFor='password'
                            className='block text-sm font-bold'
                        >
                            Password
                        </label>
                        <input
                            className='border border-gray-500 w-full py-1 px-2 rounded text-sm'
                            type='password'
                            name='password'
                            id='password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type='submit'
                            className='w-full border border-gray-500 rounded my-4 py-1 text-sm bg-button'
                        >
                            Continue
                        </button>
                    </form>
                </div>
                <div className='text-sm text-center my-4'>
                    <p>New to Amazon?</p>
                    <Link to='/register'>
                        <button className='border border-gray-400 rounded p-1 w-full mt-2 bg-gray-100'>
                            Create your Amazon account
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
