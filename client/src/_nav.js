export default {
  items: [
    {
      name: "Users",
      url: "/all-user",
      icon: "icon-user",
      children: [
        {
          name: "All Users",
          url: "/all-users",
          icon: "icon-user"
        },
        {
          name: "Add User",
          url: "/add-user",
          icon: "icon-plus"
        }
      ]
    },
    {
      name: "Blogs",
      url: "/all-blogs",
      icon: "icon-pin",
      children: [
        {
          name: "All Blogs",
          url: "/all-blogs",
          icon: "icon-pin"
        },
        {
          name: "Add Blog",
          url: "/add-blog",
          icon: "icon-plus"
        },
        {
          name: "Categories",
          url: "/categories",
          icon: "icon-pin"
        }
      ]
    },
    {
      name: "Products",
      url: "",
      icon: "icon-pin",
      children: [
        {
          name: "All Products",
          url: "/all-products",
          icon: "icon-pin"
        },
        {
          name: "Add Product",
          url: "/add-product",
          icon: "icon-plus"
        },
        {
          name: "Categories",
          url: "/all-categories",
          icon: "icon-pin"
        },
        {
          name: "Add Category",
          url: "/add-category",
          icon: "icon-plus"
        }
      ]
    },
    {
      name: "Orders",
      url: "",
      icon: "icon-pin",
      children: [
        {
          name: "All Orders",
          url: "/all-orders",
          icon: "icon-pin"
        }
      ]
    }
  ]
};
