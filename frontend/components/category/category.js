import Container from 'react-bootstrap/Container';
import { getImage } from "../../utills/helpers";
import Link from 'next/link';
const Category = ({ category }) => {
    console.log("categoryresponse", category);

    return (
        <section className="product-cart-section">
            <Container className="container">
                <div>
                    <h4 style={{ color: "#088178" }}>Product <span style={{ color: "black" }}>Category</span></h4>
                    <div className="category">
                        {category.map((item, i) => (
                            item.parentId === null && (<div className="card-container" key={i}>
                                <div className="category-card-image">
                                    <Link href={`/categorys/[categorys]?url=${item.url}`} as={`/categorys/${item.url}`}>
                                        <img
                                            src={getImage(item?.image, 'original')}
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
                            </div>)
                        ))}

                    </div>
                </div>
            </Container>
        </section>
    )
}
export default Category;