import Link from 'next/link';
import { useEffect, useState } from 'react';
import { OpenNav } from '../utills/app';
import { CloseNav } from '../utills/app';
import ShopCartProducts from "./cardcomponent/ShopCartProduct"
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useSession, signOut } from "next-auth/react";
import { logoutDispatch } from "../redux/actions/userlogoutAction"
import { GET_USER_CART } from '../queries/cartquery';
import { getImage, query } from '../utills/helpers';
import { GET_HOMEPAGE_DATA_QUERY } from '../queries/home';
export default function Header({ }) {
    const data = useSession();
    const cartItem = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState(null);
    const [homeData, setHomeData] = useState({});
    const LogOutUser = async () => {
        const data = await signOut({ redirect: false, callbackUrl: "/" })
        localStorage.setItem("userCart", JSON.stringify([]));
        localStorage.setItem("cart", JSON.stringify([]));
        dispatch(logoutDispatch())
    }
    const getCartLength = async () => {
        let userCart
        if (data.status === "authenticated") {
            let id = data.data.user.accessToken.customer._id
            let token = data.data.user.accessToken.token
            query(GET_USER_CART, id, token).then(res => {
                userCart = res.data.cartbyUser;
                setCart(userCart);
            })
        }
    }
    const getHomepageData = () =>{
        query(GET_HOMEPAGE_DATA_QUERY).then(res => {
            let homepageData = res?.data?.getSettings;
            setHomeData(homepageData);
        })
    }
    useEffect(() => {
        getCartLength()
    }, [cartItem, data])
    useEffect(() => {
        getHomepageData()
    }, [])
    return (
        <header className="header-area header-style-5 mt-0">
            <div className="header-top">
                <Container className="align-items-center">
                    <div className="row header-smartphone">
                        <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-6 align-items-center">
                            <div className="header-info">
                                <div style={{ display: 'flex', float: "left", justifyContent: 'center', alignItems: "center" }}>
                                    <p>
                                        <i className="fi-rs-smartphone"></i>
                                        <Link href="tel: +1234567890">
                                            <a style={{ color: "white" }}>(+01) - 2345 - 6789</a>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8 col-sm-6 col-xs-6">
                            <div className="text-center float-right">
                                <div className="header-info align-items-center" >
                                    <div className="align-items-center" style={{ display: 'flex', float: "right", justifyContent: 'center', alignItems: "center", color: 'white' }}>
                                        {data.status === "authenticated" ? (<>
                                            <div style={{ display: "flex" }}>
                                                <p>
                                                    <i className="far fa-user"></i>
                                                    <Link href="/">
                                                        <a style={{ color: "white" }} onClick={LogOutUser}> Log Out</a>
                                                    </Link>
                                                </p>
                                                {!open ? (<span className="mx-1" >
                                                    <i className="fas fa-angle-down" onClick={() => setOpen(!open)}></i>
                                                </span>) : (
                                                    <span className="mx-1">
                                                        <i className="fas fa-angle-up" onClick={() => setOpen(!open)}></i>
                                                    </span>
                                                )}
                                                {open ? (
                                                    <div className="logout-dropdown" style={{
                                                        background: "white", height: "auto",
                                                        padding: "20px 30px"
                                                    }}>
                                                        <ui>
                                                            <li onClick={() => setOpen(false)}>
                                                                <Link href="/">Account</Link>
                                                            </li>
                                                            <li onClick={() => setOpen(false)}>
                                                                <Link href="/account/profile">Profile </Link>
                                                            </li>
                                                            <li onClick={() => setOpen(false)}>
                                                                <Link href="/account/order">Your Order</Link>
                                                            </li>
                                                            <li onClick={() => setOpen(false)}>
                                                                <Link href="/account/address">Address</Link>
                                                            </li>
                                                        </ui>
                                                    </div>
                                                ) : null}


                                            </div>
                                        </>) :
                                            (
                                                <p><i className="far fa-user"></i>
                                                    <Link href="/account">
                                                        <a style={{ color: "white" }}> Log In / Sign Up</a>
                                                    </Link>
                                                </p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="header-bottom sticky-white-bg">
                <Container>
                    <div className="header-container header-wrap">
                        <div className="app-logo" style={{ justifyContent: "flex-start" }}>
                            {/* <img className="app-logo-img mt-2" src="https://image.freepik.com/free-vector/spa-business-logo-vector-gold-lotus-icon-design_53876-118100.jpg"
                                alt="Ravendel" width="120" height="33.13" /> */}
                            <Link href="/">
                                <a className="app-logo" width="120" height="33.13">RAVENDEL</a>
                                {/* <img className="home-logo" src={getImage(homeData?.appearance?.theme?.logo, 'original',true)} alt="" /> */}
                            </Link>
                        </div>
                        <div className="main-menu main-menu-grow main-menu-padding-1 main-menu-lh-1 main-menu-mrg-1 hm3-menu-padding d-lg-block hover-boder" id='navigation' style={{ justifyContent: "center" }}>
                            <nav>
                                <ul className="nav list" id='list'>
                                    <li className="nav-item">
                                        <Link href="/">
                                            <a id="" className="nav-link" aria-current="page" aria-selected="true" >Home</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/shop">
                                            <a className="nav-link" aria-selected="false">Shop</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/blog">
                                            <a className="nav-link" aria-selected="false">Blog</a>
                                        </Link>
                                    </li>
                                    <li className="nav-header">
                                        <Link href="/contact">
                                            <a className="nav-link" aria-selected="false">Contact</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/about">
                                            <a className="nav-link" aria-selected="false">About Us</a>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div>
                            <div className="dropdown cart-btn" style={{ float: 'right', marginRight: 8, justifyContent: "right" }}>
                                <Link href="/shopcart">
                                    <div className="add-to-cart-header">
                                        <a className="cart-icon action-btn">
                                            <i className="fas fa-shopping-bag font-awesome-icon" style={{ color: "#088178" }} aria-hidden="true"></i>
                                        </a>
                                        {data.status === "authenticated" ? (
                                            <span className="pro-count blue">{cart?.products?.length}</span>
                                        ) : (
                                            <span className="pro-count blue">{cartItem?.length}</span>
                                        )}
                                    </div>
                                </Link>
                                <div className="dropdown-content cart-dropdown-wrap cart-dropdown-hm2">
                                    <ShopCartProducts />
                                </div>
                            </div>
                            <div className='navigation-icon'>
                                <i className="fas fa-bars open-nav" id='openNav' onClick={() => OpenNav()}></i>
                                <i className="fas fa-times close-nav" id='closeNav' onClick={() => CloseNav()}></i>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <hr className="hr_divider mt-0"></hr>
        </header >
    )
}