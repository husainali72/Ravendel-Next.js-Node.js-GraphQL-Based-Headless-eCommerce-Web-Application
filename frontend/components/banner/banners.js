import Link from 'next/link';
import { Container } from 'react-bootstrap';
const RavendelBanner = () => {
    return (
        <section className="product-cart-section">
            <div className="banner-container">
                <Container className="container">
                    <div className="banner-content">
                        <h1>
                            <strong> Happy Independent</strong> Day<span>. Best Offer for you</span>
                        </h1>
                        <Link href="/shop">
                            <button type="button" className="btn btn-success primary-btn-color" style={{ marginTop: 12 }}>Learn more</button>
                        </Link>
                    </div>
                </Container>
            </div>



        </section>
    )
}
export default RavendelBanner;