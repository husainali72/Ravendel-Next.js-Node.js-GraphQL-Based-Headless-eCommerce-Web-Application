import Meta from './Meta';
import Footer from './Footer';
import Header from './Header';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { GET_USER_CART } from '../queries/cartquery';
import client from '../apollo-client';
import { getSession } from 'next-auth/react';
import { useState } from 'react';

export default function Layout({ children}) {
  
    const [data,setData] = useState([])
    const cartData = async ()=>{
        
        const session = await getSession()
        // console.log("session", session)
        let id = session?.user?.accessToken?.customer._id

        try {
          const { data: CartsData } = await client.query({
              query: GET_USER_CART,
              variables: { id: id }
          })
          cartData = CartsData;
          return cartData;
      }
      catch (e) {
          console.log("error==", e)
      }

    }
    
    cartData().then(data=> setData(data?.cartbyUser.products))
    console.log('cartInLayout', data)
    

    return (
        <Provider store={store}>
            <Meta />
            <Header cartData={data} />
            <div className='main-wrapper'>
                <main>
                    {children}
                </main>
            </div>
            <Footer />
        </Provider>
    )
}