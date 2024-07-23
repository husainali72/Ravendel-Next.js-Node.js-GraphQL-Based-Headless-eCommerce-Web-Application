import Link from "next/link";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  iconSetter,
  logout,
  query,
  removeItemFromLocalStorage,
} from "../utills/helpers";
import { GET_HOMEPAGE_DATA_QUERY } from "../queries/home";
import { get } from "lodash";
import logoutDispatch from "../redux/actions/userlogoutAction";
import { useDispatch, useSelector } from "react-redux";
import ProductImage from "./imageComponent";

export default function Footer() {
  const [Address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    phoneNumber: "",
    email: "",
    playStoreUrl: "",
    appStoreUrl: "",
    socialMedia: [],
  });
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.setting);
  const LogOutUser = async () => {
    await logout();
    removeItemFromLocalStorage("cart");
    dispatch(logoutDispatch());
  };
  useEffect(() => {
    query(GET_HOMEPAGE_DATA_QUERY).then((res) => {
      const addressPath1 = "data.getSettings.store.store_address.addressLine1";
      const addressPath2 = "data.getSettings.store.store_address.addressLine2";
      const hour = "data.getSettings.store.store_address.hour";
      const cityPath = "data.getSettings.store.store_address.city";
      const phonePath = "data.getSettings.store.store_address.phone_number";
      const emailPath = "data.getSettings.store.store_address.email";
      const playStorePath = "data.getSettings.appearance.theme.playstore";
      const appStorePath = "data.getSettings.appearance.theme.appstore";
      const socialMediaPath =
        "data.getSettings.store.store_address.social_media";
      setAddress((previousAddress) => ({
        ...previousAddress,
        addressLine1: get(res, addressPath1, "Central Park"),
        addressLine2: get(res, addressPath2, ""),
        city: get(res, cityPath, "Paris"),
        email: get(res, emailPath, "ravendel@gmail.com"),
        phoneNumber: get(res, phonePath, "+91 9124192994"),
        appStoreUrl: get(res, appStorePath, "#") || "#",
        playStoreUrl: get(res, playStorePath, "#") || "#",
        hour: get(res, hour, ""),
        socialMedia: get(res, socialMediaPath, []),
      }));
    });
  }, []);

  const {
    addressLine1,
    addressLine2,
    city,
    email,
    phoneNumber,
    appStoreUrl,
    hour,
    playStoreUrl,
  } = Address;
  const session = useSession();
  const customerId = session?.data?.user?.accessToken?.customer?._id;
  return (
    <section className="product-cart-section footer">
      <Container>
        <footer className="text-center text-lg-start text-muted">
          <section className="">
            <div className="text-center text-md-start">
              <hr className="hr_divider"></hr>
              <div className="row mt-5">
                <div className="col-lg-4 col-md-6 mb-4 mt-2">
                  <div className="app-logo-container">
                  <Link href="/">
                    <a className="app-logo">
                      <ProductImage
                        src={get(settings, "setting.appearance.theme.logo")}
                        className="logo-image"
                        alt=""
                      />
                    </a>
                  </Link>
                  </div>
                  <div className="address">
                  
                    { (addressLine1 ||
                      addressLine2 ||
                      city ||
                      email ||
                      phoneNumber ||
                       hour)
                       && (
                        <h5 className="fw-600 text-grey-4 wow fadeIn animated animated animated">
                          Contact
                        </h5>
                      )}
                    {addressLine1 && (
                      <>
                        <strong>Address : </strong>
                        <span>
                          {addressLine1 || ""}
                          {addressLine1 && ", "}
                          {addressLine2 || ""}
                          {addressLine2 && ", "}
                          {city || ""}
                        </span>
                        <br />
                      </>
                    )}
                    {phoneNumber && (
                      <>
                        <strong>Phone : </strong>
                        <Link href={"tel:" + phoneNumber || ""}>
                          <span className="contact-details">
                            <a>{phoneNumber || ""}</a>
                          </span>
                        </Link>
                        <br />
                      </>
                    )}
                    {email && (
                      <>
                        <strong>Email : </strong>
                        <Link href={"mailto:" + email || ""}>
                          <span className="contact-details">
                            <a>{email || ""}</a>
                          </span>
                        </Link>
                        <br />
                      </>
                    )}
                    {get(Address, "hour", "") && (
                      <>
                        <strong>Hour: </strong>

                        {<span>{get(Address, "hour", "")}</span>}
                      </>
                    )}
                  </div>

                  {get(Address, "socialMedia", [])?.length > 0 && (
                    <div className="mt-4 follow">
                      <h5>Follow us</h5>
                      {get(Address, "socialMedia", [])?.map((media, i) => {
                        return (
                          <Link href={media.handle} key={i}>
                            <a
                              href={media.handle}
                              className={iconSetter(media.name)}
                              aria-hidden="true"
                              target="_blank"
                              rel="noopener noreferrer"
                            ></a>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="col-lg-2 col-md-3 col-xl-2 mx-auto mb-4 mt-2 ">
                  <h5 className="foot-tittle mb-4">About</h5>
                  <p className="link-hover">
                    <Link href="/about">
                      <a className="text-reset">About Us</a>
                    </Link>
                  </p>
                  {"authenticated" === session.status ? (
                    <p className="link-hover">
                      <Link href="/abouts/deliveryInformation">
                        <a className="text-reset">Delivery Information</a>
                      </Link>
                    </p>
                  ) : null}

                  <p className="link-hover">
                    <Link href="/privacy-policy">
                      <a className="text-reset">Privacy policy</a>
                    </Link>
                  </p>
                  <p className="link-hover">
                    <Link href="/terms-conditions">
                      <a className="text-reset">Terms & Conditions</a>
                    </Link>
                  </p>
                  <p className="link-hover">
                    <Link href="/returns-refunds">
                      <a className="text-reset">Returns & Refunds</a>
                    </Link>
                  </p>
                  <p className="link-hover">
                    <Link href="/contact">
                      <a className="text-reset">Contact Us</a>
                    </Link>
                  </p>
                  <p className="link-hover">
                    <Link href="/abouts/supportcenter">
                      <a className="text-reset">Support Center</a>
                    </Link>
                  </p>
                </div>
                <div className="col-lg-2 col-md-3  col-xl-2 mx-auto mb-4 mt-2">
                  <h6 className="foot-tittle mb-4">My Account</h6>
                  {"authenticated" === session.status ? (
                    <>
                      <p className="link-hover">
                        <Link href="/">
                          <a onClick={LogOutUser} className="text-reset">
                            Log Out
                          </a>
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
                      <p className="link-hover">
                        <Link href="/account/trackmyorder">
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
                        <Link href="/account">
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
                  <div className="install-app-footer">
                    <Button variant="outline">
                      <Link href={appStoreUrl || "#"}>
                        <a
                          className="download-btn"
                          aria-hidden="true"
                          target="_blank"
                        >
                          <img src="http://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/theme/app-store.jpg"></img>
                        </a>
                      </Link>
                    </Button>{" "}
                    <Button variant="outline" className="mx-2">
                      <Link href={playStoreUrl}>
                        <a
                          className="download-btn"
                          aria-hidden="true"
                          target="_blank"
                        >
                          <img src="http://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/theme/google-play.jpg"></img>
                        </a>
                      </Link>
                    </Button>{" "}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <hr className="hr_divider"></hr>
          <div className="copyright">
            <p>
              ©{new Date().getFullYear()} Copyright:
              <span className="co-name">Ravendel</span>
            </p>
            <p className="design-by">
              Design By{" "}
              <a
                className="co-name"
                href="https://www.hbwebsol.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                HBWebsol.com
              </a>{" "}
              All rights reserved
            </p>
          </div>
        </footer>
      </Container>
    </section>
  );
}
