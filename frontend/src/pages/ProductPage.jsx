import React from 'react';
import { useParams } from 'react-router';

const ProductPage = () => {
    const { id } = useParams();

    return (
        <div>
            <div className='w-11/12 max-w-[1500px] mx-auto container border border-red-500 flex flex-col md:flex-row align-center'>
                <div className='w-full max-w-[300px] mx-auto md:m-4'>
                    <img
                        src='https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
                        alt=''
                    />
                </div>
                <div>
                    <h2>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Commodi, ducimus.
                    </h2>
                    <div>
                        <p>ratings</p>
                        <p>reviews</p>
                    </div>
                    <p>$99</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facere error, debitis et distinctio, sapiente similique
                        quaerat possimus amet temporibus blanditiis aliquam quos
                        aperiam quidem dignissimos nemo eum voluptate ut quo,
                        dolores necessitatibus? Tempora fuga doloremque
                        exercitationem vel, ipsa libero, ea dolore repudiandae
                        porro voluptates provident aspernatur aperiam tempore
                        excepturi tenetur.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
