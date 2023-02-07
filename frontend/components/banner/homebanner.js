import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel';
import { getImage } from '../../utills/helpers';

const Homebanner = ({ slider, Image }) => {
    return (
        <>
            <Carousel>
                {slider.map((slide, i) => (
                    <Carousel.Item key={i}>
                        <Link href="/">
                            <Image src={getImage(slide.image, 'original')} width={2000} height={500} sx={{ alignItems: 'center', mt: 0 }} className="d-block w-100" alt={`slider`} />
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    )
}
export default Homebanner;