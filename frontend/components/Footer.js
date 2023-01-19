import Link from "next/link";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useSession } from "next-auth/react"
export default function Footer() {
    const session = useSession();
    // console.log("session", session)
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
                                        <span>10 Suffolk st Soho, London, UK</span>
                                        <br />
                                        <strong>Phone : </strong>
                                        <Link href="tel:+1234567890">
                                            <span style={{ textDecoration: "none", fontFamily: "Poppins sans- serif" }}><a>(+01) - 2345 - 6789</a></span>
                                        </Link>
                                        <br />
                                        <strong>Email : </strong>
                                        <Link href="mailto:support@abc.com">
                                            <span style={{ textDecoration: "none", fontFamily: "Poppins sans- serif" }}><a>support@abc.com</a></span>
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
                                        <Link href="/abouts/contactus">
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
                                                <Link href="/account/mywishlist">
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
                                                <Link href="account/order">
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
                                            <Link href="#">
                                                <a className="download-btn" aria-hidden="true">
                                                    <img src="http://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/theme/app-store.jpg"></img>
                                                </a></Link></Button>{' '}
                                        <Button variant="outline" className="mx-2">
                                            <Link href="#">
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