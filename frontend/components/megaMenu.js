import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';
import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { getImage } from '../utills/helpers';

// import { newProducts, productCategories } from './dummyContent';

// import { newProducts, productCategories } from '../dummyContent';

const MegaMenu = ({ openMenu, categories, newProducts, setOpenMenu }) => {

    const [productCategories, setproductCategories] = useState([])


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


            <div className={`mega-menu-wrapper ${openMenu ? 'open' : ''} `} >
                <div className="container" onMouseLeave={() => setOpenMenu(false)}>
                    <Row>
                        <Col lg={4} className='new-products-col'>
                            <div>
                                <h4 className="theme-color my-2"> New <span className="text-black">Products</span></h4>
                                {newProducts?.map((product, i) => (
                                    i < 3 ?

                                        <div className='product'>
                                            <img src={getImage(product?.feature_image)} alt="" onError={(e) => e.target.src = ''} />
                                            <div className="details">
                                                <h4>{product?.name}</h4>
                                                <Link href={`/product/[singleproduct]?url=${product.url}`} as={`/product/${product.url}`}>
                                                    <div className="add-to-cart">

                                                        <button type="button"
                                                            className="btn btn-success "
                                                            style={{ backgroundColor: "#088178", width: '150px' }}

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
                                            <h4>{category?.name}</h4>
                                            {category?.subcategories?.map((sub_cat) => (
                                                <Link href={`/subcategory/[category]?url=${sub_cat.url}`} as={`/subcategory/${sub_cat.url}`}>{sub_cat?.name}</Link>
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