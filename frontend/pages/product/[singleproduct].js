import React, { useState, useEffect } from "react";
import Head from 'next/head';
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import client from "../../apollo-client";
import { Container } from "react-bootstrap";
import { GET_HOMEPAGE_DATA_QUERY, GET_RECENT_PRODUCTS_QUERY } from "../../queries/home";
import { GET_SINGLE_PRODUCT, GET_PRODUCT_REVIEWS, GET_REVIEWS } from "../../queries/productquery";
import { Tab, Col, Nav } from 'react-bootstrap';
import GalleryImagesComponents from "../../components/category/GalleryImage";
import OnSaleProductCard from "../../components/category/onSaleProductCard";
import ReviewForm from "../../components/singleproductcomponent/ReviewForm";
import { useRouter } from "next/router"
import { useSession } from "next-auth/react";

import Loading from "../../components/breadcrumb/loading";
import { useSelector } from "react-redux";
import Reviews from "../../components/Reviews/Reviews";


const SingleProduct = ({ singleproducts, allProduct, productReview,allReviewss }) => {
    const router = useRouter();
    const session = useSession()
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    
    const [singleProduct, setSingleProduct] = useState(null);
    // const [allReviews,setAllReviews] = useState([]);
    const [sliderImages, setSliderImages] = useState([]);
    const [singleProductReview,setSingleProductReview] = useState([])
    const productss = useSelector(state => state.products )  
    console.log('Products all revires',productss)
    console.log("single productttt", singleProduct);
   
// console.log('router',router.query)
    useEffect(() => {
       
       
        console.log('product changed')
        // console.log('productReview', productReview.reviews.data)
        const alll = productReview.reviews.data.filter(reviews => reviews.product_id._id === singleproducts._id);
        setSingleProductReview(alll) 

    }, [productReview,singleproducts])
    

    useEffect(() => {
        var product = singleproducts;
        setSingleProduct(product);
        var allimages = [];
        if (product.feature_image) {
            allimages.push(product.feature_image);
        }
        if (product.gallery_image) {
            product.gallery_image.map((img) => {
                allimages.push(img);
            });
        }
        setSliderImages(allimages);
    }, [singleproducts]);
    // console.log("singleproduct.loading", singleproducts.loading);

    console.log('Saree reviews:--',singleProductReview)
    // console.log('all product only reviews:--', allReviews)

    return (
        <div>
            <Head>
                {singleproducts && singleproducts.meta.title ?
                    <title>{singleproducts.meta.title}</title>
                    : null}
                {singleproducts && singleproducts.meta.description ?
                    <meta name="description" content={singleproducts.meta.description} />
                    : null}
                {singleproducts && singleproducts.meta_tag ?
                    <meta name="keywords" content={singleproducts.meta.keywords} />
                    : null}
            </Head>

            <BreadCrumb title={`product`} />
            <section className="product-cart-section">
                <Container>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="product-detail accordion-detail">
                                <div>
                                    <GalleryImagesComponents galleryImages={sliderImages} singleproducts={singleproducts} />
                                </div>
                            </div>
                            <div>
                                <hr></hr>
                                <Tab.Container id="left-tabs-example" defaultActiveKey="description">
                                    <Col>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item style={{ display: "flex" }}>
                                                <Nav.Link type="button" eventKey="description" >Description</Nav.Link>
                                                <Nav.Link eventKey="review">Review</Nav.Link>
                                            </Nav.Item>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="description">
                                                    <div style={{ padding: "20px", marginTop: "15px" }}>
                                                        {singleproducts.description !== null && singleproducts.description !== "" ? (
                                                            singleproducts.description.replace(/(<([^>]+)>)/ig, '')) :
                                                            <p>Product Discription not available</p>
                                                        }</div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="review">
                                                    {singleProduct !== null ? <Reviews singleProductReview={singleProductReview} /> : null}
                                                    
                                                    {session.status === "authenticated" ? (
                                                        <ReviewForm productId={singleproducts._id} />
                                                    ) : <div style={{ padding: "20px", marginTop: "15px" }}>
                                                        <p>Product review not available</p></div>}

                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Nav>
                                    </Col>
                                </Tab.Container>
                                <hr></hr>
                                <h3>Related Products</h3>
                                <OnSaleProductCard
                                    onSaleProduct={allProduct}
                                    hidetitle
                                />
                            </div>

                        </div>
                        {/* <div className="col-lg-3">
                            <h1>product category</h1>
                            <ShopProducts name={"Category"} />
                            <ShopProducts name={"Brand"} />
                        </div> */}
                    </div>

                </Container>
            </section>
        </div>
    )
}
export default SingleProduct;


export async function getStaticPaths() {
    var allProduct = [];
    try {
        const { data: shopproductcategory } = await client.query({
            query: GET_RECENT_PRODUCTS_QUERY
        });
        allProduct = shopproductcategory.recentproducts;
    }
    catch (e) {
        console.log("ShopProduct Error===", e)
    }
    console.log("allProduct", allProduct);

    const paths = allProduct.map((curElem) => ({
        params: { singleproduct: curElem.url.toString() }

    }))

    console.log("paths", paths);
    return {
        paths,
        fallback: false,
    }
}
export async function getStaticProps({ params }) {
    // console.log("params", params);
    const url = params.singleproduct
    // console.log("url", url);
    let homepageData = [];
    let singleproducts = [];
    let allProduct = [];
    let productReview = [];
    let allReviewss = {};
   
       /* ========================================= get all review ========================================*/

       try {
        const { data: Reviews } = await client.query({
          query: GET_REVIEWS
        });
        allReviewss = Reviews
      }
      catch (e) {
        console.log("Reviews Error=======", e.networkError && e.networkError.result ? e.networkError.result.errors : '');
      }
    

    /* ========================================= get HomePage Data========================================*/

    try {
        const { data: homepagedata } = await client.query({
            query: GET_HOMEPAGE_DATA_QUERY
        })
        homepageData = homepagedata
    }
    catch (e) {
        console.log("homepage Error===", e);
    }

    /* ========================================= get SingleProduct Data========================================*/

    try {
        const { data: singleproductsData } = await client.query({
            query: GET_SINGLE_PRODUCT,
            variables: { url },
        });
        singleproducts = singleproductsData.productbyurl.data;
    }
    catch (e) {
        console.log("ShopProduct Error===", e.networkError.result.errors)
    }
    // console.log("singleproducts", singleproducts);




    /* ========================================= get featureProduct ========================================*/
    try {
        const { data: shopproductcategory } = await client.query({
            query: GET_RECENT_PRODUCTS_QUERY,
        });
        allProduct = shopproductcategory.recentproducts;
    }
    catch (e) {
        console.log("ShopProduct Error===", e)
    }
    // console.log("allProduct", allProduct);

    const id = singleproducts._id

    try {
        const { data: productReviewData } = await client.query({
            query: GET_REVIEWS,
        })
        productReview = productReviewData
    }
    catch (e) {
        console.log("review Error", e.networkError.result.errors);
    }
    // console.log("review", productReview);

    return {
        props: {
            singleproducts,
            allProduct,
            productReview,
            allReviewss,
            homepageData
        },
        revalidate: 10,
    }
}