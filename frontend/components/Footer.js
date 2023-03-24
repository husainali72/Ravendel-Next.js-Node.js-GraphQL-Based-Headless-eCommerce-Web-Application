import Link from "next/link";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { query } from "../utills/helpers";
import { GET_HOMEPAGE_DATA_QUERY } from "../queries/home";
import { get } from "lodash";
export default function Footer() {
    const [Address, setAddress] = useState({
        address_line1: "",
        address_line2: "",
        city: "",
        phone_number: "",
        email: "",
        playStoreUrl: "",
        appStoreUrl: ""
    });

    useEffect(() => {
        query(GET_HOMEPAGE_DATA_QUERY).then(res => {
            const addressPath1 = "data.getSettings.store.store_address.address_line1";
            const addressPath2 = "data.getSettings.store.store_address.address_line2";
            const cityPath = "data.getSettings.store.store_address.city";
            const phonePath = "data.getSettings.appearance.theme.phone_number";
            const emailPath = "data.getSettings.appearance.theme.email";
            const playStorePath = "data.getSettings.appearance.theme.playstore";
            const appStorePath = "data.getSettings.appearance.theme.appstore";
            setAddress((previousAddress) => ({
                ...previousAddress,
                address_line1: get(res, addressPath1, "Central Park"),
                address_line2: get(res, addressPath2, ""),
                city: get(res, cityPath, "Paris"),
                email: get(res, emailPath, "ravendel@gmail.com"),
                phone_number: get(res, phonePath, "+91 9124192994"),
                appStoreUrl: get(res, appStorePath, "#"),
                playStoreUrl: get(res, playStorePath, "#"),
            }
            ))
        })
    }, [])

    const { address_line1, address_line2, city, email, phone_number, appStoreUrl, playStoreUrl } = Address;
    const session = useSession();
    const customerId = session?.data?.user?.accessToken?.customer?._id;
    return (
        <section className="product-cart-section">
            <Container>
                <footer className="text-center text-lg-start text-muted">
                    <section className="" >
                        <div className="container text-center text-md-start">
                            <hr className="hr_divider"></hr>
                            <div className="row mt-5">
                                <div className="col-lg-4 col-md-6 mb-4 mt-2">
                                    <div style={{ display: 'flex', flexDirection: 'center' }}>
                                        <Link href="/">
                                            <a className="app-logo" >Ravendel</a>
                                        </Link>
                                    </div>
                                    <div className="address">
                                        <h5 className="mt-20 mb-10 fw-600 text-grey-4 wow fadeIn animated animated animated">Contact</h5>
                                        <strong>Address : </strong>
                                        <span>{address_line1 && address_line1 + ", "}{address_line2 && address_line2 + ", "}{city}</span>
                                        <br />
                                        <strong>Phone : </strong>
                                        <Link href={"tel:" + phone_number}>
                                            <span className="contact-details" ><a>{phone_number}</a></span>
                                        </Link>
                                        <br />
                                        <strong>Email : </strong>
                                        <Link href={"mailto:" + email}>
                                            <span className="contact-details" ><a>{email}</a></span>
                                        </Link>
                                        <br />
                                        <strong>Hour: </strong>
                                        <span> Mon to Fri 9am to 6pm</span>
                                    </div>

                                    <div className="mt-4 follow">
                                        <h5>Follow us</h5>
                                        {/* <ui> */}
                                        <Link href="#"><a className="fab fa-facebook-f mx-2 icon-footer" aria-hidden="true"></a></Link>
                                        <Link href="#"><a className="fab fa-twitter mx-2 icon-footer" aria-hidden="true"></a></Link>
                                        <Link href="#"><a className="fab fa-instagram mx-2 icon-footer" aria-hidden="true"></a></Link>
                                        <Link href="#"><a className="fab fa-pinterest-p mx-2 icon-footer" aria-hidden="true"></a></Link>
                                        <Link href="#"><a className="fab fa-youtube mx-2 icon-footer" aria-hidden="true"></a></Link>
                                        {/* </ui> */}
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-xl-2 mx-auto mb-4 mt-2 ">
                                    <h5 className="foot-tittle mb-4">
                                        About
                                    </h5>
                                    <p className="link-hover">
                                        <Link href="/about">
                                            <a className="text-reset">About Us</a>
                                        </Link>
                                    </p>
                                    {session.status === "authenticated" ? (
                                        <p className="link-hover">
                                            <Link href="/abouts/deliveryInformation">
                                                <a className="text-reset">Delivery Information</a>
                                            </Link>

                                        </p>
                                    ) : null}

                                    <p className="link-hover">
                                        <Link href="/abouts/privacypolicy">
                                            <a className="text-reset">Privacy policy</a>
                                        </Link>
                                    </p>
                                    <p className="link-hover">
                                        <Link href="/abouts/terms&condition">
                                            <a className="text-reset">Terms & Conditions</a>
                                        </Link>

                                    </p>
                                    <p className="link-hover">
                                        <Link href="/contact">
                                            <a className="text-reset">Contact Us</a>
                                        </Link>
                                    </p>
                                    <p className="link-hover"><Link href="/abouts/supportcenter">
                                        <a className="text-reset">Support Center</a>
                                    </Link>

                                    </p>
                                </div>
                                <div className="col-lg-2 col-md-3  col-xl-2 mx-auto mb-4 mt-2">
                                    <h6 className="foot-tittle mb-4">
                                        My Account
                                    </h6>
                                    {session.status === "authenticated" ? (
                                        <>
                                            <p className="link-hover">
                                                <Link href="/account" >
                                                    <a className="text-reset">Log Out</a>
                                                </Link>
                                            </p>
                                            <p className="link-hover">
                                                <Link href="/shopcart">
                                                    <a className="text-reset">View Cart</a>
                                                </Link>
                                            </p>
                                            <p className="link-hover">
                                                <Link href={`/account/${customerId}`}>
                                                    <a className="text-reset">My WishList</a>
                                                </Link>
                                            </p>
                                            <p className="link-hover"><Link href="/account/trackmyorder">
                                                <a className="text-reset">Track My Order</a>
                                            </Link>
                                            </p>
                                            <p className="link-hover">
                                                <Link href="/abouts/help">
                                                    <a className="text-reset">Help</a>
                                                </Link>
                                            </p>
                                            <p className="link-hover">
                                                <Link href="/account/order">
                                                    <a className="text-reset">Order</a>
                                                </Link>
                                            </p>
                                        </>

                                    ) : (
                                        <>
                                            <p className="link-hover">
                                                <Link href="/account" >
                                                    <a className="text-reset">Sign In</a>
                                                </Link>
                                            </p>
                                            <p className="link-hover">
                                                <Link href="/shopcart">
                                                    <a className="text-reset">View Cart</a>
                                                </Link>
                                            </p>
                                            <p className="link-hover">
                                                <Link href="/abouts/help">
                                                    <a className="text-reset">Help</a>
                                                </Link>
                                            </p>
                                        </>
                                    )}


                                </div>
                                <div className="col-lg-4  col-xl-3 mx-auto mb-4 mt-2">
                                    <h6 className="text-uppercase foot-tittle mb-4">
                                        Install App
                                    </h6>
                                    <p className="download">From App Store or Google Play</p>
                                    <div style={{ display: "flex", }}>
                                        <Button variant="outline">
                                            <Link href={appStoreUrl}>
                                                <a className="download-btn" aria-hidden="true">
                                                    <img src="http://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/theme/app-store.jpg"></img>
                                                </a></Link></Button>{' '}
                                        <Button variant="outline" className="mx-2">
                                            <Link href={playStoreUrl}>
                                                <a className="download-btn" aria-hidden="true"><img src="http://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/theme/google-play.jpg"></img>
                                                </a></Link></Button>{' '}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                    <hr className="hr_divider"></hr>
                    <div className="copyright" style={{ display: "flex", justifyContent: "space-between", fontFamily: "Monospace" }}>
                        <p style={{ float: "left", fontSize: "14px" }}>
                            ©{new Date().getFullYear()} Copyright:
                            <span className="co-name" style={{ marginLeft: "5px" }}
                            >
                                Ravendel
                            </span>
                        </p>
                        <p style={{ alignItems: "right" }}>
                            Design By <a className="co-name"
                                href="https://www.hbwebsol.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#465b52" }}
                            >HBWebsol.com</a> All rights reserved
                        </p>
                    </div>
                </footer>
            </Container >
        </section >
    )
}