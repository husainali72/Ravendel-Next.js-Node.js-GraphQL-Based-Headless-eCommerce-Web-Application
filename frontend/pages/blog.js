import { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import client from "../apollo-client";
import Link from 'next/link';
import { getImage } from "../utills/helpers";
import BreadCrumb from "../components/breadcrumb/breadcrumb";
import { GET_HOMEPAGE_DATA_QUERY } from "../queries/home";
import { GET_BLOGS_QUERY, GET_BLOGTAGS_QUERY } from "../queries/blogquery";
import { Container, Card, Button } from 'react-bootstrap';
import ShopProducts from "../components/shoppage/shopProducts";
import { blogAction } from "../redux/actions/blogAction"
import { useDispatch } from "react-redux";
const Blog = (blogData, blogTagsData) => {
    const dispatch = useDispatch();
    const [blog, setBlog] = useState([])
    const [tags, setTags] = useState([])

    useEffect(() => {
        if (blogData && blogData.blogData?.length > 0) {
            setBlog(blogData.blogData)
            setTags(blogData.blogTagsData)
        }
        dispatch(blogAction(blogData.blogTagsData))
    }, [blogData])
    return (
        <>
            <PageTitle title={"All Blog"} />
            <BreadCrumb title={"Blogs"} />
            <Container>
                {blog && blog?.length > 0 ? (
                    <div className="blog-page">
                        <div className="blog-section">
                            <h1><strong>Our Blog</strong></h1>
                            {/* <div className=" d-flex flex-row justify-content-center"> */}
                            <div className="blog-container">
                                {blog.map((blog, i) => (
                                    // <div className="col-lg-6" key={i}>
                                    <div className="" key={i}>
                                        <Card>
                                            <div className="card-img"><Card.Img
                                                variant="top"
                                                src={getImage(blog.feature_image, 'original')}
                                                onError={(e) => e.type === 'error' ? e.target.src = "https://dummyimage.com/300" : null}
                                            /></div>

                                            <Card.Body>
                                                <div className="card-img-tags">
                                                    <span className="percantage-save">
                                                        {blog.meta.title ? (blog.meta.title) : <span>category</span>}
                                                    </span>
                                                </div>
                                                <Card.Title>{blog.title}</Card.Title>
                                                {/* <Card.Text>
                                        {blog.content}
                                    </Card.Text> */}
                                                <Link href={`/blogs/${blog.id}`}>
                                                    <a>learn more <i className="fas fa-long-arrow-alt-right"></i></a>
                                                </Link>

                                            </Card.Body>
                                        </Card>
                                    </div>

                                ))}
                            </div>
                        </div>
                        {/* <div className="blog-category">
                            <ShopProducts name={"Tags"} blogTagsData={tags} />
                        </div> */}
                    </div>
                ) : (<h1>no blog available</h1>)}
            </Container>
        </>
    )
}
export default Blog;

export async function getStaticProps() {
    var homepageData = [];
    var blogData = [];
    var blogTagsData = [];

    /* ===============================================Get HomepageData Settings ===============================================*/

    try {
        const { data: homepagedata } = await client.query({
            query: GET_HOMEPAGE_DATA_QUERY
        });
        homepageData = homepagedata
    }
    catch (e) {
        console.log("Homepage Error===", e);
    }
    console.log("homepage", homepageData)

    /* ===============================================Get Blog Data =====================================================================*/
    try {
        const { data: blogdata } = await client.query({
            query: GET_BLOGS_QUERY
        });
        blogData = blogdata.blogs.data
    }
    catch (e) {
        console.log("Blog Error=======", e.networkError);

    }
    console.log("blogData", blogData);

    /* ===============================================Get BlogTags Data =====================================================================*/

    try {
        const { data: blogtagsdata } = await client.query({
            query: GET_BLOGTAGS_QUERY
        });
        blogTagsData = blogtagsdata.blogtags.data
    }
    catch (e) {
        console.log("BlOG TAGS Error==", e)
    }

    return {
        props: {
            homepageData,
            blogData,
            blogTagsData,
        },
        revalidate: 10,
    };
}