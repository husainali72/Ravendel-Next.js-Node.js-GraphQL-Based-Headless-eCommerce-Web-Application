import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import { Container, Form } from "react-bootstrap";
import OnSaleProductCard from "../../components/category/onSaleProductCard";
import { GET_SINGLE_PRODUCT, GET_FILTEREDPRODUCTS, GET_BRANDS_QUERY } from "../../queries/shopquery";
import { useRouter } from 'next/router';
import { GET_HOMEPAGE_DATA_QUERY, GET_CATEGORIES_QUERY } from '../../queries/home';
import { useDispatch, useSelector } from "react-redux";
import ShopProducts from "../../components/shoppage/shopProducts";
import { settingActionCreator } from '../../redux/actions/settingAction';
import { capitalize } from 'lodash';
import MultiRangeSlider from '../../components/breadcrumb/multirangeSlider';
import { currencySetter } from '../../utills/helpers';
import { getAllAttributes } from '../../redux/actions/productAction';
const SingleCategoryProduct = ({ currencyStore, singlecategory, paths, shopProduct, brandProduct }) => {
    const breadCrumbTitle = shopProduct?.data?.find((catt) => catt.id === singlecategory.parentId)?.name;
    const attributes = useSelector(state => state.products.attributes)
    const [cats, setCats] = useState({})
    const decimal = currencyStore?.currency_options?.number_of_decimals
    const currencyOpt = currencyStore?.currency_options?.currency
    const [currency, setCurrency] = useState("$")
    const [FilterAttribute, setFilterAttribute] = useState([])
    const dispatch = useDispatch()
    const [rangevalue, setRangevalue] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
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
        currencySetter(currencyOpt, setCurrency);
        dispatch(getAllAttributes());
    }, [])
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
                        rating: product.rating,
                        __typename: product.__typename,
                        attribute_master: product?.attribute_master,
                        _id: product._id
                    }])
                    setFilteredProducts((prev) => [...prev, {
                        brand: product.brand,
                        categoryId: product.categoryId,
                        feature_image: product.feature_image,
                        name: product.name,
                        pricing: product.pricing,
                        quantity: product.quantity,
                        status: product.status,
                        url: product.url,
                        rating: product.rating,
                        __typename: product.__typename,
                        attribute_master: product?.attribute_master,
                        _id: product._id
                    }])
                })
            }
        }
        catch (e) {
            console.log("fillerProduct ERRoR : ", e);
        }

    }
    useEffect(() => {
        getProducts()
    }, [setCategoryDetail])
    const handleFilterData = (e, attribute) => {
        let index = FilterAttribute.findIndex((data) => data.name === attribute)
        if (index !== -1) {
            let val_index = FilterAttribute[index].value.findIndex((att_value) => att_value === e.target.value)
            if (val_index !== -1) {
                FilterAttribute[index].value.splice(val_index, 1)
                if (FilterAttribute[index].value.length === 0) {
                    let FilteredProductAttribute = FilterAttribute.filter((FilteredAttribute) => FilteredAttribute.name !== attribute)

                    setFilterAttribute([...FilteredProductAttribute])
                }
                else {
                    setFilterAttribute([...FilterAttribute])
                }
            }
            else {

                FilterAttribute[index].value.push(e.target.value)
                setFilterAttribute([...FilterAttribute])
            }
        }
        else {
            let val = []
            val.push(e.target.value)
            let obj = {
                name: attribute,
                value: val
            }
            let productAttribute = FilterAttribute
            productAttribute.push(obj)
            setFilterAttribute([...productAttribute])
        }
    }
    const filterData = () => {
        let priceRange = rangevalue.split('-')
        if (FilterAttribute && FilterAttribute.length > 0) {
            let data = products.filter((data) => {
                return (data.attribute_master.some((attribute_value) => {
                    return FilterAttribute.some((filteredData) => {
                        return (filteredData.name === attribute_value.id && filteredData.value.some((data1) =>
                            attribute_value.attribute_values.some(val => val._id === data1)
                        ))
                    })
                })
                ) && (data.pricing.sellprice >= parseInt(priceRange[0]) && data.pricing.sellprice <= parseInt(priceRange[1]))

            })
            setFilteredProducts([...data])

        }
        else {
            let data = products.filter((data) => {
                return (data.pricing.sellprice >= parseInt(priceRange[0]) && data.pricing.sellprice <= parseInt(priceRange[1]))
            })
            setFilteredProducts([...data])
        }


    }
    return (
        <div>
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
            <PageTitle title={"category"} />
            <BreadCrumb title={`category  > ${breadCrumbTitle !== undefined ? (breadCrumbTitle + ">") : ""}  ${capitalize(categoryDetail?.name)}`} />
            <section className="product-cart-section">
                <Container>
                    <div className="single-category-page">

                        <div className="category-option">
                            <ShopProducts category={shopProduct?.data} name={"Category"} />
                            <ShopProducts brandProduct={brandProduct} name={"Brand"} brands />
                            <div className="primary-sidebar sticky-sidebar category-shop-cart my-3">
                                <div className="theiaStickySidebar category-box-filler">
                                    <div className="widget-category">
                                        <h5 className="category-section-title mb-30 wow fadeIn animated animated animated">Fill by Price</h5>
                                        <div style={{ marginTop: '30px' }}>
                                            <MultiRangeSlider
                                                min={0}
                                                max={100000}
                                                onChange={({ min, max }) => setRangevalue(`${min}-${max}`)}
                                            />
                                            <p style={{ paddingTop: "10px", fontWeight: "600" }}>range : {currency} {rangevalue}</p>
                                        </div>
                                        <div className="fillter-by-price-checkbox">
                                            {attributes && attributes.length > 0 ? attributes.map((attribute) => {
                                                return (<>
                                                    <h6>{capitalize(attribute.name)}</h6>
                                                    <Form>
                                                        <Form.Group value='{billingInfo.paymentMethod}'
                                                            onChange={(e) => handleFilterData(e, attribute.id)}>
                                                            {attribute.values.map((value) => {
                                                                return (<>
                                                                    <Form.Check label={capitalize(value.name)} name="paymentMethod" value={value._id} />
                                                                </>)

                                                            })}
                                                        </Form.Group>

                                                    </Form>
                                                </>
                                                )
                                            }) : null}

                                            <button type="button" className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178" }} onClick={filterData}>
                                                <i className="fa fa-filter"></i>Fillter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="shop-product-container">
                            <strong style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>{capitalize(categoryDetail.name)}</strong>
                            {filteredProducts && filteredProducts?.length > 0 ? (
                                <div className="shop-product-list">
                                    <OnSaleProductCard
                                        onSaleProduct={filteredProducts}
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
export async function getServerSideProps({ params }) {
    const url = params.category
    var homepageData = [];
    var currencyStore = [];
    var singlecategory = [];
    var fillterProduct = [];
    var brandProduct = [];
    var shopProduct = [];
    var stripe_Public_key = ''
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
            homepageData,
            singlecategory,
            url,
            brandProduct,
            shopProduct,
            currencyStore
        }
    }
}
