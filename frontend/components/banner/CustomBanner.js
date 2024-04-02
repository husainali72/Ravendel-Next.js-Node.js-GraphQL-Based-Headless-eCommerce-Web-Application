/* eslint-disable react/prop-types */
import { Container } from 'react-bootstrap';
const CustomBanner = ({variant}) => {
    return (
        <section className="product-cart-section">
            <Container className="container">
                <div className={`banner-container ${variant}`}>
                    <div className="banner-content">
                        
                    </div>
                </div>
            </Container>



        </section>
    )
}
export default CustomBanner;