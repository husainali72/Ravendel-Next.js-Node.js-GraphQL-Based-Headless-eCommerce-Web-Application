/* eslint-disable react/prop-types */
import client from '../../apollo-client'
import { GET_BRANDS_QUERY, GET_FILTEREDPRODUCTS } from '../../queries/shopquery'
import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import MultiRangeSlider from '../../components/breadcrumb/multirangeSlider';
import OnSaleProductCard from '../../components/category/onSaleProductCard';
import ShopProducts from '../../components/shoppage/shopProducts';
import { currencySetter } from '../../utills/helpers';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { capitalize, get } from 'lodash';
import BreadCrumb from '../../components/breadcrumb/breadcrumb';
import { getAllAttributes } from '../../redux/actions/productAction';
const Brand = ({ brand, filteredProducts, brandProduct }) => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const [rangevalue, setRangevalue] = useState('');
    const attributes = useSelector(state => state.products.attributes)
    const [currency, setCurrency] = useState("$")
    const [filteredproducts, setFilteredProducts] = useState([]);
    const [FilterAttribute, setFilterAttribute] = useState([])
    const settings = useSelector((state) => state.setting);
    useEffect(() => {
        const currencyStoreOptions = get(settings, "setting.store.currency_options", {});
        currencySetter(currencyStoreOptions, setCurrency);
      }, [settings]);
    useEffect(() => {
        dispatch(getAllAttributes());
    }, [])
    useEffect(() => {
        const brandProducts = filteredProducts?.filter((product) => product?.brand?.id === brand?.id)
        setProducts(brandProducts)
        setFilteredProducts(brandProducts)
    }, [brand, filteredProducts])
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
        <>
            <Head>
                {brand && brand.meta && brand.meta.title ?
                    <title>{capitalize(brand?.meta?.title) + " | Ravendel"}</title>
                    : null}
                {brand && brand?.meta && brand?.meta?.description ?
                    <meta name="description" content={brand?.meta?.description} />
                    : null}
                {brand && brand?.meta && brand?.meta?.keywords ?
                    <meta name="keywords" content={brand?.meta?.keywords} />
                    : null}
            </Head>
            <BreadCrumb title={`brands  >  ${brand.name}`} />
            <section className="product-cart-section">
                <Container>
                    <div className="shop-Container" >
                        <div className="col-lg-3">

                            <ShopProducts brandProduct={brandProduct} name={"Brands"} brands />
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

                                            <button type="button" className="btn btn-success primary-btn-color" style={{ marginTop: 12}} onClick={filterData}>
                                                <i className="fa fa-filter"></i>Fillter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="shop-product-container">
                            <div className="shop-product-fillter">
                                <div className="totall-product">
                                    <h4 className='theme-color' >Products For <span className='black-color' >{capitalize(brand?.name)}</span></h4>
                                </div>

                            </div>
                            {filteredproducts && filteredproducts?.length > 0 ? (
                                <div className="shop-product-list">
                                    <OnSaleProductCard
                                        onSaleProduct={filteredproducts}
                                        hideTitle
                                    />
                                </div>) :
                                <div style={{ padding: "50px" }}>
                                    <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>No Data Found</p>
                                </div>}

                        </div>
                    </div>
                </Container>
            </section >
        </>
    )
}

export default Brand


export async function getStaticPaths() {
    var brands = []
    try {
        const { data: brandproductData } = await client.query({
            query: GET_BRANDS_QUERY
        })
        brands = brandproductData.brands.data;

    }
    catch (e) {
        console.log("===brand", e.networkError && e.networkError.result ? e.networkError.result.errors : '')
    }

    const paths = brands?.map((brand) => {
        return {
            params: { brand: brand?.url?.toString() }
        }
    })
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const url = params?.brand
    var brands = []
    var brand = {}
    var filteredProducts = []
    var brandProduct = [];
    /* ===============================================Get Brand Product ===============================================*/
    try {
        const { data: brandproductData } = await client.query({
            query: GET_BRANDS_QUERY
        })
        brandProduct = brandproductData.brands.data;
    }
    catch (e) {
        console.log("===brand", e.networkError && e.networkError.result ? e.networkError.result.errors : '')
    }

    /* ===============================================Get Brands Prdouct ===============================================*/

    try {
        const { data: brandproductData } = await client.query({
            query: GET_BRANDS_QUERY
        })
        brands = brandproductData?.brands?.data;
        brand = brands?.find(item => item.url === url)

    }
    catch (e) {
        console.log("===brand", e.networkError && e.networkError.result ? e.networkError.result.errors : '')
    }


    let filter = {
        category: "",
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
                const filteredProduct = {
                    brand: product.brand,
                    categoryId: product.categoryId,
                    feature_image: product.feature_image,
                    name: product.name,
                    pricing: product.pricing,
                    quantity: product.quantity,
                    status: product.status,
                    url: product.url,
                    attribute_master: product.attribute_master,
                    rating: product.rating,
                    __typename: product.__typename,
                    _id: product._id
                }

                filteredProducts.push(filteredProduct)
            })
        }
    }
    catch (e) {
        console.log("fillerProduct ERRoR : ", e);
    }


    return {
        props: {
            brand,
            filteredProducts,
            brandProduct,
        },
        revalidate: 10,
    }

}