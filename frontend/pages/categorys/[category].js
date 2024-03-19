/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import { Container } from "react-bootstrap";
import { GET_SINGLE_PRODUCT, GET_FILTEREDPRODUCTS, GET_BRANDS_QUERY } from "../../queries/shopquery";
import { useRouter } from 'next/router';
import { GET_HOMEPAGE_DATA_QUERY, GET_CATEGORIES_QUERY } from '../../queries/home';
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getImage } from "../../utills/helpers";
import Link from 'next/link';
import { useRef } from 'react';
import Head from 'next/head';
import { capitalize } from 'lodash';
const SingleCategoryProduct = ({ singlecategory, paths, shopProduct, brandProduct, url }) => {
    const getSetting = useSelector(state => state.setting)

    const slider = useRef();
    const slideLeft = () => {
        slider.current.scrollLeft = slider.current.scrollLeft - 500;
    }
    const slideRight = () => {
        slider.current.scrollLeft = slider.current.scrollLeft + 500;
    }
    const [cats, setCats] = useState({})
    const [products, setProducts] = useState([]);
    const [categoryDetail, setCategoryDetail] = useState({
        name: "",
        products: [],
        image: {},
        description: "",
        meta: {
            title: "",
            keywords: "",
            description: "",
        },
    });
    const router = useRouter()

    if (router.isFallback) {
        return <div>loading...</div>
    }
    const category = useSelector(state => state.brand)
    useEffect(() => {
        setCats(category);
    }, [category]);
    useEffect(() => {
        setCategoryDetail(singlecategory);
    }, [singlecategory]);
    // const catId = shopProduct?.data && shopProduct.data.filter(product => product.url === url)[0].id
    // const subCat = catId && shopProduct?.data && shopProduct.data.filter(cat => cat.parentId === catId)

    // const getProducts = async () => {
    //     // let config = { category: [singlecategory.id], brand: [], attribute: [], price: [] }
    //     // try { 
    //     //     const { data: fillterPrroducts } = await client.query({
    //     //         query: GET_FILTEREDPRODUCTS,
    //     //         variables: {  config },
    //     //     })
    //     //     let fillterProduct = fillterPrroducts.filteredProducts
    //     //     if(fillterProduct.length>0){
    //     //         const pro = fillterProduct.map(product =>{
    //     //             return{
    //     //                 brand: product.brand,
    //     //                 categoryId: product.categoryId,
    //     //                 feature_image: product.feature_image,
    //     //                 name:product.name,
    //     //                 pricing:product.pricing,
    //     //                 quantity: product.quantity,
    //     //                 status:product.status,
    //     //                 url:product.url,
    //     //                 __typename: product.__typename,
    //     //                 _id:product._id
    //     //             }
    //     //         } )
    //     //         setProducts(pro)
    //     //     }
    //     //     // setProducts(fillterProduct )
    //     // }
    //     // catch (e) {
    //     //     console.log("fillerProduct ERRoR : ", e);
    //     // }

    // }
    // useEffect(() => {
    //     getProducts()
    // }, [setCategoryDetail])


    // const rederict = async () => {
    //     await router.push(`/subcategory/${url}`)
    // }
    // if (subCat?.length <= 0) {
    //     rederict()
    // }
    return (
        <>
            <Head>
                {singlecategory && singlecategory.meta && singlecategory.meta.title ?
                    <title>{capitalize(singlecategory?.meta?.title) + " | Ravendel"}</title>
                    : null}
                {singlecategory && singlecategory?.meta && singlecategory?.meta?.description ?
                    <meta name="description" content={singlecategory?.meta?.description} />
                    : null}
                {singlecategory && singlecategory?.meta && singlecategory?.meta?.keywords ?
                    <meta name="keywords" content={singlecategory?.meta?.keywords} />
                    : null}
            </Head>
            {/* {subCat?.length > 0 ? <div className='categories-cart-container' >
                <BreadCrumb title={`category  >  ${categoryDetail.name}`} />
                <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h2 style={{ color: "#088178", margin: "40px" }}><strong>{categoryDetail.name}</strong></h2>
                    {subCat.length > 0 ?
                        <Row xs={1} md={1} lg={2} className="g-4">
                            {subCat.map((cat, idx) => (
                                <Col>
                                    <Card
                                        bg='light'
                                        style={{ display: "flex", flexDirection: "row", height: "100%" }}>
                                        <div className='card-img-wrapper'>
                                            <img
                                                src={getImage(cat?.image, 'original', false, getSetting)}
                                                className='subcat-img'
                                                onError={(e) => e.type === 'error' ? e.target.src = "https://dummyimage.com/300" : null}
                                                alt={cat?.name}
                                            />
                                        </div>
                                        <Card.Body style={{ flexGrow: "2" }}>
                                            <Card.Title>{cat?.name}</Card.Title>
                                            <Card.Text>
                                                This is a longer card with supporting text below as a natural
                                                lead-in to additional content. This content is a little bit
                                                longer.
                                            </Card.Text>
                                            <Link href={`/subcategory/[categorys]?url=${cat.url}`} as={`/subcategory/${cat.url}`}>
                                                <button type="button"
                                                    className="btn btn-success button button-add-to-cart"
                                                    style={{ marginTop: 12, backgroundColor: "#088178" }}
                                                >Explore Products
                                                </button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row> : <h2>{url}</h2>}
                </Container>
            </div> : null} */}
        </>
    )
}
export default SingleCategoryProduct;

export async function getStaticPaths() {
    var shopProduct = [];
    try {
        const { data: shopproductcategory } = await client.query({
            query: GET_CATEGORIES_QUERY
        });
        shopProduct = shopproductcategory.productCategories;
    }
    catch (e) {
        console.log("ShopProduct Error===", e)
    }
    const filterProducts = shopProduct?.data?.filter(product => product.id !== "63d039bb58194ec30047d5bb")
    if (!filterProducts || filterProducts.length === 0) {
        // Handle the case when filterProducts is undefined or empty
        return {
          paths: [],
          fallback: false,
        };
      }
    const paths = filterProducts && filterProducts?.map((curElem) => {
        return {
            params: { category: curElem.url.toString() }
        }
    })
    return {
        paths,
        fallback: false,
    }
}
export async function getStaticProps({ params }) {
    const url = params.category || null
    var singlecategory = [];
    var fillterProduct = [];
    var brandProduct = [];
    var shopProduct = [];


    /* ===============================================Get SinglePage Category ===============================================*/

    try {
        const { data: shopproductcategory } = await client.query({
            query: GET_SINGLE_PRODUCT,
            variables: { url },
        });
        singlecategory = shopproductcategory.productsbycaturl.data;
    }
    catch (e) {
        console.log("ShopProduct Error===", e?.networkError?.result?.errors)
    }
    /* ===============================================Get fillter Product Category ===============================================*/

    try {
        const { data: shopproductcategory } = await client.query({
            query: GET_CATEGORIES_QUERY
        });
        shopProduct = shopproductcategory.productCategories;
    }
    catch (e) {
        console.log("ShopProduct Error===", e.networkError && e.networkError.result ? e.networkError.result.errors : '')
    }
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
    return {
        props: {
            singlecategory,
            url,
            brandProduct,
            shopProduct
        },
        revalidate: 10
    }
}
