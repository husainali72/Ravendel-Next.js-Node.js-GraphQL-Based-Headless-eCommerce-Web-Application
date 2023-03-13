import client from '../../apollo-client'
import { GET_BRANDS_QUERY, GET_FILTEREDPRODUCTS } from '../../queries/shopquery'
import React, { useState, useEffect } from "react";
import { Container, Dropdown, Form } from "react-bootstrap";
import StarRating from '../../components/breadcrumb/rating';
import MultiRangeSlider from '../../components/breadcrumb/multirangeSlider';
import OnSaleProductCard from '../../components/category/onSaleProductCard';
import ShopProducts from '../../components/shoppage/shopProducts';
import { CloseSortMenu } from '../../utills/app';
import { getImage } from '../../utills/helpers';
import { useDispatch } from 'react-redux';
import { GET_HOMEPAGE_DATA_QUERY } from '../../queries/home';
import { settingActionCreator } from '../../redux/actions/settingAction';

const Brand = ({brand,filteredProducts,brandProduct,currencyStore}) => {
    const [products, setProducts] = useState([]);
    const [rangevalue, setRangevalue] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(settingActionCreator(currencyStore?.currency_options))
    }, [currencyStore?.currency_options])
    useEffect(() => {   
        const brandProducts = filteredProducts?.filter((product) => product?.brand?.id === brand?.id)
        setProducts(brandProducts)
    }, [brand,filteredProducts])


  return (
    <section className="product-cart-section">
        <Container>
                <div className="shop-Container" >
                    <div className="col-lg-3">
                        {/* {/* <ShopProducts category={shopProduct.data} name={"Category"} /> */}
                        <ShopProducts brandProduct={brandProduct} name={"Brands"} brands /> 
                        {/* <div className="primary-sidebar sticky-sidebar category-shop-cart my-3">
                            <div className="theiaStickySidebar category-box-filler">
                                <div className="widget-category">
                                    <h5 className="category-section-title mb-30 wow fadeIn animated animated animated">Fill by Price</h5>
                                    <div style={{ marginTop: '30px' }}>
                                        <MultiRangeSlider
                                            min={0}
                                            max={1000}
                                            onChange={({ min, max }) => setRangevalue(`${min}-${max}`)}
                                        />
                                        <p style={{ paddingTop: "10px", fontWeight: "600" }}>range : {rangevalue}</p>
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
                        </div> */}
                    </div>
                    <div className="shop-product-container">
                        <div className="shop-product-fillter">
                            <div className="totall-product">
                            <h4 className='theme-color' >Products For <span className='black-color' >{brand?.name}</span></h4>
                            </div>
                          
                        </div>
                        {products && products?.length > 0 ? (
                            <div className="shop-product-list">
                                <OnSaleProductCard
                                    onSaleProduct={products}
                                    hidetitle
                                />
                            </div>) :
                            <div style={{ padding: "50px" }}>
                                <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>No Data Found</p>
                            </div>}

                    </div>
                </div>

        </Container>
    </section>
  )
}

export default Brand


export async function getStaticPaths(){
    var brands = []
    var pathss =[]
   


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
        return{
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
    var homepageData = [];
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


    let filter = {  category: "",
    // brand:  brand?.id,
    brand:  "",
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
    search: ""}

    try { 
    const { data: fillterPrroducts } = await client.query({
        query: GET_FILTEREDPRODUCTS,
        variables: {  filter },
    })
    let fillterProduct = fillterPrroducts.filteredProducts
    if(fillterProduct.length>0){
    
        fillterProduct.map(product =>{
           const filteredProduct = {brand: product.brand,
                categoryId: product.categoryId,
                feature_image: product.feature_image,
                name:product.name,
                pricing:product.pricing,
                quantity: product.quantity,
                status:product.status,
                url:product.url,
                __typename: product.__typename,
                _id:product._id} 

           filteredProducts.push(filteredProduct)
        } )
    }   
    // setProducts(fillterProduct )
}
catch (e) {
    console.log("fillerProduct ERRoR : ", e);
}


return{
    props:{
        brand,
        filteredProducts,
        brandProduct,
        currencyStore
    },
    revalidate: 10,
}

}