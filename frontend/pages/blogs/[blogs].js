import client from "../../apollo-client";
import { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import { useRouter } from 'next/router';
import { GET_BLOGS_QUERY, GET_BLOG_BY_ID_QUERY } from "../../queries/blogquery";
import { getImage } from "../../utills/helpers";
import { useSelector } from "react-redux";
import ShopProducts from "../../components/shoppage/shopProducts"
const SingleBlogPages = ({ singleBlog }) => {
    // console.log(singleBlog)
    const blogtags = useSelector(state => state.blogtags)


    const router = useRouter();
    const { blog_id } = router.query.blogs;
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <BreadCrumb title={`blog`} />
            <Container>
                <div className="row" style={{ padding: "50px 0" }}>
                    <div className="col-lg-9">
                        <h1>{singleBlog.title}</h1>
                        <hr></hr>
                        <img src={getImage(singleBlog.feature_image, 'original')} width={"100%"} />
                        <div>
                            <p>{singleBlog?.content?.replace(/(<([^>]+)>)/ig, '')}</p>
                        </div>
                        <div className="d-flex entry-bottom mt-50 mb-30 wow fadeIn   animated" >
                            <div className="tags w-50 w-sm-100">
                                <button type="button" className="btn btn-success hover-up  btn-rounded mx-1" style={{ backgroundColor: "#088178" }}>deer</button>
                                <button type="button" className="btn btn-success hover-up  btn-rounded mx-1" style={{ backgroundColor: "#088178" }}>nature</button>
                                <button type="button" className="btn btn-success hover-up  btn-rounded mx-1" style={{ backgroundColor: "#088178" }}>conserve</button>
                                {/* <a href="blog-category-big.html" rel="tag" className="hover-up btn btn-sm btn-rounded mr-10">deer</a>
                                <a href="blog-category-big.html" rel="tag" className="hover-up btn btn-sm btn-rounded mr-10">nature</a>
                                <a href="blog-category-big.html" rel="tag" className="hover-up btn btn-sm btn-rounded mr-10">conserve</a> */}
                            </div>
                            <div className="social-icons single-share">
                                <ul className="d-flex text-grey-5 d-inline-block mx-50">
                                    <strong className="mr-10">Share this:</strong>
                                    <a href="#" className="social-facebook mx-1"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="social-twitter mx-1"><i className="fab fa-twitter"></i></a>
                                    <a href="#" className="social-instagram mx-1"><i className="fab fa-instagram"></i></a>
                                    <a href="#" className="social-linkedin mx-1"><i className="fab fa-pinterest-p"></i></a>
                                </ul>
                            </div>
                        </div>

                    </div >
                    <div className="col-lg-3">
                        <ShopProducts name={"Tags"} blogTagsData={blogtags.tags} />
                    </div>
                </div >

            </Container >
        </div >


    )
}
export default SingleBlogPages;

export async function getStaticPaths() {
    var blogData = [];
    {/* ----------------------- GET ALL BLOGS DATA  -----------------------------*/ }
    try {
        const { data: blogdata } = await client.query({
            query: GET_BLOGS_QUERY
        });
        blogData = blogdata.blogs.data
    }
    catch (e) {
        console.log("Blog Error=======", e.networkError);
    }
    // console.log("blogData", blogData);
    const paths = blogData.map((curElem) => ({
        params: { blogs: curElem.id.toString() }

    }))
    return {
        paths,
        fallback: false,
    }
}
export async function getStaticProps({ params }) {
    // console.log("params", params)
    const id = params.blogs
    var singleBlog = {};
    {/* ----------------------- GET GETBLOG BY ID QUERY  -----------------------------*/ }
    try {
        const { data: singleBlogData } = await client.query({
            query: GET_BLOG_BY_ID_QUERY,
            variables: { id },
        })
        singleBlog = singleBlogData.blog.data
    }
    catch (e) {
        console.log("Bolg SinglePage ERROR==", e)
    }
    return {
        props: {
            singleBlog,
        },
        revalidate: 10
    }
}
