import Link from 'next/link';

const ShopProducts = ({ shopcategory, name, brandProduct, brands, category, blogTagsData }) => {
    // console.log("category==", category);
    // console.log("shopcategory", shopcategory);
    return (
        <div>
            <div className="primary-sidebar sticky-sidebar category-shop-cart">
                <div className="theiaStickySidebar category-box-filler">
                    <div className="widget-category">
                        <h4 className="category-section-title">{name}</h4>
                        <ul className="categories-shop">
                            {category ? <ul className="categories-shop">
                                {category.map((category, i) => (
                                    <li className="category-type" key={i}>
                                        <Link href={`/categorys/[categorys]?url=${category.url}`} as={`/categorys/${category.url}`}>
                                            <span value={category.url}>{category.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul> : null}
                            {brands ? (
                                <ul className="categories-shop">
                                    {brandProduct && brandProduct?.length > 0 ? brandProduct.map((brand, i) => (
                                        <li className="category-type" key={i}>
                                            {brand.name}
                                        </li>
                                    )) : null
                                    }</ul>) : null}

                            {blogTagsData && blogTagsData?.length > 0 ? (
                                <ul className="categories-shop">
                                    {blogTagsData.map((tag, i) => (
                                        <li className="category-type" key={i}>
                                            <Link href={`/blogtags/[tags]?url=${tag.url}`} as={`/blogtags/${tag.url}`}>
                                                <span>{tag.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}

                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ShopProducts;
