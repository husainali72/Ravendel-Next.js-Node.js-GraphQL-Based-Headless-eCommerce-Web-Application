import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import client from '../../apollo-client';
import { GET_CATEGORIES_QUERY } from '../../queries/home';
import {BiChevronLeft} from 'react-icons/bi';
import {FiChevronLeft} from 'react-icons/fi';
import { capitalize } from 'lodash';
const ShopProducts = ({ shopcategory, name, brandProduct, brands, category, blogTagsData }) => {
    const router = useRouter();
    const [allCategories,setAllCategories] = useState([]);
    // console.log("allcat",allCategories)
    const getCategories = async ()=>{
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
    },[])
    const [selectedCategory,setSelectedCategory] = useState()
    useEffect(() => {
        const currentCategory = allCategories?.find(current => current?.url === router?.query?.category)
        setSelectedCategory(currentCategory)
    },[allCategories])
    
    const getCategoryHeadings = (category) => { 
        var headings = [];
        
        const getHeadings = (category) =>{
        if (!category?.parentId){
            return;
        }
        headings.push(category?.name);
       getHeadings(allCategories?.find(cat => cat?.id === category?.parentId),headings);
        
    }
    getHeadings(category);
    return headings;
}
useEffect(() => {
    const headingsss = getCategoryHeadings(allCategories?.find(cat => cat.id === "63fdd74d2b3bf7ad4b0d6e40"));
}, [allCategories])


    return (
        <div>
            <div className="primary-sidebar sticky-sidebar category-shop-cart">
                <div className="theiaStickySidebar category-box-filler">
                    <div className="widget-category">
                        <h4 className="category-section-title">{name}</h4>
                        <ul className="categories-shop">
                            {category ? <ul className="categories-shop">
                                {/* {category.map((category, i) => (
                                    <li className="category-type" key={i}>
                                        <Link href={`/subcategory/[categorys]?url=${category.url}`} as={`/subcategory/${category.url}`}>
                                            <span value={category.url}>{category.name}</span>
                                        </Link>
                                    </li>
                                ))} */}
                                
                                 {getCategoryHeadings(allCategories?.find(cat => cat.id === selectedCategory?.id)).map((headingName)=><li onClick={()=> router.back()} className='fw-semibold text-black cursor-pointer mb-1'> 
                                    <FiChevronLeft className='mb-1 back-category' />{headingName}</li>) } 
                                {!selectedCategory?.parentId ? <li onClick={()=> router.back()} className='fw-semibold mb-1 text-black current-parent'>{capitalize(selectedCategory?.name)}</li> : 
                                <li className='mb-1 current-parent ps-3 theme-color cursor-none fw-normal'>{capitalize(selectedCategory?.name)}</li>}
                                {allCategories.filter(cat => cat.parentId === selectedCategory?.id).map((category, i) => (
                                    <li className= {selectedCategory?.parentId ?"category-type ps-4" : "category-type ps-2" } key={i}>
                                        <Link href={`/subcategory/[categorys]?url=${category.url}`} as={`/subcategory/${category.url}`}>
                                            <span value={category.url}>{category.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul> : null}
                            {brands ? (
                                <ul className="categories-shop">
                                    {brandProduct && brandProduct?.length > 0 ? brandProduct.map((brand, i) => (
                                        <li className="category-type" key={i}>
                                         <Link href={`/brands/[brand]?url=${brand.url}`} as={`/brands/${brand.url}`}>
                                         <span value={brand.url}>{capitalize(brand.name)}</span>
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
