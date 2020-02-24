import Dashboard from "../views/dashboard";
import { AllUsers, AddUser, EditUser } from "../views/users";
import { AddBlog, AllBlog, EditBlog } from "../views/blog";
import { AddProduct, AllProduct, EditProduct, AllCategory, AddCategory } from "../views/product";


const Routes = [
  { path: "/dashboard", exact: true, component: Dashboard, name: "Home" },
  { path: "/user", exact: true, component: AllUsers, name: "Users" },
  { path: "/all-users", exact: true, component: AllUsers, name: "All Users" },
  { path: "/add-user", exact: true, component: AddUser, name: "Add User" },
  {
    path: "/edit-user/:id",
    exact: true,
    component: EditUser,
    name: "Edit User"
  },
  { path: "/all-blogs", exact: true, name: "All Blogs", component: AllBlog },
  { path: "/add-blog", exact: true, name: "Add Blog", component: AddBlog },
  {
    path: "/edit-blog/:id",
    exact: true,
    name: "Edit Blog",
    component: EditBlog
  },
  { path: "/products", exact: true, component: Dashboard, name: "Products" },
  { path: "/other", exact: true, component: Dashboard, name: "Other" },
  { path: "/all-categories", exact: true, name: "Categories", component: AllCategory },
  { path: "/add-category", exact: true, name: "Add Category", component: AddCategory },
  { path: "/all-products", exact: true, name: "Products", component: AllProduct },
  { path: "/add-product", exact: true, name: "Add Product", component: AddProduct },
  { path: "/edit-product/:id", exact: true, name: "Edit Product", component: EditProduct }
];

export default Routes;
