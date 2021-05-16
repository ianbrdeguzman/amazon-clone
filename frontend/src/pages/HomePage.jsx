import React from 'react';
import ProductList from '../components/ProductList';
import Slider from '../components/Slider';

const HomePage = () => {
    return (
        <div className='bg-mainBackground'>
            <Slider />
            <ProductList />
        </div>
    );
};

export default HomePage;
