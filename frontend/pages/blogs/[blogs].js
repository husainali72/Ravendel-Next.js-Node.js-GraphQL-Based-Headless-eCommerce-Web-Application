/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import client from "../../apollo-client";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import { useRouter } from 'next/router';
import { GET_BLOGS_QUERY, GET_BLOG_BY_ID_QUERY } from "../../queries/blogquery";
import { getImage, imageOnError } from "../../utills/helpers";
import { useSelector } from "react-redux";
import ShopProducts from "../../components/shoppage/shopProducts"
import { GET_HOMEPAGE_DATA_QUERY } from "../../queries/home";
const SingleBlogPages = ({ singleBlog, homepageData }) => {
    const blogtags = useSelector(state => state.blogtags)
    const imageType = homepageData && homepageData?.getSettings?.imageStorage?.status;
    const router = useRouter();
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
                        <img src={getImage(singleBlog.feature_image, imageType)} width={"100%"}  onError={imageOnError}/>
                        <div>
                            <p>{singleBlog?.content?.replace(/(<([^>]+)>)/ig, '')}</p>
                        </div>
                        <div className="d-flex entry-bottom mt-50 mb-30 wow fadeIn   animated" >
                            <div className="tags w-50 w-sm-100">
                                <button type="button" className="btn btn-success hover-up  btn-rounded mx-1 primary-btn-color" >deer</button>
                                <button type="button" className="btn btn-success hover-up  btn-rounded mx-1 primary-btn-color" >nature</button>
                                <button type="button" className="btn btn-success hover-up  btn-rounded mx-1 primary-btn-color" >conserve</button>
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
    }
    const paths = blogData.map((curElem) => ({
        params: { blogs: curElem.id.toString() }

    }))
    return {
        paths,
        fallback: false,
    }
}
export async function getStaticProps({ params }) {
    const id = params.blogs
    var singleBlog = {};
    var homepageData = [];
    {/* ----------------------- GET GETBLOG BY ID QUERY  -----------------------------*/ }

    /* ===============================================Get HomepageData Settings ===============================================*/

    try {
        const { data: homepagedata } = await client.query({
            query: GET_HOMEPAGE_DATA_QUERY
        });
        homepageData = homepagedata
    }
    catch (e) {
    }
    try {
        const { data: singleBlogData } = await client.query({
            query: GET_BLOG_BY_ID_QUERY,
            variables: { id },
        })
        singleBlog = singleBlogData.blog.data
    }
    catch (e) {
    }
    return {
        props: {
            singleBlog,
            homepageData
        },
        revalidate: 10
    }
}
