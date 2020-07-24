import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Box,
  Container,
  Grid,
  Hidden,
  Divider,
  Icon,
} from "@material-ui/core";
import Facebook from "../../assets/images/facebook.png";
import Linkedin from "../../assets/images/linkedin.png";
import Twitter from "../../assets/images/twitter.png";
import PageTitle from "../components/pageTitle";
import BlogSidebar from "./blogSidebar";
import { blogAction } from "../../store/action/blogAction";
import Loading from "../components/loading";
import PlaceHolder from "../../assets/images/placeholder.png";

const SingleBlog = (props) => {
  const [singlePost, setSinglePost] = useState({});

  useEffect(() => {
    props.blogAction(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    setSinglePost(props.blogs.blog);
  }, [props.blogs.blog]);

  return (
    <Fragment>
      {props.blogs.loading && <Loading />}
      {singlePost ? (
        <Fragment>
          <PageTitle title={singlePost.title} />
          <Container>
            <Grid
              container
              spacing={4}
              className="margin-top-3 margin-bottom-3"
            >
              <Grid item md={9} sm={12} xs={12}>
                <Box display="flex" className="blog-featured-wrapper">
                  <img
                    src={
                      singlePost.feature_image
                        ? singlePost.feature_image.medium
                        : PlaceHolder
                    }
                    alt="Blog-Featured"
                    className="blog-featured"
                  />
                </Box>
                <Box component="div" className="single-blog-innner-content">
                  <Typography
                    variant="h2"
                    className="margin-top-2 margin-bottom-2 text-capitalize"
                  >
                    {singlePost.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: singlePost.content,
                      }}
                    ></span>
                  </Typography>
                </Box>

                <Divider className="margin-top-2 margin-bottom-3" />
                <Typography variant="h3">
                  <Icon style={{ fontSize: 20 }}>share</Icon> Share this blog
                </Typography>

                <Box
                  display="flex"
                  justifyContent="flex-start"
                  className="share-blog"
                >
                  <Box>
                    <a
                      href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com"
                      target="_blank"
                    >
                      <img src={Facebook} alt="facebook" />
                    </a>
                  </Box>
                  <Box>
                    <a
                      href="https://twitter.com/share?url=https://simplesharebuttons.com&amp;text=Blog%20Title%20&amp;hashtags=blogs"
                      target="_blank"
                    >
                      <img src={Twitter} alt="Twitter" />
                    </a>
                  </Box>
                  <Box>
                    <a
                      href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://simplesharebuttons.com"
                      target="_blank"
                    >
                      <img src={Linkedin} alt="Linkedin" />
                    </a>
                  </Box>
                </Box>
              </Grid>
              <Hidden lgUp>
                <Divider className="margin-top-2 margin-bottom-3" />
              </Hidden>
              <Grid item md={3} sm={12} xs={12}>
                <BlogSidebar />
              </Grid>
            </Grid>
          </Container>
        </Fragment>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  blogs: state.blogs,
});

const mapDispatchToProps = {
  blogAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlog);

// import React, { Fragment, useEffect, useState } from "react";
// import { connect } from "react-redux";
// import {
//   Typography,
//   Box,
//   Container,
//   Grid,
//   Hidden,
//   Divider,
//   Icon
// } from "@material-ui/core";
// import Facebook from "../../assets/images/facebook.png";
// import Linkedin from "../../assets/images/linkedin.png";
// import Twitter from "../../assets/images/twitter.png";
// import Pinterest from "../../assets/images/pinterest.png";
// import PageTitle from "../components/pageTitle";
// import BlogSidebar from "./blogSidebar";
// import { blogsAction } from "../../store/action/blogAction";
// import Loading from "../components/loading";
// import { isEmpty } from "../../utils/helper";
// import PlaceHolder from "../../assets/images/placeholder.png";

// const SingleBlog = props => {
//   const [singlePost, setSinglePost] = useState({});

//   useEffect(() => {
//     if (isEmpty(props.blogs.blogs)) {
//       props.blogsAction();
//     }
//   }, []);

//   useEffect(() => {
//     props.blogs.blogs.map(blog => {
//       if (blog.id === props.match.params.id) {
//         setSinglePost({ ...blog });
//       }
//     });
//   }, [props.match.params.id, props.blogs.blogs]);

//   return (
//     <Fragment>
//       {props.blogs.loading && <Loading />}
//       {singlePost ? (
//         <Fragment>
//           <PageTitle title={singlePost.title} />
//           <Container>
//             <Grid
//               container
//               spacing={4}
//               className="margin-top-3 margin-bottom-3"
//             >
//               <Grid item md={9} sm={12} xs={12}>
//                 <Box display="flex" className="blog-featured-wrapper">
//                   <img
//                     src={
//                       singlePost.feature_image
//                         ? singlePost.feature_image.medium
//                         : PlaceHolder
//                     }
//                     alt="Blog-Featured"
//                     className="blog-featured"
//                   />
//                 </Box>

//                 <Typography
//                   variant="h2"
//                   className="margin-top-2 margin-bottom-2 text-capitalize"
//                 >
//                   {singlePost.title}
//                 </Typography>
//                 <Typography variant="subtitle1">
//                   <span
//                     dangerouslySetInnerHTML={{
//                       __html: singlePost.content
//                     }}
//                   ></span>
//                 </Typography>
//                 <Divider className="margin-top-2 margin-bottom-3" />
//                 <Typography variant="h3">
//                   <Icon style={{ fontSize: 20 }}>share</Icon> Share this blog
//                 </Typography>

//                 <Box
//                   display="flex"
//                   justifyContent="flex-start"
//                   className="share-blog"
//                 >
//                   <Box>
//                     <a
//                       href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com"
//                       target="_blank"
//                     >
//                       <img src={Facebook} alt="facebook" />
//                     </a>
//                   </Box>
//                   <Box>
//                     <a
//                       href="https://twitter.com/share?url=https://simplesharebuttons.com&amp;text=Blog%20Title%20&amp;hashtags=blogs"
//                       target="_blank"
//                     >
//                       <img src={Twitter} alt="Twitter" />
//                     </a>
//                   </Box>
//                   <Box>
//                     <a
//                       href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://simplesharebuttons.com"
//                       target="_blank"
//                     >
//                       <img src={Linkedin} alt="Linkedin" />
//                     </a>
//                   </Box>
//                 </Box>
//               </Grid>
//               <Hidden lgUp>
//                 <Divider className="margin-top-2 margin-bottom-3" />
//               </Hidden>
//               <Grid item md={3} sm={12} xs={12}>
//                 <BlogSidebar />
//               </Grid>
//             </Grid>
//           </Container>
//         </Fragment>
//       ) : (
//         <Loading />
//       )}
//     </Fragment>
//   );
// };

// const mapStateToProps = state => ({
//   blogs: state.blogs
// });

// const mapDispatchToProps = {
//   blogsAction
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SingleBlog);
