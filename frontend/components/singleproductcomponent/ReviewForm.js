import { Button, Form } from 'react-bootstrap';
import React, { useState, Fragment, useEffect } from 'react';
import { ADD_REVIEW } from "../../queries/productquery";
import client from '../../apollo-client';
import { useSelector } from "react-redux";
import { mutation } from "../../utills/helpers";
import { useSession } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
import notify from '../../utills/notifyToast';
const Star = ({ starId, marked }) => {
    return (
        <span
            star-id={starId}
            role="button"
            style={{ color: "#ff9933", cursor: "pointer", fontSize: 20, m: 0 }}
        >
            {marked ? "\u2605" : "\u2606"}
        </span>
    );
};

const ReviewForm = ({ productId }) => {
    const [CustomerId,setCustomerId] = useState("");
    var reviewObject = {
        title: "",
        email: "ravendel@test.com",
        review: "",
        rating: "",
        status: "pending",
        product_id: productId || "",
        customer_id: "",
    }
    const login = useSelector(state => state.login);
    const session = useSession()
    var token = "";
    const [review, setReview] = useState(reviewObject);
    const [writeReview, setWriteReview] = useState(false);
    const [selection, setSelection] = React.useState(0);

    useEffect(() => {
        setReview((prev)=>({...prev, customer_id:session?.data?.user?.accessToken?.customer?._id}))
        setReview({...review,customer_id:session?.data?.user?.accessToken?.customer?._id})
        if (session?.status === "authenticated") {
            token = session?.data?.user?.accessToken?.token;
            setCustomerId(session?.data?.user?.accessToken?.customer?._id);
        }
    }, [session])
    

    useEffect(() => {
        setReview({ ...review, product_id: productId });
        // setReview({ ...review, customer_id: CustomerId })
        
    }, [productId])

useEffect(() => {
    if (session?.status === "authenticated") {
        setReview((prev)=>({...prev, customer_id:session?.data?.user?.accessToken?.customer?._id}))
    }
}, [CustomerId])

    const hoverOver = event => {
        let starId = 0;
        if (event && event.target && event.target.getAttribute("star-id")) {
            starId = event.target.getAttribute("star-id");
        }
        setSelection(starId);
    };

    const addReview = (e) => {
        e.preventDefault();
        mutation(ADD_REVIEW, review, token).then((response) => {
            if(!response?.data?.addReview?.success){
                notify(response?.data?.addReview?.message,response?.data?.addReview?.success);               
            }
            else if(response?.data?.addReview?.success){
                notify(response?.data?.addReview?.message,response?.data?.addReview?.success);
                setReview(reviewObject);
                setWriteReview(!writeReview);
                
            }
        })
        
    }
    return (
        <>
            <div className="comment-form">
                {/* <h4 className="mb-15">Add a review</h4> */}
                <div>
                    <p style={{ float: 'right', padding: "0 0", cursor: 'pointer' }} value={writeReview} onClick={() => setWriteReview(!writeReview)}>write a review</p>
                    {writeReview ?

                        (<Fragment>
                            {/* <Toaster /> */}
                            <div className="row">
                                <div className="col-lg-8 col-md-12">
                                    <Form className="form-contact comment_form" action="#" id="commentForm" method="POST" onSubmit={addReview}>
                                        <h4 className="mb-15">Add a review</h4>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="title" id="title"
                                                        type="text"
                                                        placeholder="Title"
                                                        value={review.title}
                                                        onChange={(e) =>
                                                            setReview({ ...review, title: e.target.value })}
                                                    />
                                                    <label>Rating</label>
                                                    <div
                                                        onMouseOver={hoverOver}
                                                        onMouseOut={() => hoverOver(null)}
                                                        onClick={(event) => setReview({ ...review, rating: event.target.getAttribute("star-id") })}
                                                    >
                                                        {Array.from({ length: 5 }, (v, i) => (
                                                            <Star key={i} starId={i + 1} marked={selection ? selection > i : review.rating > i} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <textarea
                                                        className="form-control w-100"
                                                        name="comment"
                                                        id="comment"
                                                        cols="30"
                                                        rows="9"
                                                        value={review.review}
                                                        onChange={(e) => setReview({ ...review, review: e.target.value })}
                                                        placeholder="Write Review Comment">

                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Button type="submit" variant="secondary">Submit Review</Button>{' '}
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </Fragment>
                        ) : null}
                </div>

            </div>
        </>
    )
}
export default ReviewForm;