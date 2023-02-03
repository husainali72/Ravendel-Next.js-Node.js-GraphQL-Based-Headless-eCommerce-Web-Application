import React, { useState, useEffect } from 'react';
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import { Container } from "react-bootstrap";
import OnSaleProductCard from "../../components/category/onSaleProductCard";
import { GET_SINGLE_PRODUCT, GET_FILTEREDPRODUCTS, GET_BRANDS_QUERY } from "../../queries/shopquery";
import { useRouter } from 'next/router';
import { GET_HOMEPAGE_DATA_QUERY, GET_CATEGORIES_QUERY } from '../../queries/home';
import { useSelector } from "react-redux";
import ShopProducts from "../../components/shoppage/shopProducts";
const SingleCategoryProduct = ({ singlecategory , paths ,shopProduct,brandProduct}) => {
    const [cats,setCats] = useState({})
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

    const getProducts = async ()=>{
        let config = { category: [singlecategory.id], brand: [], attribute: [], price: [] }
        try { 
            const { data: fillterPrroducts } = await client.query({
                query: GET_FILTEREDPRODUCTS,
                variables: {  config },
            })
            let fillterProduct = fillterPrroducts.filteredProducts
            if(fillterProduct.length>0){
                const pro = fillterProduct.map(product =>{
                    return{
                        brand: product.brand,
                        categoryId: product.categoryId,
                        feature_image: product.feature_image,
                        name:product.name,
                        pricing:product.pricing,
                        quantity: product.quantity,
                        status:product.status,
                        url:product.url,
                        __typename: product.__typename,
                        _id:product._id
                    }
                } )
                setProducts(pro)
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
            <PageTitle title={"category"} />
            <BreadCrumb title={`category  >  ${categoryDetail.name}`} />
            <Container>
                <div className="single-category-page">
                    <div className="category-option">
                        <ShopProducts category={shopProduct?.data} name={"Category"} />
                        <ShopProducts brandProduct={brandProduct} name={"Brand"} brands />
                    </div>
                    <div className="single-category">
                        <strong style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>{categoryDetail.name}</strong>
                        {products && products?.length > 0 ? (
                            <OnSaleProductCard
                                onSaleProduct={products}
                                hidetitle
                            />
                        ) : (
                            <div style={{ padding: "50px" }}>
                                <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>Category Product not available</p>
                            </div>
                        )}

                    </div>
                </div>
            </Container>
        </div>
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

    const paths = shopProduct?.data?.map((curElem) => {
        return{
            params: { categorys: curElem.url.toString() }
        }
    })
    return {
        paths,
        fallback: false,
    }
}
export async function getStaticProps({ params }) {
    const url = params.categorys
    var homepageData = [];
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
            shopProduct
        },
        revalidate: 10,
    }
}
