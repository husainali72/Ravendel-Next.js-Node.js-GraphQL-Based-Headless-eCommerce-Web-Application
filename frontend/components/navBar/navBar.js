import { get } from "lodash";
import PropTypes from "prop-types";
import CategoryLink from "../category/categoryLink";
import { useEffect, useState } from "react";
import { PARENT_CATEGORIES } from "../../queries/productquery";
import {
  getItemFromLocalStorage,
  isCurrentCategory,
  queryWithoutToken,
  removeItemFromLocalStorage,
  setItemToLocalStorage,
} from "../../utills/helpers";
import { useRouter } from "next/router";

const LOCAL_STORAGE_EXPIRATION_TIME = 6 * 60 * 60 * 1000;
const NavBar = ({openMenu, setIsOpenMobileMenu}) => {
  const [parentCategories, setParentCategories] = useState([]);
  const router = useRouter();
  const fetchCategories = async () => {
    try {
      const response = await queryWithoutToken(PARENT_CATEGORIES);
      const data = get(response, "data.parentCategories.data", []);
      setParentCategories(data);
      setItemToLocalStorage("parentCategories", data);

      const expirationTime = new Date().getTime() + LOCAL_STORAGE_EXPIRATION_TIME;

      setItemToLocalStorage("parentCategoriesTimestamp", expirationTime);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    const storedCategories = getItemFromLocalStorage("parentCategories");
    const expirationTime = parseInt(
      getItemFromLocalStorage("parentCategoriesTimestamp")
    );

    const checkLocalStorage = () => {
      if (
        storedCategories &&
        storedCategories?.length > 0 &&
        expirationTime &&
        Date.now() < expirationTime
      ) {
        setParentCategories(storedCategories);
      } else {

        removeItemFromLocalStorage("parentCategories");
        removeItemFromLocalStorage("parentCategoriesTimestamp");
        fetchCategories();
      }
    };

    checkLocalStorage();

  }, []);

  return (
    <>
      <nav className={openMenu ? 'active' : ''}>
        <i
          className="fas fa-times close-nav"
          id="closeNav"
          onClick={() => setIsOpenMobileMenu(false)}
        ></i>
        <ul className="nav list" id="list">
          {parentCategories &&
            parentCategories?.length > 0 &&
            parentCategories?.map((parentCategory, index) => (
              <li className="nav-item" key={index}>
                {isCurrentCategory(get(parentCategory, "url"), router) ? (
                  <span className="nav-link active-nav-link">
                    {get(parentCategory, "name")}
                  </span>
                ) : (
                  <CategoryLink url={get(parentCategory, "url")}>
                    <a className="nav-link">{get(parentCategory, "name")}</a>
                  </CategoryLink>
                )}
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;

NavBar.propTypes = {
  openMenu: PropTypes.bool,
  setIsOpenMobileMenu: PropTypes.func
};
