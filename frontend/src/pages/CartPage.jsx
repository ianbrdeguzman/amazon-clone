import React, { useEffect } from 'react';
import Ad from '../components/Ad';
import CartItem from '../components/CartItem';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cart.action';
import emptyCart from '../assets/empty_cart.svg';
import numeral from 'numeral';

const CartPage = () => {
    const { id, quantity } = useParams();

    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.userLogin);

    const history = useHistory();

    useEffect(() => {
        if (id) dispatch(addToCart(id, +quantity));
    }, [id, quantity, dispatch]);

    const handleCheckoutOnClick = () => {
        if (userInfo) {
            history.push('/shipping');
        } else {
            history.push('/login?redirect=shipping');
        }
    };

    if (cartItems.length === 0) {
        return (
            <>
                <Ad />
                <div className='bg-cartBackground py-4 min-h-screenSm md:min-h-screenMd'>
                    <div className='w-11/12 mx-4 bg-white p-4 md:flex'>
                        <div className='w-full md:w-1/3  mr-4'>
                            <img
                                src={emptyCart}
                                alt='empty cart'
                                className='w-full h-full object-contain'
                            />
                        </div>
                        <div>
                            <h2 className='text-4xl my-4'>
                                Your Amazon Cart is empty
                            </h2>
                            <Link to='/'>
                                <button className='w-full p-1 my-4 bg-checkout rounded-md'>
                                    Go back shopping
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className='bg-mainBackground py-4 min-h-screenSm md:min-h-screenMd'>
            <Ad cart />
            <div className='w-11/12 mx-auto lg:flex'>
                <div className='mt-4 p-4 border bg-white flex-1 lg:mr-4'>
                    <div>
                        <div className='border-b'>
                            <h1 className='text-4xl my-4'>Shopping Cart</h1>
                            <p className='text-right'>Price</p>
                        </div>
                        {cartItems.map((product) => {
                            return (
                                <CartItem
                                    {...product}
                                    key={product.productId}
                                />
                            );
                        })}
                    </div>
                    <div className='text-right text-xl my-4'>
                        <p>
                            Subtotal (
                            {cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                            items):{' '}
                            <span className='font-bold'>
                                $
                                {numeral(
                                    cartItems.reduce(
                                        (a, c) => a + c.quantity * c.price,
                                        0
                                    )
                                ).format('0,0.00')}
                            </span>
                        </p>
                    </div>
                </div>
                <div className='lg:flex-initial mx-auto p-4 border bg-white max-h-28 mt-4 sticky top-4'>
                    <p className='text-xl'>
                        Subtotal (
                        {numeral(
                            cartItems.reduce((a, c) => a + c.quantity, 0)
                        ).format('0,0')}{' '}
                        items):{' '}
                        <span className='font-bold'>
                            $
                            {numeral(
                                cartItems.reduce(
                                    (a, c) => a + c.quantity * c.price,
                                    0
                                )
                            ).format('0,0.00')}
                        </span>
                    </p>
                    <button
                        onClick={handleCheckoutOnClick}
                        className='w-full p-1 my-4 bg-checkout rounded-md'
                    >
                        Proceed to checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
