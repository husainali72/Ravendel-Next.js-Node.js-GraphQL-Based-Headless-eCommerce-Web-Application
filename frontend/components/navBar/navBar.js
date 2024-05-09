/* eslint-disable react/prop-types */
import { get } from "lodash";
import { useSelector } from "react-redux";
import CategoryLink from "../category/categoryLink";

const NavBar = ({setOpenMenu}) => {
  const productState = useSelector((state) => state.categories);
  return (
    <>
      <nav>
        <ul className="nav list" id="list">
          {get(productState, "categories", []).map((parentCategory, index) => (
            <li className="nav-item" key={index} onMouseMove={()=>setOpenMenu(true)}>
              <CategoryLink url={get(parentCategory, "url")}>
                <a className="nav-link">{get(parentCategory, "name")}</a>
              </CategoryLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
export default NavBar;
