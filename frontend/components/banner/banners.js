import Link from 'next/link';
import { Container } from 'react-bootstrap';
const RavendelBanner = () => {
    return (
        <section className="product-cart-section">

            {/* <div className="banner-container">
                <img src="http://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/banner-4.png" width={"100%"} height={"100%"} />
                <div className="banner-content">
                    <h1>
                        We're an Apple<p>
                            Authorised Service Provider</p>
                    </h1>
                </div>
            </div> */}
            <div className="banner-container">
                <Container className="container">
                    <div className="banner-content">
                        <h1>
                            <strong> Happy Independent</strong> Day<span>. Best Offer for you</span>
                        </h1>
                        <Link href="/shop">
                            <button type="button" className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178" }}>Learn more</button>
                        </Link>
                    </div>
                </Container>
            </div>



        </section>
    )
}
export default RavendelBanner;