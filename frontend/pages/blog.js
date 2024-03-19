/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import client from '../apollo-client';
import Link from 'next/link';
import { getImage } from '../utills/helpers';
import BreadCrumb from '../components/breadcrumb/breadcrumb';
import { GET_HOMEPAGE_DATA_QUERY } from '../queries/home';
import { GET_BLOGS_QUERY, GET_BLOGTAGS_QUERY } from '../queries/blogquery';
import { Container, Card } from 'react-bootstrap';
import { blogAction } from '../redux/actions/blogAction';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
const Blog = ( blogData ) => {
    const imageType = blogData?.homepageData && blogData?.homepageData?.getSettings?.imageStorage?.status;
    const dispatch = useDispatch();
    const [ blog, setBlog ] = useState( [] );
    useEffect( () => {
        if ( blogData && 0 < blogData.blogData?.length ) {
            setBlog( blogData.blogData );
        }
        dispatch( blogAction( blogData.blogTagsData ) );
    }, [ blogData ] );
    return (
        <>
            <PageTitle title={'All Blog'} />
            <BreadCrumb title={'Blogs'} />
            <Container>
                {blog && 0 < blog?.length ? (
                    <div className="blog-page">
                        <div className="blog-section">
                            <h1><strong>Our Blog</strong></h1>
                            {/* <div className=" d-flex flex-row justify-content-center"> */}
                            <div className="blog-container">
                                {blog.map( ( blog, i ) => (
                                    // <div className="col-lg-6" key={i}>
                                    <div className="" key={i}>
                                        <Card>
                                            <div className="card-img"><Card.Img
                                                variant="top"
                                                src={getImage( blog.feature_image, imageType )}
                                                onError={( e ) => 'error' === e.type ? e.target.src = 'https://dummyimage.com/300' : null}
                                            /></div>

                                            <Card.Body>
                                                <div className="card-img-tags">
                                                    <span className="percantage-save">
                                                        {blog.meta.title ? ( blog.meta.title ) : <span>category</span>}
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

                                ) )}
                            </div>
                        </div>
                        {/* <div className="blog-category">
                            <ShopProducts name={"Tags"} blogTagsData={tags} />
                        </div> */}
                    </div>
                ) : (
                    <div className="d-flex  justify-content-center mt-5">
                        <p className="" >No blogs available</p>
                    </div>
                )}
            </Container>
        </>
    );
};
export default Blog;

export async function getStaticProps() {
    // var homepageData = [];
    // var blogData = [];
    // var blogTagsData = [];

    // /* ===============================================Get HomepageData Settings ===============================================*/

    // try {
    //     const { data: homepagedata } = await client.query( {
    //         query: GET_HOMEPAGE_DATA_QUERY
    //     } );
    //     homepageData = homepagedata;
    // } catch ( e ) {
    //     console.log( 'Homepage Error===', e );
    // }

    // /* ===============================================Get Blog Data =====================================================================*/
    // try {
    //     const { data: blogdata } = await client.query( {
    //         query: GET_BLOGS_QUERY
    //     } );
    //     blogData = get(blogdata,'blogs.data',[]);
    // } catch ( e ) {
    //     console.log( 'Blog Error=======', e.networkError );

    // }

    // /* ===============================================Get BlogTags Data =====================================================================*/

    // try {
    //     const { data: blogtagsdata } = await client.query( {
    //         query: GET_BLOGTAGS_QUERY
    //     } );
    //     blogTagsData = get(blogtagsdata,'blogtags.data',[]);
    // } catch ( e ) {
    //     console.log( 'BlOG TAGS Error==', e );
    // }

    return {
        props: {
           dataa:[]
        },
        revalidate: 10,
    };

}
