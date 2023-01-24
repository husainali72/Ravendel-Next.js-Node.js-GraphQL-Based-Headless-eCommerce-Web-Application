import React, { useState, useEffect } from 'react';
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import { Container, Dropdown } from "react-bootstrap";
import OnSaleProductCard from "../../components/category/onSaleProductCard";
import { GET_SINGLE_PRODUCT, GET_FILTEREDPRODUCTS, GET_BRANDS_QUERY } from "../../queries/shopquery";
import { useRouter } from 'next/router';
import { GET_HOMEPAGE_DATA_QUERY, GET_CATEGORIES_QUERY } from '../../queries/home';
import { useSelector } from "react-redux";
import ShopProducts from "../../components/shoppage/shopProducts";
const SingleCategoryProduct = ({ singlecategory , paths ,shopProduct,brandProduct}) => {
    console.log('singleCategorg==>', singlecategory)
    console.log('brandProduct==>', brandProduct)
    // console.log('singleCategorg==> filterProduct', fillterProduct)
   
    const [cats,setCats] = useState({})
    
    // console.log('categoryyy', category);
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

    useEffect(async  () => {  let config = { category: [singlecategory.id], brand: [], attribute: [], price: [] }
    console.log('useEffect called')
        // console.log('singlecategory.id',singlecategory.id)
    try { 
        // console.log('query run')
        const { data: fillterPrroducts } = await client.query({
            query: GET_FILTEREDPRODUCTS,
            variables: {  config },
        })
        // .then(data => console.log('useEffect config',config.category, 'useEffect fetched filter product~!!!!',data.data.filteredProducts));
        let fillterProduct = fillterPrroducts.filteredProducts
        setProducts(fillterProduct )
        console.log('useEffect config',config.category)
        console.log('useEffect called filterpro',fillterPrroducts.filteredProducts)
        // console.log('useEffect called product',products)
        // // console.log('singleCategorg==> filterProduct', fillterProduct.length)
    }
    catch (e) {
        console.log("fillerProduct ERRoR : ", e);
    }
        
    }, [setCategoryDetail,products]);   

    // useEffect(() => {
    //     setProducts(fillterProduct)
    // }, [products])                           

    return (
        <div>
            <PageTitle title={"category"} />
            <BreadCrumb title={`category  >  ${categoryDetail.name}`} />
            <Container>
                <div className="single-category-page">
                    <div className="category-option">
                        {/* <div className="primary-sidebar sticky-sidebar category-shop-cart my-3">
                            <div className="theiaStickySidebar category-box-filler">
                                <div className="widget-category">
                                    <div className="custom-select">
                                        <select>
                                            <option value="0">Color</option>
                                            <option value="1">Red</option>
                                            <option value="2">Black</option>
                                        </select>
                                    </div>
                                    <div className="custom-select">
                                        <select>
                                            <option value="0">Size</option>
                                            <option value="1">XL</option>
                                            <option value="2">Small</option>
                                            <option value="2">Large</option>
                                            <option value="2">Medium</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div> */}
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
    console.log('pathssss',paths)

    // console.log("paths=+", paths);
    // console.log("paths", paths.filter(({ params }) => !params))
    return {
        paths,
        fallback: false,
    }
}


export async function getStaticProps({ params }) {
    // console.log("params", params);
    const url = params.categorys
    // console.log("url===", url)
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
    // console.log("homepage", homepageData);

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

    // console.log("singlecategory==", singlecategory);

    /* ===============================================Get fillter Product Category ===============================================*/

  
    // console.log("fillerProduct", fillterProduct);

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



    // try {
    //     const { data: brandproductData } = await client.query({
    //         query: GET_BRANDS_QUERY
    //     })
    //     brandProduct = brandproductData.brands.data;
    // }
    // catch (e) {
    //     console.log("===brand", e.networkError && e.networkError.result ? e.networkError.result.errors : '')
    // }
    // // console.log("brandProduct", brandProduct);




    return {
        props: {
            homepageData,
            singlecategory,
            url,
            brandProduct,
            shopProduct
            // fillterProduct,
        },
        revalidate: 10,
    }
}
