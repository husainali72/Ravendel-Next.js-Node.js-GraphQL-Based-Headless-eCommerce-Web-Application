import React, { useState, useEffect } from "react";
import Head from 'next/head';
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import client from "../../apollo-client";
import { Container } from "react-bootstrap";
import { GET_HOMEPAGE_DATA_QUERY, GET_RECENT_PRODUCTS_QUERY, GET_RELATED_PRODUCTS_QUERY } from "../../queries/home";
import { GET_SINGLE_PRODUCT, GET_PRODUCT_REVIEWS, GET_REVIEWS } from "../../queries/productquery";
import { GET_PRODUCTS_QUERY } from "../../queries/shopquery";
import { Tab, Col, Nav } from 'react-bootstrap';
import GalleryImagesComponents from "../../components/category/GalleryImage";
import OnSaleProductCard from "../../components/category/onSaleProductCard";
import ReviewForm from "../../components/singleproductcomponent/ReviewForm";
import { useRouter } from "next/router"
import { useSession } from "next-auth/react";
import Loading from "../../components/breadcrumb/loading";
import { useSelector } from "react-redux";
import Reviews from "../../components/Reviews/Reviews";
import { currencySetter } from "../../utills/helpers";
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import toast, { Toaster } from 'react-hot-toast';


function transform(node, index) {
    if (node.type === "tag" && node.name === "h1" || node.name === "h2" || node.name === "h3" ) {
      node.name = "p";
      return convertNodeToElement(node, index, transform);
    }
}
const options = {
    decodeEntities: true,
    transform
  };

const SingleProduct = ({ recentProducts,singleproducts, productReviews, currencyStore, homepageData, lowStockThreshold, outOfStockVisibility, outOfStockThreshold }) => {
    const router = useRouter();
    const session = useSession()
    const currencyOpt = currencyStore?.currency_options?.currency
    const decimal = currencyStore?.currency_options?.number_of_decimals
    const [currency, setCurrency] = useState("$")
    const [allProduct, setAllProduct] = useState([])
    const [singleProduct, setSingleProduct] = useState(null);
    const [sliderImages, setSliderImages] = useState([]);
    const [singleProductReview,setSingleProductReview] = useState([])
    const productss = useSelector(state => state.products ) 
    const settingss =  useSelector(state => state.setting);
    const [stockClass, setStockClass] = useState("")
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    useEffect(() => {
        currencySetter(currencyOpt,setCurrency);
    }, [])
    useEffect(() => {
        getRelatedProducts();
    }, [singleproducts])
    const category = singleproducts?.categoryId.map(cat => cat?.id);
    const productID = singleproducts._id;
    const getRelatedProducts = async ()=>{  
        try {
            const { data: shopproductcategory } = await client.query({
                query: GET_RELATED_PRODUCTS_QUERY,
                variables: { category,productID }
            });
            recentProducts = shopproductcategory;
            const productss = shopproductcategory.relatedProducts;
            setAllProduct(productss)
        }
        catch (e) {
            console.log("ShopProduct Error===", e)
        }
    }
    

    useEffect(() => {
        setSingleProductReview(productReviews)
    }, [ singleproducts ])
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

    return (
        <div>
            <Head>
                {singleproducts && singleproducts.meta.title ?
                    <title>{singleproducts.meta.title + " | Ravendel"}</title>
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
            <Toaster />
                <Container>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="product-detail accordion-detail">
                                <div>
                                    <GalleryImagesComponents decimal={decimal} stockClass={stockClass} setStockClass={setStockClass} outOfStockThreshold={outOfStockThreshold} lowStockThreshold={lowStockThreshold} outOfStockVisibility ={outOfStockVisibility} galleryImages={sliderImages} singleproducts={singleproducts} currency = {currency} />
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
                                                        {singleproducts.description !== null && singleproducts.description !== "" ?
                                                        ReactHtmlParser(singleproducts.description, options) : <p>Product Discription not available</p>}
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="review">
                                                    {singleProduct !== null ? <Reviews singleProductReview={singleProductReview} /> : null}

                                                    {session.status === "authenticated" ? (
                                                        <ReviewForm productId={singleproducts._id} />
                                                    ) : <div style={{ padding: "20px", marginTop: "15px" }}>
                                                        <p>No Data Found</p></div>}

                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Nav>
                                    </Col>
                                </Tab.Container>
                                <hr></hr>
                                <h4 className='theme-color'>Related <span className='black-color'>Products</span></h4>
                                <OnSaleProductCard
                                    onSaleProduct={allProduct}
                                    hidetitle
                                    currencyProp={currency}
                                    decimal={decimal}
                                />
                            </div>
                        </div>
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
        const { data: shopproducts } = await client.query({
            query: GET_PRODUCTS_QUERY
        });
        allProduct = shopproducts.products.data;
    }
    catch (e) {
        console.log("ShopProduct Error===", e.networkError && e.networkError.result ? e.networkError.result.errors : '')
    }

    const paths = allProduct.map((curElem) => ({
        params: { singleproduct: curElem.url.toString() }

    }))
    return {
        paths,
        fallback: false,
    }
}
export async function getStaticProps({ params }) {
    const url = params.singleproduct
    let id ="";
    let homepageData = [];
    let singleproducts = [];
    let allProduct = [];
    let recentProducts =[];
    let productReviews = [];
    var currencyStore = []
    let lowStockThreshold = 4
    let outOfStockVisibility = true
    let outOfStockThreshold = 0

    /* ========================================= get HomePage Data========================================*/

    try {
        const { data: homepagedata } = await client.query({
            query: GET_HOMEPAGE_DATA_QUERY
        })
        homepageData = homepagedata
        lowStockThreshold = homepagedata?.getSettings?.store?.inventory?.low_stock_threshold
        outOfStockThreshold = homepagedata?.getSettings?.store?.inventory?.out_of_stock_threshold
        outOfStockVisibility = homepagedata?.getSettings?.store?.inventory?.out_of_stock_visibility
        currencyStore = homepagedata?.getSettings?.store
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
        id = singleproducts._id;
       
    }
    catch (e) {
        console.log("ShopProduct Error===", e.networkError.result.errors)
    }
    /* ========================================= get featureProduct ========================================*/
    // try {
    //     const { data: shopproductcategory } = await client.query({
    //         query: GET_RECENT_PRODUCTS_QUERY,
    //     });
    //     allProduct = shopproductcategory.recentproducts;
    // }
    // catch (e) { 
    //     console.log("ShopProduct Error===", e)
    // }
    //
    

    try {
        const { data: productReviewData } = await client.query({
            query: GET_PRODUCT_REVIEWS,
            variables : {id}
        })
        productReviews = productReviewData.productwisereview.data;
    }
    catch (e) {
        console.log("review Error", e.networkError.result.errors);
    }

    return {
        props: {
            singleproducts,
            allProduct,
            productReviews,
            homepageData,
            currencyStore,
            lowStockThreshold,
            outOfStockVisibility,
            outOfStockThreshold,
            recentProducts
        },
        revalidate: 10,
    }
}