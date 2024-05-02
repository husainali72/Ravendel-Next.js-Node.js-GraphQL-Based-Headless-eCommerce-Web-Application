/* eslint-disable no-unused-vars */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { OpenNav, CloseNav } from "../utills/app";
import ShopCartProducts from "./cardcomponent/ShopCartProduct";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { logoutDispatch } from "../redux/actions/userlogoutAction";
import { logoutAndClearData } from "../utills/helpers";
import { getSettings } from "../redux/actions/settingAction";
import { calculateUserCart } from "../redux/actions/cartAction";
import { Toaster } from "react-hot-toast";
import { get } from "lodash";
import PropTypes from "prop-types";
import ProductImage from "./imageComponent";
import AlertModal from "./alert/alertModal";
import { expiredTimeErrorMessage } from "./validationMessages";
const SessionCheckInterval = 60000;
const Header = ({ setOpenMenu }) => {
  const data = useSession();
  const cartItem = useSelector((state) => state.cart.cartItems);
  const addedCart = useSelector((state) => state.addedCart);
  const settings = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [timerId, setTimerId] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    checkSessionExpiration();
    const intervalId = setInterval(
      checkSessionExpiration,
      SessionCheckInterval
    );
    setTimerId(intervalId);
    return () => {
      clearInterval(timerId);
    };
  }, [data?.status]);

  const checkSessionExpiration = async () => {
    if (data && data?.status === "authenticated") {
      const expires = get(data, "data.user.accessToken.expiry");
      if (expires) {
        const expirationTime = new Date(expires).getTime();
        const currentTime = Date.now();
        setShowModal(currentTime > expirationTime);
      }
    }
  };
  const logOutUser = async () => {
    await logoutAndClearData(dispatch);
    window.location.pathname = "/";
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef?.current &&
      !dropdownRef?.current?.contains(event?.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getCartLength = async () => {
    if (addedCart) {
      dispatch(logoutDispatch());
    }
    if (data?.status === "authenticated") {
      let id = get(data, "data.user.accessToken.customer._id");
      if (id) {
        dispatch(calculateUserCart(id));
      }
    }
  };
  useEffect(() => {
    getCartLength();
    dispatch(getSettings());
  }, [data, addedCart]);
  const alertHandleConfirm = async () => {
    setShowModal(false);
    await logoutAndClearData(dispatch);
  };
  return (
    <header className="header-area header-style-5 mt-0">
      <div className="header-top">
        <Container className="align-items-center">
          <Toaster />
          {showModal && (
            <AlertModal
              confirmAction={alertHandleConfirm}
              icon="error"
              title="Oops..."
              text={expiredTimeErrorMessage}
              showConfirmButton={true}
              confirmButtonText="OK"
              confirmButtonColor="#dc3545"
              allowOutsideClick={false}
            />
          )}
          <div className="row header-smartphone">
            <div className="col-xl-3 col-lg-4 col-sm-6 col-xs-6 align-items-center">
              <div className="header-info">
                <div className="header-contact-info">
                  <p>
                    <i className="fi-rs-smartphone"></i>
                    <Link href="tel: +1234567890">
                      <a>(+01) - 2345 - 6789</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 col-sm-6 col-xs-6">
              <div className="text-center float-right">
                <div className="header-info align-items-center">
                  <div className="align-items-center user-info">
                    {data?.status === "authenticated" ? (
                      <>
                        <div className="logout-btn">
                          <p>
                            <i className="far fa-user"></i>
                            <Link href="/">
                              <a className="logout-link" onClick={logOutUser}>
                                {" "}
                                Log Out
                              </a>
                            </Link>
                          </p>
                          {!isDropdownOpen ? (
                            <span className="mx-1">
                              <i
                                className="fas fa-angle-down"
                                onClick={() => setDropdownOpen(!isDropdownOpen)}
                              ></i>
                            </span>
                          ) : (
                            <span className="mx-1">
                              <i
                                className="fas fa-angle-up"
                                onClick={() => setDropdownOpen(!isDropdownOpen)}
                              ></i>
                            </span>
                          )}
                          {isDropdownOpen ? (
                            <div className="logout-dropdown" ref={dropdownRef}>
                              <ui>
                                <li onClick={() => setDropdownOpen(false)}>
                                  <Link href="/">Account</Link>
                                </li>
                                <li onClick={() => setDropdownOpen(false)}>
                                  <Link href="/account/profile">Profile </Link>
                                </li>
                                <li onClick={() => setDropdownOpen(false)}>
                                  <Link href="/account/order">Your Order</Link>
                                </li>
                                <li onClick={() => setDropdownOpen(false)}>
                                  <Link href="/account/address">Address</Link>
                                </li>
                              </ui>
                            </div>
                          ) : null}
                        </div>
                      </>
                    ) : (
                      <p>
                        <i className="far fa-user"></i>
                        <Link href="/account">
                          <a className="login-link"> Log In / Sign Up</a>
                        </Link>
                      </p>
                    )}
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
            <div className="app-logo">
              <Link href="/">
                <ProductImage
                  src={get(settings, "setting.appearance.theme.logo")}
                  className="logo-image"
                  alt=""
                />
              </Link>
            </div>
            <div
              className="main-menu main-menu-grow main-menu-padding-1 main-menu-lh-1 main-menu-mrg-1 hm3-menu-padding d-lg-block hover-boder"
              id="navigation"
            >
              <nav>
                <ul className="nav list" id="list">
                  <li className="nav-item">
                    <Link href="/">
                      <a
                        id=""
                        className="nav-link"
                        aria-current="page"
                        aria-selected="true"
                      >
                        Home
                      </a>
                    </Link>
                  </li>
                  <li className="nav-header">
                    <Link href="/contact">
                      <a className="nav-link" aria-selected="false">
                        Contact
                      </a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <div className="dropdown cart-btn">
                <Link href="/shopcart">
                  <div className="add-to-cart-header">
                    <a className="cart-icon action-btn">
                      <i
                        className="fas fa-shopping-bag font-awesome-icon"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <span className="pro-count blue">{cartItem?.length}</span>
                  </div>
                </Link>
                <div className="dropdown-content cart-dropdown-wrap cart-dropdown-hm2">
                  <ShopCartProducts />
                </div>
              </div>
              <div className="navigation-icon">
                <i
                  className="fas fa-bars open-nav"
                  id="openNav"
                  onClick={() => OpenNav()}
                ></i>
                <i
                  className="fas fa-times close-nav"
                  id="closeNav"
                  onClick={() => CloseNav()}
                ></i>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <hr className="hr_divider mt-0"></hr>
    </header>
  );
};
Header.propTypes = {
  setOpenMenu: PropTypes.func.isRequired,
};
export default Header;
