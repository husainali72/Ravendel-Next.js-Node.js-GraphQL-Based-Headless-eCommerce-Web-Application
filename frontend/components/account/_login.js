/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useRouter } from "next/router"
// import { loginAction, customerAction } from "../../redux/actions/loginAction";
import { useDispatch, useSelector } from "react-redux";
import { signIn, useSession, getSession } from 'next-auth/react'
import { addToCart } from "../../redux/actions/cartAction";
import { GET_USER_CART, UPDATE_CART_PRODUCT } from "../../queries/cartquery";
import { query, mutation } from "../../utills/helpers"
import { userCartAction } from "../../redux/actions/userCartAction";
import Link from "next/link";

const loginObject = {
    email: "",
    password: "",
}

const LogIn = () => {
    const session = useSession()
    const router = useRouter();
    const dispatch = useDispatch();
    const localCartItem = useSelector(state => state.cart)
    // console.log("localCartItem", localCartItem)
    const [loginUser, setLoginUser] = useState(loginObject);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [cart_id, setCart_Id] = useState("")
    const [error, setError] = useState(false)

    const doLogin = async (e) => {
        e.preventDefault();
        // console.log("Login", loginUser);
        const res = await signIn('credentials', {
            email: loginUser.email,
            password: loginUser.password,
            redirect: false,
        })
        const session = await getSession()
        if (res?.error) {
            setError(res.error);
        } else {
            setError(null);
        }
        if (res?.ok) {
            /////////////////////////////////////////////////////////////
            const productsInCart=JSON.parse(localStorage.getItem("persistantState"))
            /////////////////////////////////////////////////////////////
            const id = session?.user.accessToken.customer._id
            const token = session?.user.accessToken.token
            query(GET_USER_CART, id, token).then(async (response) => {//brings cart from database
                var userCart = [];
                userCart = await response.data.cartbyUser.products
                const cart_id = response.data.cartbyUser.id
                setCart_Id(cart_id)
                dispatch(userCartAction(cart_id));
            
                if (userCart && userCart?.length > 0) {
                    if(productsInCart.cart && productsInCart.cart?.length>0){
                        var cart = productsInCart.cart.map(product => {
                            return {
                                feature_image: { original: product.feature_image.original },
                                name: product.name,
                                pricing: { price: 0, sellprice: product.pricing.sellprice },
                                quantity: product.quantity,
                                _id: product._id,
                            }
                        })
                    }else{
                        var cart = userCart.map(product => {
                            return {
                                feature_image: { original: product.productImage },
                                name: product.productTitle,
                                pricing: { price: 0, sellprice: product.productPrice },
                                quantity: product.qty,
                                _id: product.productId,
                            }
                        })
                    }
                    let list = cart.map((item) => {
                        let quantity = item.quantity
                        dispatch(addToCart(item, quantity, token, id))

                    })
                    const newCartList = await Promise.all(list)
                
                    // localStorage.setItem("userCart", JSON.stringify(userCart))
                } else {
                    if(productsInCart.cart?.length > 0){
                        var localCart = productsInCart.cart.map(product => {
                            return {
                                productId: product._id,
                                qty: product.quantity,
                                productTitle: product.name,
                                productImage: product.feature_image.original,
                                productPrice: product.pricing.sellprice,
                            }
                        });
                    }else{
                        var localCart = localCartItem.map(product => {
                            return {
                                productId: product._id,
                                qty: product.quantity,
                                productTitle: product.name,
                                productImage: product.feature_image.original,
                                productPrice: product.pricing.sellprice,
                            }
                        });
                    }
                        let variables = {
                            id: cart_id,
                            products: localCart,
                            total: 0,
                        }
                        mutation(UPDATE_CART_PRODUCT, variables, token).then(res => console.log("update res", res))
                        
                }
            })
        }
        if (res.url) await router.push("/");


    }
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