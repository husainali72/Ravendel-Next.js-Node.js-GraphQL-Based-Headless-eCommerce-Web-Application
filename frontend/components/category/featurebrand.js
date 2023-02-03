import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import { getImage } from '../../utills/helpers';
const FeatureBrand = ({brands}) => {
    return (
        <section className="product-cart-section">
            <Container>
                <h4 style={{ color: "#088178" }}>Feature <span style={{ color: "black" }}>Brand</span></h4>
                <div className="category brand-container">
                        {brands.map((item, i) => ( 
                            <div className="brand-card-container" key={i}>
                                <div className="category-card-image brand-card-image">
                                    <Link href={`/brands/[brand]?url=${item.url}`} as={`/brands/${item.url}`}>
                                        <img
                                            src={getImage(item?.brand_logo , 'original')}
                                            className="category-card-img"
                                            onError={(e) => e.type === 'error' ? e.target.src = "https://dummyimage.com/300" : null}
                                            alt={item?.name}
                                        />
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p
                                        className="card-title"
                                        style={{ display: "flex", justifyContent: 'center', margin: "20px 0" }}>
                                        {item?.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
            </Container>
        </section>
    )
}
export default FeatureBrand;