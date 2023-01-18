import React, { useState, useEffect } from "react";
import { getImage } from "../utills/helpers";
import client from "../apollo-client";
import StarRating from "../components/breadcrumb/rating";
import MultiRangeSlider from "../components/breadcrumb/multirangeSlider";
import BreadCrumb from "../components/breadcrumb/breadcrumb";
import { Container, Dropdown, Form } from "react-bootstrap";
import { GET_PRODUCTS_QUERY, GET_BRANDS_QUERY } from "../queries/shopquery";
import OnSaleProductCard from "../components/category/onSaleProductCard";
import ShopProducts from "../components/shoppage/shopProducts";
import { GET_HOMEPAGE_DATA_QUERY, GET_CATEGORIES_QUERY } from "../queries/home";
import { brandsAction, categoryAction } from "../redux/actions/brandAction";
import { useSelector, useDispatch } from "react-redux";
import { OpenMenu } from '../utills/app';
import { CloseMenu } from '../utills/app';
import { OpenSortMenu } from '../utills/app';
import { CloseSortMenu } from '../utills/app';

const Shop = ({ shopProducts, brandProduct, shopProduct }) => {
    const dispatch = useDispatch();
    // console.log("shopProduct", shopProducts);
    const usercart = useSelector(state => state.userCart)
    // console.log("userCart", usercart);
    const [rangevalue, setRangevalue] = useState('');
    let onSaleProduct = [];
    var number = 0;
    if (shopProducts && shopProducts?.products?.data?.length > 0) {
        number = shopProducts.products.data?.length;
        onSaleProduct = shopProducts.products.data;
    }
    else {
        <h1>loading...</h1>
    }

    useEffect(() => {
        if (brandProduct) {
            dispatch(brandsAction(brandProduct))
            dispatch(categoryAction(shopProduct.data))
        }
    }, [brandProduct])
    return (<>
        <BreadCrumb title={"Shop"} />
        <section className="product-cart-section">
            <Container>
                <div className="shop-Container" >
                    <div className="col-lg-3">
                        <ShopProducts category={shopProduct.data} name={"Category"} />
                        <ShopProducts brandProduct={brandProduct} name={"Brand"} brands />
                        <div className="primary-sidebar sticky-sidebar category-shop-cart my-3">
                            <div className="theiaStickySidebar category-box-filler">
                                <div className="widget-category">
                                    <h5 className="category-section-title mb-30 wow fadeIn animated animated animated">Fill by Price</h5>
                                    <div style={{ marginTop: '30px' }}>
                                        <MultiRangeSlider
                                            min={0}
                                            max={1000}
                                            onChange={({ min, max }) => setRangevalue(`${min}-${max}`)}
                                        />
                                        <p style={{ paddingTop: "10px", fontWeight: "600" }}>range : ${rangevalue}</p>
                                    </div>
                                    <div className="fillter-by-price-checkbox">
                                        <h5>Color</h5>
                                        <Form.Check aria-label="option 1" label="Red" ></Form.Check>
                                        <Form.Check aria-label="option 1" label="Blue" ></Form.Check>
                                        <Form.Check aria-label="option 1" label="Green" ></Form.Check>
                                        <button type="button" className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178" }}>
                                            <i className="fa fa-filter"></i>Fillter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="primary-sidebar sticky-sidebar category-shop-cart my-3">
                            <div className="theiaStickySidebar category-box-filler">
                                <div className="widget-category">
                                    <h5 className="category-section-title mb-30 wow fadeIn animated animated animated">New Product</h5>
                                    {/* {shopProducts && shopProducts.products ?  */}
                                    {onSaleProduct && onSaleProduct?.length > 0 ? (<>
                                        {onSaleProduct.map((product, i) => (
                                            <div style={{ display: 'flex', marginTop: 3 }} key={i}>
                                                <div>
                                                    <img src={getImage(product.feature_image, 'original')} width="75px" height="85px" />
                                                </div>
                                                <div style={{ padding: "3px", marginLeft: "10px" }}>
                                                    {product.name?.length > 15 ? (
                                                        <strong
                                                            dangerouslySetInnerHTML={{
                                                                __html: product.name.substring(0, 15) + "...",
                                                            }}
                                                        ></strong>
                                                    ) : (
                                                        <strong>{product.name}</strong>
                                                    )}
                                                    <StarRating stars={"5"} />
                                                    <p style={{ marginTop: 0 }}>${product.pricing.sellprice}</p>
                                                </div>
                                            </div>
                                        ))
                                        }
                                    </>) : null}

                                    {/* <Cart shopProducts={shopProducts} imgUrl={imgUrl} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shop-product-container">
                        <div className="shop-product-fillter">
                            <div className="totall-product">
                                <p> We found <strong className="text-brand">{number}</strong> items for you!</p>
                            </div>
                            <div className="sort-by-product-area">
                                <div className="sort-by-cover mr-10">
                                    <div className="sort-by-product-wrap">
                                        <div className="sort-by">
                                            <span><i className="fas fa-border-all" aria-hidden="true"></i>Show:</span>
                                        </div>

                                        <span className="drop-down-btn item-down" id="menuDown">
                                            <i className="fas fa-angle-down" onClick={() => OpenMenu()}></i>
                                        </span>
                                        <span className="drop-down-btn item-up" id="menuUp" >
                                            <i className="fas fa-angle-up" onClick={() => CloseMenu()}></i>
                                        </span>
                                        <div className="drop-down-item-menu" id="item-menu">
                                            <li>
                                                <a href="#">50</a>
                                            </li>
                                            <li>
                                                <a href="#">100</a>
                                            </li>
                                            <li>
                                                <a href="#">150</a>
                                            </li>
                                        </div>
                                    </div>
                                </div>
                                <div className="sort-by-cover">
                                    <div className="sort-by-product-wrap">
                                        <div className="sort-by">
                                            <span><i className="fas fa-border-all" aria-hidden="true"></i>Sort by:</span>
                                        </div>
                                        <span className="drop-down-btn item-down" id="menuDown2">
                                            <i className="fas fa-angle-down" onClick={() => OpenSortMenu()}></i>
                                        </span>
                                        <span className="drop-down-btn item-up" id="menuUp2" >
                                            <i className="fas fa-angle-up" onClick={() => CloseSortMenu()}></i>
                                        </span>
                                        <div className="drop-down-item-menu" id="sort-menu">
                                            <li>
                                                <a href="#">Low To High</a>
                                            </li>
                                            <li>
                                                <a href="#">High to Low</a>
                                            </li>
                                            <li>
                                                <a href="#">Release Date</a>
                                            </li>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {onSaleProduct && onSaleProduct?.length > 0 ? (
                            <div className="shop-product-list">
                                <OnSaleProductCard
                                    onSaleProduct={onSaleProduct}
                                    hidetitle
                                />
                            </div>) :
                            <div style={{ padding: "50px" }}>
                                <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>Product not available</p>
                            </div>}

                    </div>
                </div>
            </Container>
        </section>
    </>
    )
}
export default Shop;

export async function getStaticProps() {
    var homepageData = [];
    var shopProducts = [];
    var brandProduct = [];
    var shopProduct = [];
    /* ===============================================Get HomepageData Settings ===============================================*/

    try {
        const { data: homepagedata } = await client.query({
            query: GET_HOMEPAGE_DATA_QUERY
        })
        homepageData = homepagedata
    }
    catch (e) {
        console.log("homepage Error===", e.networkError && e.networkError.result ? e.networkError.result.errors : '');
    }
    //   console.log("homepage", homepageData);

    /* ===============================================Get Product Shop Settings ===============================================*/
    try {
        const { data: shopproducts } = await client.query({
            query: GET_PRODUCTS_QUERY
        });
        shopProducts = shopproducts;
    }
    catch (e) {
        console.log("ShopProduct Error===", e.networkError && e.networkError.result ? e.networkError.result.errors : '')
    }
    // console.log("shopProducts", shopProducts);

    try {
        const { data: shopproductcategory } = await client.query({
            query: GET_CATEGORIES_QUERY
        });
        shopProduct = shopproductcategory.productCategories;
    }
    catch (e) {
        console.log("ShopProduct Error===", e.networkError && e.networkError.result ? e.networkError.result.errors : '')
    }
    // console.log("shopproductcategory", shopProduct);


    /* ===============================================Get Brand Data Settings ===============================================*/

    try {
        const { data: brandproductData } = await client.query({
            query: GET_BRANDS_QUERY
        })
        brandProduct = brandproductData.brands.data;
    }
    catch (e) {
        console.log("===brand", e.networkError && e.networkError.result ? e.networkError.result.errors : '')
    }
    // console.log("brandProduct", brandProduct);

    return {
        props: {
            homepageData,
            shopProducts,
            shopProduct,
            brandProduct,
        },
        revalidate: 10,
    }
}