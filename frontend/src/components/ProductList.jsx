import React from 'react';
import { products } from '../data/products';
import Product from './Product';

const ProductList = () => {
    return (
        <div>
            <div className='max-w-[1500px] mx-auto flex flex-wrap justify-center'>
                {products.map((product) => {
                    return <Product {...product} key={product._id} />;
                })}
            </div>
        </div>
    );
};

export default ProductList;
