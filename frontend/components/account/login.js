import { useEffect, useState } from "react";
import { useRouter } from "next/router"
// import { loginAction, customerAction } from "../../redux/actions/loginAction";
import { useDispatch, useSelector } from "react-redux";
import { signIn, useSession, getSession } from 'next-auth/react'
import { addToCart, createCart, updateCart } from "../../redux/actions/cartAction";
import { GET_USER_CART, UPDATE_CART_PRODUCT } from "../../queries/cartquery";
import { query, mutation } from "../../utills/helpers"
import { userCartAction } from "../../redux/actions/userCartAction";
import Link from "next/link";
import { loadReviewAction } from "../../redux/actions/productAction";

const loginObject = {
    email: "",
    password: "",
}

const LogIn = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const localCartItem = useSelector(state => state.cart)
    const productss = useSelector(state => state.products )
    const [loginUser, setLoginUser] = useState(loginObject);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [cart_id, setCart_Id] = useState("")
    const [error, setError] = useState(false)
    const [login, setlogin] = useState(false)
    
    const doLogin = async (e) => {
        e.preventDefault();
        setlogin(true);
        const res = await signIn('credentials', {
            email: loginUser.email,
            password: loginUser.password,
            redirect: false,
        })

        const session = await getSession()
        // console.log('sesionfromlogin',session)
        console.log('resssss==>' , res)
        if (res?.error) {
            setError(res.error);
        } else {
            setError(null);
        }


        if (res?.ok) {
            const productsInCart = JSON.parse(localStorage.getItem("cart"))
            const id = session?.user.accessToken.customer._id;

            const products =  productsInCart?.map(prod => {
                return{
                    product_id: prod._id,
                    qty: prod.quantity
                }
            } )
            // console.log('dispatchedd')
            dispatch(createCart(id, products));
            // localStorage.setItem("cart", JSON.stringify([]))

        }
        //     /////////////////////////////////////////////////////////////
        //     const productsInCart=JSON.parse(localStorage.getItem("persistantState"))
        //     /////////////////////////////////////////////////////////////
        //     const id = session?.user.accessToken.customer._id;
        //     const token = session?.user.accessToken.token;
        //     let cart_id

        //     let userCart = [];
        //     query(GET_USER_CART, id, token).then(async (response) => {//brings cart from database
        //         console.log('response', response)
        //         userCart = await response.data.cartbyUser.products
        //         cart_id = response.data.cartbyUser.id;
        //         setCart_Id(cart_id)
        //         dispatch(userCartAction(cart_id));

        //     }).catch(() => {
        //         console.log('catch code ran')

        //     }).finally(() => {
        //         console.log('finally code ran')

        //         let updatedUserCart = [];
        //         let updatedLocalCart = [];

        //         // if(!cart_id) {

        //             updatedUserCart = userCart ? userCart?.map((product) => ({
        //                 product_id: product.product_id,
        //                 qty: product.qty,
        //                 product_title: product.product_title
        //                 // feature_image: { original: product.product_image },
        //                 // name: product.product_title,
        //                 // pricing: { price: 0, sellprice: product.product_price },
        //             })) : [];
                    
        //             updatedLocalCart = productsInCart ? productsInCart?.cart?.map(product =>({
        //                 qty: product.quantity,
        //                 product_id: product._id,
        //                 product_title: product.product_title
        //                 // feature_image: { original: product.feature_image.original },
        //                 // name: product.name,
        //                 // pricing: product.pricing,
        //             })) : [];

        //         // }else{
        //         //     updatedUserCart = userCart?.map((product) => ({
        //         //         feature_image: { original: product.product_image },
        //         //         name: product.product_title,
        //         //         pricing: { price: 0, sellprice: product.product_price },
        //         //         quantity: product.qty,
        //         //         _id: product.product_id,
        //         //     }));
        
        //         //     updatedLocalCart = productsInCart?.cart?.map(product =>({
        //         //         feature_image: { original: product.feature_image.original },
        //         //         name: product.name,
        //         //         pricing: product.pricing,
        //         //         quantity: product.quantity,
        //         //         _id: product._id,
        //         //     }))
        //         // }
    
        //         const mergedCart = [...updatedUserCart, ...updatedLocalCart];
        //         const finalCart = [];
    
        //         mergedCart.map((val, i) => {
        //             let exist = mergedCart.find(n=>(n._id === val._id) && (n.quantity > val.quantity))
        //             if(!finalCart.find(n => n._id === val._id)) {
    
        //                 if (exist) {
        //                     finalCart.push(exist)
        //                 }else{
        //                     finalCart.push(val)
        //                 }
    
        //             }
        //         })
    
        //         console.log('finalCart', finalCart)
        //         console.log('cart_id', cart_id)
        //         if(!cart_id) {
        //             dispatch(createCart(id, finalCart));
        //         }else{
        //             dispatch(updateCart(cart_id, finalCart));
        //         }
        //     })
        // }
        

        if (res.ok) await router.push("/");


    }

    // useEffect(() => {
    //         console.log('useeffect ran')
    //         if(login) {
    //         console.log('useeffect ran islogin')
            
    //         let updatedUserCart = userCart?.map((product) => ({
    //             feature_image: { original: product.product_image },
    //             name: product.product_title,
    //             pricing: { price: 0, sellprice: product.product_price },
    //             quantity: product.qty,
    //             _id: product.product_id,
    //         }));

    //         let updatedLocalCart = productsInCart?.cart?.map(product =>({
    //             feature_image: { original: product.feature_image.original },
    //             name: product.name,
    //             pricing: product.pricing,
    //             quantity: product.quantity,
    //             _id: product._id,
    //         }))

    //         const mergedCart = [...updatedUserCart, ...updatedLocalCart];
    //         const finalCart = [];

    //         mergedCart.map((val, i) => {
    //             let exist = mergedCart.find(n=>(n._id === val._id) && (n.quantity > val.quantity))
    //             if(!finalCart.find(n => n._id === val._id)) {

    //                 if (exist) {
    //                     finalCart.push(exist)
    //                 }else{
    //                     finalCart.push(val)
    //                 }

    //             }
    //         })

    //         if(!cart_id) {
    //             dispatch(createCart(id, finalCart));
    //         }else{
    //             dispatch(updateCart(cart_id, finalCart));
    //         }
    //     }
    // }, [cart_id])


    return (
        <div className="login-box ">
            <h4>Login</h4>
            <form onSubmit={doLogin}>
                <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Your Email"
                    name={loginUser.email}
                    onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
                />
                <input
                    type="password"
                    style={{ marginTop: 8 }}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name={loginUser.password}
                    onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}
                />
                <div className="form-check" style={{ marginTop: 12 }}>
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                    <label className="form-check-label">
                        Remember me
                    </label>
                    <Link href="/account/forgetpassword">
                        <span style={{ float: 'right' }}>forget password ?</span>
                    </Link>
                </div>
                <button type="submit" className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178" }}>Login</button>
                {loginSuccess ? (<h4>login success full</h4>) : null}
                {error ? <p style={{ color: "red" }}>{error}</p> : null}
            </form>
        </div>
    )
}
export default LogIn;