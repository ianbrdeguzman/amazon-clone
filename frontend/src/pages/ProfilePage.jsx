import React, { useEffect } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout, userUpdateDetails } from '../redux/actions/user.action';
import { USER_UPDATE_DETAILS_RESET } from '../redux/actionTypes';
import { useForm } from 'react-hook-form';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { userInfo } = useSelector((state) => state.userLogin);
    const { isLoading, errorMessage } = useSelector(
        (state) => state.userDetails
    );

    const {
        isLoading: updateIsLoading,
        success: updateSuccess,
        errorMessage: updateErrorMessage,
    } = useSelector((state) => state.userUpdateDetails);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const handleLogoutOnClick = () => {
        dispatch(userLogout());
        history.push('/');
    };

    const handleUpdateUserDetailsOnSubmit = (data) => {
        dispatch(userUpdateDetails({ 
            userId: userInfo._id,
            name: data.name,
            email: data.email,
            password: data.password
        }))
    };

    useEffect(() => {
        return () => {
            dispatch({ type: USER_UPDATE_DETAILS_RESET });
        };
    }, [dispatch]);

    return isLoading || updateIsLoading ? (
        <div className='w-full flex justify-center mt-32'>
            <Loader />
        </div>
    ) : (
        <div>
            <div className='w-full max-w-[348px] mx-auto p-4 m-4 border rounded'>
                <h1 className='text-3xl py-4'>Manage your account</h1>
                {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                {updateErrorMessage && (
                    <ErrorMessage errorMessage={updateErrorMessage} />
                )}
                {updateSuccess && (
                    <div className='border rounded p-2 bg-green-300 text-green-700'>
                        <p>Profile successfully updated</p>
                    </div>
                )}
                <form onSubmit={handleSubmit(handleUpdateUserDetailsOnSubmit)}>
                    <label
                        htmlFor='name'
                        className='block mt-4 text-sm font-bold'
                    >
                        Your name
                    </label>
                    <input
                        className='border w-full py-1 px-2 rounded text-sm focus:ring-2 focus:ring-yellow-500 outline-none'
                        type='text'
                        {...register("name", {
                            minLength: {
                                    value: 3,
                                    message: 'Your name must contain atleast 3 characters.'
                                }
                        })}
                        id='name'
                        defaultValue={userInfo.name}
                    />
                    {errors.name && <span className='text-xs italic text-red-500'>{errors.name.message}</span>}
                    <label
                        htmlFor='email'
                        className='block mt-4 text-sm font-bold'
                    >
                        E-mail address
                    </label>
                    <input
                        className='border w-full py-1 px-2 rounded text-sm focus:ring-2 focus:ring-yellow-500 outline-none'
                        type='text'
                        {...register('email', {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Please enter a valid email address.',
                            },
                        })}
                        id='email'
                        defaultValue={userInfo.email}
                    />
                    {errors.email && <span className='text-xs italic text-red-500'>{errors.email.message}</span>}
                    <label
                        htmlFor='password'
                        className='block mt-4 text-sm font-bold'
                    >
                        Password
                    </label>
                    <input
                        className='border w-full py-1 px-2 rounded text-sm focus:ring-2 focus:ring-yellow-500 outline-none'
                        type='password'
                        {...register('password', {
                            minLength: {
                                value: 4,
                                message: 'Your password must contain between 4 and 60 characters.',
                            },
                            maxLength: {
                                value: 60,
                                message: 'Your password must contain between 4 and 60 characters.'
                            }
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
                        className='border w-full py-1 px-2 rounded text-sm focus:ring-2 focus:ring-yellow-500 outline-none'
                        type='password'
                        {...register('passwordAgain', {
                            validate: (value) => value === watch('password') || 'Password does not match.'
                        })}
                        id='passwordAgain'
                        autoComplete='on'
                    />
                    {errors.passwordAgain && <span className='text-xs italic text-red-500'>{errors.passwordAgain.message}</span>}
                    <button
                        className='w-full border border-gray-500 rounded my-4 py-1 text-sm bg-button'
                        type='submit'
                    >
                        Update your account
                    </button>
                </form>
                <button
                    className='w-full border border-gray-500 rounded mb-4 py-1 text-sm bg-button'
                    onClick={handleLogoutOnClick}
                >
                    Sign out
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
