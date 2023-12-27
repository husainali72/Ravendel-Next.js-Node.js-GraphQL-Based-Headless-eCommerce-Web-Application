import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel';
import { getImage } from '../../utills/helpers';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Homebanner = ({ homepageData, slider, Image }) => {
    const [imageSrc, setImageSrc] = useState('');
    const imageType = homepageData?.getSettings?.imageStorage?.status
    const handleImageError = (e) => {
        // Handle the image loading error by setting a fallback image source
        if (e) { setImageSrc('https://dummyimage.com/300'); }
        else {
            setImageSrc('')
        }
    };
    return (
        <>
            <Carousel>
                {slider.map((slide, i) => (
                    <Carousel.Item key={i}>
                        <a href={`${slide.link}`} target={slide.open_in_tab ? "_blank" : null}>
                            <Image src={imageSrc ? imageSrc : getImage(slide.image, imageType, true)} width={2000} height={500} sx={{ alignItems: 'center', mt: 0 }} className="d-block w-100" alt={`slider`} onError={handleImageError} />
                        </a>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    )
}
export default Homebanner;

