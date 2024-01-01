import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import { getImage, imageOnError } from '../../utills/helpers';
import NoImagePlaceHolder from '../../components/images/NoImagePlaceHolder.png';
const FeatureBrand = ({ brands, homepageData }) => {
    const imageType = homepageData?.getSettings?.imageStorage?.status;
    return (
        <section className="product-cart-section">
            <Container>
                <h4 className='theme-color mb-2'>Featured <span className='black-color'>Brands</span></h4>
                <div className="brand-container">
                    {brands.map((item, i) => {
                        return (
                            <div className="brand-card-container" key={i}>
                                <div className="category-card-image brand-card-image">
                                    <Link href={`/brands/[brand]?url=${item.url}`} as={`/brands/${item.url}`}>
                                        <img
                                            src={getImage(item?.brand_logo, imageType) || NoImagePlaceHolder.src}
                                            className="category-card-img"
                                            // onError={(e) => e.type === 'error' ? e.target.src = NoImagePlaceHolder.src : null}
                                            onError={imageOnError}
                                            alt={item?.name}
                                        />
                                    </Link>
                                </div>
                                <div >
                                    <p
                                        className="brand-card-title"
                                    >
                                        {item?.name}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}
export default FeatureBrand;