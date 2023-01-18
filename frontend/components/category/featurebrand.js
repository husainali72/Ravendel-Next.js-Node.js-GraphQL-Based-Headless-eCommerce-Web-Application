import Container from 'react-bootstrap/Container';
const FeatureBrand = () => {
    return (
        <section className="product-cart-section">
            <Container>
                <h4 style={{ color: "#088178" }}>Feature <span style={{ color: "black" }}>Brand</span></h4>
                <div className="feature-brand mt-5 mb-4">
                    <img
                        className=""
                        src="http://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-2.png"
                        width="auto"
                        height="100"
                        onError={(e) => e.type === 'error' ? e.target.src = "https://dummyimage.com/300" : null}
                    />
                    <img
                        className=""
                        src="http://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-2.png"
                        width="auto"
                        height="100"
                        onError={(e) => e.type === 'error' ? e.target.src = "https://dummyimage.com/300" : null}
                    />
                    <img
                        className=""
                        src="http://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-2.png"
                        width="auto"
                        height="100"
                        onError={(e) => e.type === 'error' ? e.target.src = "https://dummyimage.com/300" : null}
                    />
                    <img
                        className=""
                        src="http://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/brand-2.png"
                        width="auto"
                        height="100"
                        onError={(e) => e.type === 'error' ? e.target.src = "https://dummyimage.com/300" : null}
                    />
                </div>
            </Container>
        </section>
    )
}
export default FeatureBrand;