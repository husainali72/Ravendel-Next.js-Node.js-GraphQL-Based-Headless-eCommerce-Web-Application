import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel';
import { getImage } from '../../utills/helpers';

const Homebanner = ({ slider, Image }) => {
    return (
        <>
            <Carousel>
                {slider.map((slide, i) => (
                    <Carousel.Item key={i}>
                        <a href={`${slide.link}`} target={slide.open_in_tab ? "_blank" : null}>
                            <Image src={getImage(slide.image, 'original', true)} width={2000} height={500} sx={{ alignItems: 'center', mt: 0 }} className="d-block w-100" alt={`slider`} />
                        </a>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    )
}
export default Homebanner;