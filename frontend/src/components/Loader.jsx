import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loader = () => {
    return (
        <div className='animate-spin m-4'>
            <AiOutlineLoading3Quarters size={40} />
        </div>
    );
};

export default Loader;
