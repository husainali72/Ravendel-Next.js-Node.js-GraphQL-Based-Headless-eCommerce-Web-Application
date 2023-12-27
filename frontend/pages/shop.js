import React, { useState, useEffect, useRef } from "react";
import { currencySetter, getImage, getPrice, imageOnError } from "../utills/helpers";
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
import { settingActionCreator } from "../redux/actions/settingAction";
import Link from "next/link";
import { getAllAttributes } from "../redux/actions/productAction";
import { capitalize } from "lodash";
const Shop = ({ shopProducts, brandProduct, shopProduct, currencyStore, homepageData }) => {
    const imageType = homepageData && homepageData?.getSettings?.imageStorage?.status;
    const dispatch = useDispatch();
    const attributes = useSelector(state => state.products.attributes)
    const usercart = useSelector(state => state.userCart)
    const [rangevalue, setRangevalue] = useState('');
    const currencyOpt = currencyStore?.currency_options?.currency
    const [FilterAttribute, setFilterAttribute] = useState([])
    const decimal = currencyStore?.currency_options?.number_of_decimals
    const [currency, setCurrency] = useState("$")
    const [loading, setloading] = useState(false)
    const [onSaleProduct, setonSaleProduct] = useState([])
    const [onSaleAllProduct, setonSaleAllProduct] = useState([])
    const [sortingdata, setSortingdata] = useState([])
    const [number, setNumber] = useState(0)
    const getSetting = useSelector(state => state.setting)


    const [sortingName, setSortingName] = useState({
        name: 'latest',
        title: "Release date"
    },)

    const sortingData = [
        {
            name: 'desc',
            title: "High to low"
        },
        {
            name: 'asc',
            title: "Low to high"
        },
        {
            name: 'latest',
            title: "Release date"
        },
    ]

    const dropdownRef = useRef(null);

    // const handleClickOutside = (event) => {
    //     if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
    //         CloseSortMenu()
    //         CloseMenu()
    //     }

    // };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (shopProducts && shopProducts?.products?.data?.length > 0) {
            setloading(false)
            setNumber(shopProducts.products.data?.length)
            setonSaleProduct(shopProducts.products.data)
            setonSaleAllProduct(shopProducts.products.data)
        }
        else {
            setloading(true)
        }
    }, [shopProducts])
    useEffect(() => {
        dispatch(getAllAttributes());
    }, []);
    useEffect(() => {
        dispatch(settingActionCreator(currencyStore.currency_options))
    }, [currencyStore?.currency_options])
    useEffect(() => {
        currencySetter(currencyOpt, setCurrency);
    }, [])
    useEffect(() => {
        if (brandProduct) {
            dispatch(brandsAction(brandProduct))
            dispatch(categoryAction(shopProduct.data))
        }
    }, [brandProduct])
    const handleClickOutside = (event) => {
        if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
            CloseSortMenu()
            CloseMenu()
        }

    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
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

    const compareFunction = (a, b, sortObject) => {
        switch (sortObject?.name) {

            case 'desc':
                {

                    return b.pricing.sellprice - a.pricing.sellprice;
                }// Sort in descending order
            case 'asc':
                {

                    return a.pricing.sellprice - b.pricing.sellprice;
                }// Sort in ascending order
            case 'latest': {

                return new Date(b.date) - new Date(a.date);
            }
            default: {

                return 0;
            }
        }
    };

    // Function to sort data based on the selected sorting criteria
    const sortData = (sortObject) => {
        setSortingName(sortObject)
        const data = sortingdata.length > 0 ? sortingdata : onSaleAllProduct
        const sortedData = data?.slice()?.sort((a, b) => compareFunction(a, b, sortObject));
        setonSaleProduct([...sortedData])
        CloseSortMenu()
        CloseMenu()
    };
    useEffect(() => {
        if (sortingdata && sortingdata?.length > 0) { sortData(sortingName) }
    }, [sortingdata])
    const filterData = () => {
        let priceRange = rangevalue.split('-')
        if (FilterAttribute && FilterAttribute.length > 0) {
            let data = onSaleAllProduct?.filter((data) => {
                return (data.attribute_master.some((attribute_value) => {
                    return FilterAttribute.some((filteredData) => {
                        return (filteredData.name === attribute_value.id && filteredData.value.some((data1) =>
                            attribute_value.attribute_values.some(val => val._id === data1)
                        ))
                    })
                })
                ) && (data.pricing.sellprice >= parseInt(priceRange[0]) && data.pricing.sellprice <= parseInt(priceRange[1]))

            })
            setonSaleProduct([...data])
            setSortingdata([...data])
            setNumber(data.length)
        }
        else {
            let data = onSaleAllProduct?.filter((data) => {
                return (data.pricing.sellprice >= parseInt(priceRange[0]) && data.pricing.sellprice <= parseInt(priceRange[1]))
            })
            setonSaleProduct([...data])
            setSortingdata([...data])
            setNumber(data.length)
        }


    }

    return (<>
        <BreadCrumb title={"Shop"} />
        <section className="product-cart-section">
            <Container>
                <div className="shop-Container" >
                    <div className="col-lg-3">
                        <ShopProducts shopCategory={shopProduct.data} name={"Category"} />
                        <ShopProducts brandProduct={brandProduct} name={"Brand"} brands />
                        <div className="primary-sidebar sticky-sidebar category-shop-cart my-3">
                            <div className="theiaStickySidebar category-box-filler">
                                <div className="widget-category">
                                    <h5 className="category-section-title mb-30 wow fadeIn animated animated animated">Fill by Price</h5>
                                    <div style={{ marginTop: '30px' }}>
                                        <MultiRangeSlider
                                            min={0}
                                            max={1000000}
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
                        <div className="primary-sidebar sticky-sidebar category-shop-cart my-3">
                            <div className="theiaStickySidebar category-box-filler">
                                <div className="widget-category">
                                    <h5 className="category-section-title mb-30 wow fadeIn animated animated animated">New Product</h5>
                                    {onSaleAllProduct && onSaleAllProduct?.length > 0 ? (<>
                                        {onSaleAllProduct.map((product, i) => (
                                            i < 5 ?

                                                <Link href={`/product/[singleproduct]?url=${product.url}`} as={`/product/${product.url}`} >
                                                    <div style={{ display: 'flex', marginTop: 3, cursor: 'pointer' }} key={i} >
                                                        <div>
                                                            <img className="widget-category-img" src={getImage(product.feature_image, imageType)} onError={imageOnError}  />
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
                                                            <StarRating stars={product?.rating} singleproducts={product} />
                                                            <p style={{ marginTop: 0 }}>{currency} {getPrice(product.pricing.sellprice || product.pricing.price, decimal)}</p>
                                                        </div>
                                                    </div>
                                                </Link> : null
                                        ))
                                        }
                                    </>) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shop-product-container">
                        <div className="shop-product-fillter">
                            <div className="totall-product">
                                <p> We found <strong className="text-brand">{number}</strong> items for you!</p>
                            </div>
                            {loading ? <h5>loading...</h5> : null}

                            <div className="sort-by-product-area">

                                <div className="sort-by-cover mr-10" ref={dropdownRef}>
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

                                <div className="sort-by-cover" >
                                    <div className="sort-by-product-wrap" ref={dropdownRef} onMouseEnter={() => OpenSortMenu()} onMouseLeave={() => CloseSortMenu()}>

                                        <div className="sort-by">
                                            <span><i className="fas fa-border-all" aria-hidden="true"></i>Sort by: {sortingName?.title}</span>
                                        </div>
                                        <span className="drop-down-btn item-down" id="menuDown2">
                                            <i className="fas fa-angle-down" onClick={() => OpenSortMenu()}></i>
                                        </span>
                                        <span className="drop-down-btn item-up" id="menuUp2" >
                                            <i className="fas fa-angle-up" onClick={() => CloseSortMenu()}></i>
                                        </span>
                                        <div className="drop-down-item-menu" id="sort-menu" style={{ width: '100%' }}>
                                            {sortingData?.map((sorting) => {
                                                return (<li onClick={() => sortData(sorting)}>
                                                    <a href="#">{sorting?.title}</a>
                                                </li>)
                                            })}

                                            {/* <li>
                                                <a href="#">High to Low</a>
                                            </li>
                                            <li>
                                                <a href="#">Release Date</a>
                                            </li> */}
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
                                    currencyProp={currency}
                                    decimal={decimal}

                                />
                            </div>) :
                            <div style={{ padding: "50px" }}>
                                <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>No Data Found</p>
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
    var currencyStore = [];
    /* ===============================================Get HomepageData Settings ===============================================*/

    try {
        const { data: homepagedata } = await client.query({
            query: GET_HOMEPAGE_DATA_QUERY
        })
        homepageData = homepagedata
        currencyStore = homepagedata?.getSettings?.store
    }
    catch (e) {
        console.log("homepage Error===", e.networkError && e.networkError.result ? e.networkError.result.errors : '');
    }


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
            shopProducts,
            shopProduct,
            brandProduct,
            currencyStore
        },
        revalidate: 10,
    }
}