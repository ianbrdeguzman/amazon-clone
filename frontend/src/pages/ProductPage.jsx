import React from 'react';
import { useParams } from 'react-router';

const ProductPage = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Product Page of {id}</h1>
        </div>
    );
};

export default ProductPage;
