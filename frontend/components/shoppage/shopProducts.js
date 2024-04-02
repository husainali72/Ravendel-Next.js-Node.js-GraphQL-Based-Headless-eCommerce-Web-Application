/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import client from '../../apollo-client';
import { GET_CATEGORIES_QUERY } from '../../queries/home';
import { BiChevronLeft } from 'react-icons/bi';
import { FiChevronLeft } from 'react-icons/fi';
import { capitalize } from 'lodash';
const ShopProducts = ({ shopcategory, name, brandProduct, brands, category, blogTagsData, shopCategory }) => {
    const router = useRouter();
    const [allCategories, setAllCategories] = useState([]);
    const brandUrl = router?.query?.brand
    const getCategories = async () => {
        try {
            const { data: shopproductcategory } = await client.query({
                query: GET_CATEGORIES_QUERY
            });
            setAllCategories(shopproductcategory.productCategories.data);
        }
        catch (e) {
            console.log("ShopProduct Error===", e.networkError && e.networkError.result ? e.networkError.result.errors : '')
        }
    }
    useEffect(() => {
        getCategories()
    }, [])
    const [selectedCategory, setSelectedCategory] = useState()
    useEffect(() => {
        const currentCategory = allCategories?.find(current => current?.url === router?.query?.category)
        setSelectedCategory(currentCategory)
    }, [allCategories])

    const getCategoryHeadings = (category) => {
        var headings = [];
        var headingObjs = [];

        const getHeadings = (category) => {
            if (!category?.parentId) {
                let categoryObj = {};
                categoryObj.name = category?.name;
                categoryObj.url = category?.url;
                headingObjs.push(categoryObj);
                headings.push(category?.name);
                return;
            }
            let categoryObj = {};
            categoryObj.name = category?.name;
            categoryObj.url = category?.url;
            headings.push(category?.name);
            headingObjs.push(categoryObj);
            getHeadings(allCategories?.find(cat => cat?.id === category?.parentId));

        }
        getHeadings(category);
        headings.shift();
        headingObjs.shift();
        return headingObjs;
    }

    return (
        <div>
            <div className="primary-sidebar sticky-sidebar category-shop-cart">
                <div className="theiaStickySidebar category-box-filler">
                    <div className="widget-category">
                        <h4 className="category-section-title">{name}</h4>
                        <ul className="categories-shop">
                            {category ? <ul className="categories-shop">
                                {getCategoryHeadings(allCategories?.find(cat => cat.id === selectedCategory?.id)).reverse().map((headingName, index) =>
                                    <Link href={`/subcategory/[categorys]?url=${headingName?.url}`} as={`/subcategory/${headingName?.url}`} key={index}><li className='fw-semibold text-black cursor-pointer mb-1'>
                                        <FiChevronLeft className='mb-1 back-category' />{headingName?.name}</li></Link>)}

                                {!selectedCategory?.parentId ? <li className='fw-semibold mb-1 text-black current-parent cursor-none'>{capitalize(selectedCategory?.name)}</li> :
                                    <li className='mb-1 current-parent ps-3 text-black cursor-none fw-normal'>{capitalize(selectedCategory?.name)}</li>}
                                {allCategories.filter(cat => cat.parentId === selectedCategory?.id).map((category, i) => (
                                    <li className={selectedCategory?.parentId ? "category-type ps-4" : "category-type ps-2"} key={i}>
                                        <Link href={`/subcategory/[categorys]?url=${category.url}`} as={`/subcategory/${category.url}`}>
                                            <span value={category.url}>{category.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul> : null}
                            {shopCategory ? <ul className="categories-shop">
                                {shopCategory.filter(category => category?.parentId === null).map((shopCategory, i) => (
                                    <li className="category-type" key={i}>
                                        <Link href={`/subcategory/[categorys]?url=${shopCategory.url}`} as={`/subcategory/${shopCategory.url}`}>
                                            <span value={shopCategory.url}>{capitalize(shopCategory.name)}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul> : null}
                            {brands ? (
                                <ul className="categories-shop">
                                    {brandProduct && brandProduct?.length > 0 ? brandProduct.map((brand, i) => (
                                        <li className="category-type" key={i}>
                                            <Link href={`/brands/[brand]?url=${brand.url}`} as={`/brands/${brand.url}`}>
                                                <span className={(brand.url === brandUrl) && "fw-bold"} value={brand.url}>{capitalize(brand.name)}</span>
                                            </Link>
                                        </li>
                                    )) : null
                                    }</ul>) : null}

                            {blogTagsData && blogTagsData?.length > 0 ? (
                                <ul className="categories-shop">
                                    {blogTagsData.map((tag, i) => (
                                        <li className="category-type" key={i}>
                                            <Link href={`/blogtags/[tags]?url=${tag.url}`} as={`/blogtags/${tag.url}`}>
                                                <span>{tag.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}

                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ShopProducts;
