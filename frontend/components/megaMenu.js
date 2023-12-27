import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';
import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { getImage, imageOnError, toTitleCase } from '../utills/helpers';
import client from '../apollo-client';
import { useSelector } from 'react-redux';
import { capitalize } from 'lodash';
import { GET_CATEGORIES_QUERY, GET_HOMEPAGE_DATA_QUERY, GET_RECENT_PRODUCTS_QUERY } from '../queries/home';

// import { newProducts, productCategories } from './dummyContent';

// import { newProducts, productCategories } from '../dummyContent';

const MegaMenu = ({ openMenu, setOpenMenu }) => {
    const getSetting = useSelector(state => state.setting)
    const [categories, setCategories] = useState([])
    const [productCategories, setproductCategories] = useState([])
    const [newProducts, setNewProducts] = useState([])
    const [imageType, setImageType] = useState('')
    const getHomepageData = async () => {
        var imageStatus = []
        try {
            const { data: homePageData } = await client.query({
                query: GET_HOMEPAGE_DATA_QUERY
            });
            imageStatus = homePageData?.getSettings?.imageStorage?.status
            setImageType(imageStatus)
        }
        catch (e) {
            console.log("Categories Error=======", e);
        }
    }
    const getCategories = async () => {
        try {
            const { data: categoryData } = await client.query({
                query: GET_CATEGORIES_QUERY
            });
            const category = categoryData?.productCategories.data
            setCategories([...category])
        }
        catch (e) {
            console.log("Categories Error=======", e);
        }
    }
    const getNewProducts = async () => {
        try {
            const { data: recentprductData } = await client.query({
                query: GET_RECENT_PRODUCTS_QUERY
            });
            const recentproducts = recentprductData?.recentproducts
            setNewProducts([...recentproducts])
        }
        catch (e) {
            console.log('Recent Product Error===============', e)
        }
    }
    useEffect(() => {
        getHomepageData()
        getCategories()
        getNewProducts()
    }, [openMenu])

    useEffect(() => {

        const mainCategories = [];
        categories?.map((category) => {
            if (!category.parentId) {
                mainCategories.push({ ...category, subcategories: [] })
            }
        })

        categories.forEach(category => {

            const parentIds = Array.isArray(category.parentId)
                ? category.parentId
                : [category.parentId];

            parentIds.forEach(parentId => {
                const parentCategory = mainCategories.findIndex((main) => main.id === parentId);

                if (parentCategory !== -1) {
                    mainCategories[parentCategory].subcategories.push(category);
                }
            });

        });
        mainCategories?.sort((a, b) => b?.subcategories?.length - a?.subcategories?.length);
        setproductCategories([...mainCategories])

    }, [categories])

    return (
        <>
            <div className={` mega-menu-wrapper ${openMenu ? 'open' : ''}`} >
                <div className="container  box-shadow margin-bottom" onMouseLeave={() => setOpenMenu(false)}>
                    <Row className=''>
                        <Col lg={4} className='new-products-col'>
                            <div style={{width:'100%'}}>
                                <h4 className="theme-color my-2"> New <span className="text-black">Products</span></h4>
                                {newProducts?.map((product, i) => (
                                    i < 3 ?
                                        <div style={{ justifyContent:'space-between', paddingInline:'8px', margin: '8px 0px'}} className='product'>
                                            <img src={getImage(product?.feature_image, imageType)} alt="" onError={(e) => e.target.src = ''} />
                                            <div className="details">
                                                <h4>{product?.name}</h4>
                                                <Link href={`/product/[singleproduct]?url=${product.url}`} as={`/product/${product.url}`}>
                                                    <div className="card-btns">
                                                        <button type="button"
                                                            className="btn btn-success "
                                                            style={{ backgroundColor: "#088178" }}

                                                        >
                                                            Shop Now
                                                        </button>

                                                    </div>
                                                </Link>
                                                {/* <button className='link-btn'>Shop Now <HiOutlineArrowNarrowRight /></button> */}
                                            </div>
                                        </div> : null
                                ))}

                            </div>
                        </Col>
                        <Col className='product-categories-col'>
                            <div>
                                <h4 className="theme-color my-2"> Product <span className="text-black">Categories</span></h4>

                                <div className="product-categories-wrapper">
                                    {productCategories?.map((category) => (
                                        <div className="category">
                                            <div className='link'>
                                                <Link href={`/subcategory/[category]?url=${category?.url}`} as={`/subcategory/${category?.url}`} >
                                                    {capitalize(category?.name)}
                                                </Link>
                                            </div>
                                            {category?.subcategories?.map((sub_cat) => (
                                                <Link href={`/subcategory/[category]?url=${sub_cat.url}`} as={`/subcategory/${sub_cat.url}`} >{capitalize(sub_cat?.name)}</Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </Row >
                </div >
            </div >
        </>
    )
}

export default MegaMenu