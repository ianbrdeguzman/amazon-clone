import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const ErrorMessage = ({ errorMessage }) => {
    return (
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
    );
};

export default ErrorMessage;
