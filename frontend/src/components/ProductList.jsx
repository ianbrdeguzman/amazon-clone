import React, { useEffect, useState } from 'react';
import Product from './Product';
import { getAllProducts } from '../components/api';

const ProductList = () => {
    const [products, setProducts] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setProducts(await getAllProducts());
            setIsLoading(false);
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <div className='max-w-[1500px] mx-auto flex flex-wrap justify-center'>
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    products?.map((product) => {
                        return <Product {...product} key={product._id} />;
                    })
                )}
            </div>
        </div>
    );
};

export default ProductList;
