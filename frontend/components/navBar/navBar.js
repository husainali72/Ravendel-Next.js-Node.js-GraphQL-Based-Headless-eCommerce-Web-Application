import { get } from "lodash";
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

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
// const SIX_HOURS_MS =1* 60 * 1000;
const NavBar = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const router = useRouter();
  const fetchCategories = async () => {
    try {
      const response = await queryWithoutToken(PARENT_CATEGORIES);
      const data = get(response, "data.parentCategories.data", []);
      setParentCategories(data);
      setItemToLocalStorage("parentCategories", data);
      const expirationTime = new Date().getTime() + SIX_HOURS_MS;
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
        fetchCategories();
      }
    };

    checkLocalStorage();

    // Check expiration time only once on page load
    const currentTime = Date.now();
    if (currentTime >= expirationTime) {
      removeItemFromLocalStorage("parentCategories");
      removeItemFromLocalStorage("parentCategoriesTimestamp");
      checkLocalStorage();
    }
  }, []);

  return (
    <>
      <nav>
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
