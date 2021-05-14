import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import sliderImageOne from '../assets/slider-image-1.jpg';
import sliderImageTwo from '../assets/slider-image-2.jpg';
import sliderImageThree from '../assets/slider-image-3.jpg';
import sliderImageFour from '../assets/slider-image-4.jpg';

const images = [
    sliderImageOne,
    sliderImageTwo,
    sliderImageThree,
    sliderImageFour,
];

const Slider = () => {
    const properties = {
        prevArrow: (
            <div className='absolute xs:top-1/2 lg:top-1/3 left-2 bg-white bg-opacity-20 rounded-full p-1 cursor-pointer'>
                <BsChevronLeft size={24} />
            </div>
        ),
        nextArrow: (
            <div className='absolute xs:top-1/2 lg:top-1/3 right-2 bg-white bg-opacity-20 rounded-full p-1 cursor-pointer'>
                <BsChevronRight size={24} />
            </div>
        ),
    };

    return (
        <section className='max-w-[1500px] mx-auto relative'>
            <Slide easing='ease' {...properties}>
                {images.map((image, index) => {
                    return (
                        <div key={index} className='each-slide'>
                            <img src={image} alt='Slide' />
                        </div>
                    );
                })}
            </Slide>
        </section>
    );
};

export default Slider;
