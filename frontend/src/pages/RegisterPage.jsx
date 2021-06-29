import React, { useEffect } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/actions/user.action';
import logo from '../assets/Amazon_logo.svg.png';
import Loader from '../components/Loader';
import { useForm } from 'react-hook-form';

const RegisterPage = (props) => {
    const {register, handleSubmit, watch, formState: { errors }} = useForm();

    const history = useHistory();
    const dispatch = useDispatch();

    const { isLoading, errorMessage, userInfo } = useSelector(
        (state) => state.userRegister
    );

    const handleSubmitOnClick = (data, e) => {
        dispatch(userRegister(data.name, data.email, data.password));
        e.target.reset();
    };

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

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
                    <Link to='/'>
                        <img
                            src={logo}
                            alt='logo'
                            className='w-full h-full object-contain'
                        />
                    </Link>
                </div>
                {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                <div className='border rounded p-4'>
                    <h1 className='text-3xl'>Create account</h1>
                    <form onSubmit={handleSubmit(handleSubmitOnClick)}>
                        <label
                            htmlFor='name'
                            className='block mt-4 text-sm font-bold'
                        >
                            Your name
                        </label>
                        <input
                            className='border border-gray-500 w-full py-1 px-2 rounded text-sm'
                            type='text'
                            {...register("name", {
                                required: 'Please enter a valid name.',
                                minLength: {
                                    value: 3,
                                    message: 'Your name must contain atleast 3 characters.'
                                }
                            })}
                            id='name'
                        />
                        {errors.name && <span className='text-xs italic text-red-500'>{errors.name.message}</span>}
                        <label
                            htmlFor='email'
                            className='block mt-4 text-sm font-bold'
                        >
                            E-mail address
                        </label>
                        <input
                            className='border border-gray-500 w-full py-1 px-2 rounded text-sm'
                            type='text'
                            {...register('email', {
                                required: 'Please enter a valid email.',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Please enter a valid email address.',
                                },
                            })}
                            id='email'
                        />
                        {errors.email && <span className='text-xs italic text-red-500'>{errors.email.message}</span>}
                        <label
                            htmlFor='password'
                            className='block mt-4 text-sm font-bold'
                        >
                            Password
                        </label>
                        <input
                            className='border border-gray-500 w-full py-1 px-2 rounded text-sm'
                            type='password'
                            {...register('password', {
                                required: 'Your password must contain between 4 and 60 characters.',
                                minLength: {
                                    value: 4,
                                    message: 'Your password must contain between 4 and 60 characters.',
                                    },
                                maxLength: {
                                    value: 60,
                                    message: 'Your password must contain between 4 and 60 characters.',
                                },
                            })}
                            id='password'
                            autoComplete='on'
                        />
                        {errors.password && <span className='text-xs italic text-red-500'>{errors.password.message}</span>}
                        <label
                            htmlFor='password'
                            className='block mt-4 text-sm font-bold'
                        >
                            Password again
                        </label>
                        <input
                            className='border border-gray-500 w-full py-1 px-2 rounded text-sm'
                            type='password'
                            {...register('passwordAgain', {
                                required: 'Your password must contain between 4 and 60 characters.',
                                validate: (value) => value === watch('password') || 'Password does not match.',
                                })}
                            id='passwordAgain'
                            autoComplete='on'
                        />
                        {errors.passwordAgain && <span className='text-xs italic text-red-500'>{errors.passwordAgain.message}</span>}
                        {isLoading ? <div className='flex justify-center align-center'><Loader/></div> : <button
                            type='submit'
                            className='w-full border border-gray-500 rounded my-4 py-1 text-sm bg-button'
                        >
                            Create your Amazon account
                        </button>}
                        
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
