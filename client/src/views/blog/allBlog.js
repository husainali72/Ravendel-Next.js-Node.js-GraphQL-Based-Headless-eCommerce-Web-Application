import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isEmpty, bucketBaseURL, client_app_route_url } from "../../utils/helper";
import ActionButton from "../components/actionbutton";
import { get } from 'lodash'
import TableComponent from "../components/table";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";
import { blogDeleteAction, blogsAction } from "../../store/action";
import { useNavigate } from "react-router-dom";


const AllBlogComponent = () => {

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [Allblogs, setAllblogs] = useState([])
  const [filtered, setfilterdData] = useState([])
  const navigate = useNavigate()
  const statusTabData = {
    name: 'status', array: ['All', 'Publish', 'Draft']
  }
  const columndata = [{ name: "image", title: "image", sortingactive: false },
  { name: "title", title: "title ", sortingactive: true },
  { name: "date", title: "date ", sortingactive: true },
  { name: "status", title: "status ", sortingactive: true },

  {
    name: "actions", title: "Actions", sortingactive: false,
    component: ActionButton,
    buttonOnClick: (type, id) => {
      if (type === 'edit') {
        navigate(`${client_app_route_url}edit-blog/${id}`)
      } else if (type === "delete") {
        dispatch(blogDeleteAction(id))
      }
    },
  },
  ]
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
      })
      setAllblogs(data)
      setfilterdData(data)
    } else {
      setAllblogs([])
      setfilterdData([])
    }
  }, [get(blogs, 'blogs')])
  const handleOnChangeSearch = (filtereData) => {

    setfilterdData(filtereData)
  }
  return (
    <>
      <TableComponent
        loading={blogs.loading}
        columns={columndata}
        rows={filtered}
        searchdata={Allblogs}
        handleOnChangeSearch={handleOnChangeSearch}
        addpage='add-blog'
        title="All Blogs"
        statusTabData={statusTabData}
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
