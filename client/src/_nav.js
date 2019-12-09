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
    }
  ]
};
