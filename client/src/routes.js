import React from "react";
import { AllUsers, AddUser, EditUser } from "./views/user";
import { AddBlog, AllBlog, EditBlog, Categories } from './views/blog';

//const Dashboard = React.lazy(() => import("./views/Dashboard"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: '/all-blogs', exact: true, name: 'All Blogs', component: AllBlog },
  { path: '/add-blog', exact: true, name: 'Add Blog', component: AddBlog },
  { path: '/edit-blog/:id', exact: true, name: 'Edit Blog', component: EditBlog },
  { path: '/all-users', exact: true, name: 'All Users', component: AllUsers },
  { path: '/add-user', exact: true, name: 'Add User', component: AddUser },
  { path: '/edit-user/:id', exact: true, name: 'Edit User', component: EditUser },
  { path: '/categories', exact: true, name: 'Categories', component: Categories },
];

export default routes;
