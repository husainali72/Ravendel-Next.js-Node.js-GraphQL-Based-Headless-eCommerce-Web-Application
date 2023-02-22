import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isEmpty, bucketBaseURL } from "../../utils/helper";

import { get } from 'lodash'
import TableComponent from "../components/table";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";
import { blogsAction } from "../../store/action";

const AllBlogComponent = () => {

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [Allblogs, setAllblogs] = useState([])
  const [tablehead, setTableHead] = useState([])
  useEffect(() => {
    if (isEmpty(blogs.blogs)) {
      dispatch(blogsAction());
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(get(blogs, 'blogs'))) {
      let data = []
      blogs.blogs.map((blog) => {

        let object = {
          id: blog.id,
          image: bucketBaseURL + blog.feature_image,
          title: blog.title,
          date: blog.date,
          status: blog.status
        }
        data.push(object)

        setAllblogs([...data])

      })
      const columndata = [{ name: "image", title: "image", sortingactive: false },
      { name: "title", title: "title ", sortingactive: true },
      { name: "date", title: "date ", sortingactive: true },
      { name: "status", title: "status ", sortingactive: true },

      { name: "actions", title: "Actions", sortingactive: false }]
      setTableHead(columndata)
    }
  }, [get(blogs, 'blogs')])

  return (
    <>
      <TableComponent
        loading={blogs.loading}
        columns={tablehead}
        rows={Allblogs}
        editpage='edit-blog'

        addpage='add-blog'
        title="All Blogs"

      />

    </>
  );
};

export default function AllBlog() {
  return (
    <ThemeProvider theme={theme}>
      <AllBlogComponent />
    </ThemeProvider>
  );
}
