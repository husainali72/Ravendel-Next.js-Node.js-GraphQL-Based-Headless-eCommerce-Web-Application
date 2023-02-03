import React from 'react'
import client from '../../apollo-client'
import { GET_BRANDS_QUERY } from '../../queries/shopquery'
import Container from 'react-bootstrap/Container';

const Brand = ({brand}) => {
  return (
    <Container>
        <div className='brand-page'> 
            <h3 style={{ color: "#088178" }}> {brand?.name}<span style={{ color: "black" }}> here</span></h3>
        </div>
    </Container>
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
        console.log('brandsTest',brands)
     
    }
    catch (e) {
        console.log("===brand", e.networkError && e.networkError.result ? e.networkError.result.errors : '')
    }

    const paths = brands?.map((brand) => {
        return{
            params: { brand: brand.url.toString() }
        }
    })
    console.log('paths',pathss)
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const url = params.brand  
    var brands = []
    var brand = null

      /* ===============================================Get Brands Prdouct ===============================================*/

  try {
    const { data: brandproductData } = await client.query({
        query: GET_BRANDS_QUERY
    })
    brands = brandproductData.brands.data;
   
}
catch (e) {
    console.log("===brand", e.networkError && e.networkError.result ? e.networkError.result.errors : '')
}

brand = brands?.find(item => item.url === url)
return{
    props:{
        brand
    }
}

}