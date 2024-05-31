/* eslint-disable no-unused-vars */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SlHandbag } from "react-icons/sl";
import ShopCartProducts from "./cardcomponent/ShopCartProduct";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { logoutDispatch } from "../redux/actions/userlogoutAction";
import {
  getItemFromLocalStorage,
  logoutAndClearData,
  query,
} from "../utills/helpers";
import { getSettings } from "../redux/actions/settingAction";
import { calculateUserCart } from "../redux/actions/cartAction";
import { get } from "lodash";
import PropTypes from "prop-types";
import ProductImage from "./imageComponent";
import NavBar from "./navBar/navBar";
import Search from "./globalSearch/globalSearch";
import { useRouter } from "next/router";
import { expiredTimeErrorMessage } from "./validationMessages";
import AlertModal from "./alert/alertModal";
import { GET_USER_CART_COUNT } from "../queries/cartquery";
const SessionCheckInterval = 60000;
const Header = ({ setOpenMenu }) => {
  const data = useSession();
  const cart = useSelector((state) => state.cart.cartItems);
  const addedCart = useSelector((state) => state.addedCart);
  const settings = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [timerId, setTimerId] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [cartItem, setCartItem] = useState(0)
  const isLogin = data?.status === "authenticated"
  const router=useRouter()
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
    await logoutAndClearData(dispatch, router);
    window.location.pathname = "/login";
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
        query(GET_USER_CART_COUNT, { userId: id })
          .then((response) => {
            let count = get(response, "data.getCartDetails.data.totalQuantity");
            setCartItem(count);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      let item = getItemFromLocalStorage("cart");
      setCartItem(item?.length || 0);
    }
  };
  useEffect(() => {
    dispatch(getSettings());
    getCartLength();
  }, [data?.status, cart]);
  const alertHandleConfirm = async () => {
    setShowModal(false);
    await logoutAndClearData(dispatch, router);
  };
  return (
    <header className="header-area header-style-5 mt-0">
      <div className="header-bottom sticky-white-bg">
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
        <Container>
          <div className="header-container header-wrap">
            <div className="app-logo">
              <Link href="/">
                <a>
                  <ProductImage
                    src={get(settings, "setting.appearance.theme.logo")}
                    className="logo-image"
                    alt="logo"
                  />
                </a>
              </Link>
            </div>
            <div
              className="main-menu main-menu-grow main-menu-padding-1 main-menu-lh-1 main-menu-mrg-1 hm3-menu-padding hover-boder"
              id="navigation"
            >
              {/* <nav>
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
              </nav>      */}
              <NavBar openMenu={isOpenMobileMenu} setIsOpenMobileMenu={setIsOpenMobileMenu}/>
              <div className="nav-actions">
                <Search />
                <div className="action-btn-wrapper">
                    <div className="dropdown cart-btn">
                      <Link href="/shopcart">
                        <div className="add-to-cart-header">
                          <a className="cart-icon action-btn">
                            <SlHandbag />
                          </a>
                          <span className="pro-count blue">{cartItem}</span>
                        </div>
                      </Link>
                      <div className="dropdown-content cart-dropdown-wrap cart-dropdown-hm2">
                        <ShopCartProducts />
                      </div>
                      
                    </div>
                    <div className="profile-btn">
                      <a className="action-btn profile">
                        <HiOutlineUserCircle/>
                      </a>
                      <div className="dropdown-content">
                        {isLogin ? (
                          <>
                            <Link href='/account'>My Account</Link>
                            <a onClick={logOutUser}>Logout</a>
                          </>
                          ):(
                            <Link href='/login'>Login/Signup</Link>
                          )
                        }
                      </div>
                    </div>
                    <div className="navigation-icon">
                      <i
                        className="fas fa-bars open-nav"
                        id="openNav"
                        onClick={() => setIsOpenMobileMenu(true)}
                      ></i>
                    </div>
                  </div>
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
