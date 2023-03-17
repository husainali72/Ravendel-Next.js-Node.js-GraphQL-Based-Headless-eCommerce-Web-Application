import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import { Container } from "react-bootstrap";
import OnSaleProductCard from "../../components/category/onSaleProductCard";
import { GET_SINGLE_PRODUCT, GET_FILTEREDPRODUCTS, GET_BRANDS_QUERY } from "../../queries/shopquery";
import { useRouter } from 'next/router';
import { GET_HOMEPAGE_DATA_QUERY, GET_CATEGORIES_QUERY } from '../../queries/home';
import { useDispatch, useSelector } from "react-redux";
import ShopProducts from "../../components/shoppage/shopProducts";
import { settingActionCreator } from '../../redux/actions/settingAction';
import { capitalize } from 'lodash';
const SingleCategoryProduct = ({ currencyStore, singlecategory, paths, shopProduct, brandProduct }) => {
    const breadCrumbTitle = shopProduct.data.find((catt)=> catt.id === singlecategory.parentId)?.name;
    const [cats, setCats] = useState({})
    const dispatch = useDispatch()
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
    useEffect(() => {
        dispatch(settingActionCreator(currencyStore?.currency_options))
    }, [currencyStore?.currency_options])
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

    const getProducts = async () => {
        let filter = {
            category: singlecategory.id,
            brand: "",
            most_reviewed: false,
            product_type: "",
            rating: {
                min: 0,
                max: 5
            },
            price: {
                min: 1,
                max: 100000
            },
            search: ""
        }
        try {
            const { data: fillterPrroducts } = await client.query({
                query: GET_FILTEREDPRODUCTS,
                variables: { filter },
            })
            let fillterProduct = fillterPrroducts.filteredProducts
            if (fillterProduct.length > 0) {

                fillterProduct.map(product => {
                    setProducts((prev) => [...prev, {
                        brand: product.brand,
                        categoryId: product.categoryId,
                        feature_image: product.feature_image,
                        name: product.name,
                        pricing: product.pricing,
                        quantity: product.quantity,
                        status: product.status,
                        url: product.url,
                        __typename: product.__typename,
                        _id: product._id
                    }])
                })
            }
            // setProducts(fillterProduct )
        }
        catch (e) {
            console.log("fillerProduct ERRoR : ", e);
        }

    }
    useEffect(() => {
        getProducts()
    }, [setCategoryDetail])

    return (
        <div>
            <Head>
            {singlecategory && singlecategory.meta && singlecategory.meta.title ?
            <title>{ capitalize(singlecategory?.meta?.title) + " | Ravendel" }</title>
            : null}
            {singlecategory && singlecategory?.meta && singlecategory?.meta?.description ?
            <meta name="description" content={singlecategory?.meta?.description} />
            : null}
            {singlecategory && singlecategory?.meta && singlecategory?.meta?.keywords ?
            <meta name="keywords" content={singlecategory?.meta?.keywords} />
            : null}
            </Head>
            <PageTitle title={"category"} />
            <BreadCrumb title={`category  > ${breadCrumbTitle !== undefined ? (breadCrumbTitle + ">") : ""}  ${categoryDetail.name}`} />
            <section className="product-cart-section">
                <Container>
                    <div className="single-category-page">
                        <div className="category-option">
                            <ShopProducts category={shopProduct?.data} name={"Category"} />
                            <ShopProducts brandProduct={brandProduct} name={"Brand"} brands />
                        </div>
                        <div className="shop-product-container">
                            <strong style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>{categoryDetail.name}</strong>
                            {products && products?.length > 0 ? (
                                <div className="shop-product-list">
                                    <OnSaleProductCard
                                        onSaleProduct={products}
                                        hidetitle
                                    />
                                </div>) : (
                                <div style={{ padding: "50px" }}>
                                    <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>No Data Found</p>
                                </div>
                            )}

                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}
export default SingleCategoryProduct;

// export async function getStaticPaths() {
//     var shopProduct = [];
//     try {
//         const { data: shopproductcategory } = await client.query({
//             query: GET_CATEGORIES_QUERY
//         });
//         shopProduct = shopproductcategory.productCategories;
//     }
//     catch (e) {
//         console.log("ShopProduct Error===", e)
//     }

//     const paths = shopProduct?.data?.map((curElem) => {
//         return{
//             params: { categorys: curElem.url.toString() }
//         }
//     })
//     return {
//         paths,
//         fallback: false,
//     }
// }
export async function getServerSideProps({ params }) {
    const url = params.category
    var homepageData = [];
    var currencyStore = [];
    var singlecategory = [];
    var fillterProduct = [];
    var brandProduct = [];
    var shopProduct = [];
    /* ===============================================Get HomepageData Settings ===============================================*/

    try {
        const { data: homepagedata } = await client.query({
            query: GET_HOMEPAGE_DATA_QUERY
        })
        homepageData = homepagedata
        currencyStore = homepagedata?.getSettings?.store
        stripe_Public_key = homepagedata?.getSettings?.paymnet?.stripe
    }
    catch (e) {
        console.log("homepage Error===", e);
    }

    /* ===============================================Get SinglePage Category ===============================================*/

    try {
        const { data: shopproductcategory } = await client.query({
            query: GET_SINGLE_PRODUCT,
            variables: { url },
        });
        singlecategory = shopproductcategory.productsbycaturl.data;
    }
    catch (e) {
        console.log("ShopProduct Error===", e.networkError.result.errors)
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
            homepageData,
            singlecategory,
            url,
            brandProduct,
            shopProduct,
            currencyStore
        }
    }
}
