import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import client from '../apollo-client'
import { GET_CATEGORIES_QUERY } from '../queries/home'
import { GET_FILTEREDPRODUCTS } from '../queries/shopquery'
import OnSaleProductCard from './category/onSaleProductCard'

const SpecificProducts = ({section}) => {


    const [products,setProducts] = useState([]) 
    const [category,setCategory] = useState({}) 
    let config = { category: [section.category], brand: [], attribute: [], price: [] }
    const getProducts = async () =>{
        try { 
            const { data: fillterPrroducts } = await client.query({
                query: GET_FILTEREDPRODUCTS,
                variables: {  config },
            })
            let fillterProduct = fillterPrroducts?.filteredProducts
            if(fillterProduct.length>0){
                 fillterProduct.map(product =>{
                    setProducts((prev)=>[...prev,{brand: product.brand,
                        categoryId: product.categoryId,
                        feature_image: product.feature_image,
                        name:product.name,
                        pricing:product.pricing,
                        quantity: product.quantity,
                        status:product.status,
                        url:product.url,
                        __typename: product.__typename,
                        _id:product._id} ])
                } )
            }
        }
        catch (e) {
            console.log("fillerProduct ERRoR : ", e);
        }
    }

    const getAllCategories = async () =>{
        const shopProduct = ""
        try {
            const { data: shopproductcategory } = await client.query({
                query: GET_CATEGORIES_QUERY
            });
            shopProduct = shopproductcategory.productCategories;
            
            const cat = shopProduct.data.find((cat)=> cat.id === section.category)
            setCategory(cat)
        }
        catch (e) {
            console.log("ShopProduct Error===", e.networkError && e.networkError.result ? e.networkError.result.errors : '')
        }
    }
    useEffect(() => {
     getProducts()
     getAllCategories()
    }, [section.id])
    
   
  return (
       <div>
            {products?.length > 0 ?  <Container>
                <h4 className='theme-color' >Products For <span className='black-color' >{category?.name}</span></h4>
                    <OnSaleProductCard
                        onSaleProduct={products}
                        hidetitle
                    /> 
            </Container> : null }
        
       </div>
  )
}

export default SpecificProducts