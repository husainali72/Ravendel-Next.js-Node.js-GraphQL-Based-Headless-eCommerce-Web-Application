import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { isEmpty, bucketBaseURL, client_app_route_url, getBaseUrl } from "../../utils/helper";
import ActionButton from "../components/actionbutton";
import { get } from 'lodash'
import TableComponent from "../components/table";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/index";
import { blogDeleteAction, blogsAction } from "../../store/action";
import { useNavigate } from "react-router-dom";
import viewStyles from "../viewStyles";
const AllBlogComponent = () => {
  const classes = viewStyles()
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [Allblogs, setAllblogs] = useState([])
  const [filtered, setfilterdData] = useState([])
  const navigate = useNavigate()
  const statusTabData = {
    name: 'status',
    array: ['All', 'Publish', 'Draft']
  }
  const columndata = [
    {
      name: "image",
      type: "image",
      title: "image",
      sortingactive: false
    },
    {
      name: "title",
      type: "text",
      title: "title ",
      sortingactive: true
    },
    {
      name: "date",
      type: "date",
      title: "date ",
      sortingactive: true
    },
    {
      name: "status",
      title: "status ",
      sortingactive: true
    },

    {
      name: "actions",
      title: "Actions",
      sortingactive: false,
      component: ActionButton,
      buttonOnClick: (type, id) => {
        if (type === 'edit') {
          navigate(`${client_app_route_url}edit-blog/${id}`, { state: { editMode: true } })
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
          image: blog.feature_image,
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
      <Grid container spacing={0} className={classes.mainrow}>
        <Grid item xl={12} md={12} >
          <TableComponent
            loading={blogs.loading}
            columns={columndata}
            rows={filtered}
            searchdata={Allblogs}
            handleOnChangeSearch={handleOnChangeSearch}
            addpage='add-blog'
            title="All Blogs"
            searchbydate={true}
            statusTabData={statusTabData}
            showDeleteButton={true}
          />
        </Grid>
      </Grid >
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
