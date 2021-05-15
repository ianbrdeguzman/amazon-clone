import React, { useEffect } from 'react';
import Product from './Product';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../redux/actions/product.action';

const ProductList = () => {
    const { products, isLoading } = useSelector((state) => state.productList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductList());
    }, [dispatch]);

    return (
        <div>
            <div className='max-w-[1500px] mx-auto flex flex-wrap justify-center'>
                {isLoading ? (
                    <Loader />
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
