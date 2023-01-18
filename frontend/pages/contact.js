import BreadCrumb from "../components/breadcrumb/breadcrumb";
import PageTitle from "../components/PageTitle";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react"
import Link from "next/link";
const Contact = () => {

    // useEffect(() => {
    //     let o = [
    //         {
    //             categoryId: [{ __typename: "productCategory", id: "622604d2f9bb6e8b4a610d66", name: "Bags" }],
    //             custom_field: [],
    //             date: "2022-03-07T13:15:50.294Z",
    //             description: null,
    //             feature_image: { original: "/assets/images/product/feature/original/1646996747342-category-thumb-8.jpg" },
    //             featured_product: true,
    //             gallery_image: [{ original: "/assets/images/product/gallery/original/1646996747529-category-thumb-8.jpg" }],
    //             meta: { title: "", description: "", keywords: "" },
    //             name: "Mens Porcelain Caps",
    //             pricing: { price: 260, sellprice: 225 },
    //             product_type: { virtual: false, downloadable: true },
    //             quantity: 1,
    //             shipping: { height: 33232, width: 32323, depth: 332, weight: 323, shipping_class: "5e707d8a3830d62560aed5d4" },
    //             short_description: "",
    //             sku: "FWM15VKT",
    //             status: "Publish",
    //             tax_class: null,
    //             updated: "2022-03-11T11:05:55.927Z",
    //             url: "mens-porcelain-shirt-7",
    //             __typename: "Product",
    //             _id: "62260586f9bb6e8b4a610d92"
    //             ,
    //         }, {
    //             categoryId: [{ __typename: "productCategory", id: "622604d2f9bb6e8b4a610d66", name: "Bags" }],
    //             custom_field: [],
    //             date: "2022-03-07T13:15:50.294Z",
    //             description: null,
    //             feature_image: { original: "/assets/images/product/feature/original/1646996747342-category-thumb-8.jpg" },
    //             featured_product: true,
    //             gallery_image: [{ original: "/assets/images/product/gallery/original/1646996747529-category-thumb-8.jpg" }],
    //             meta: { title: "", description: "", keywords: "" },
    //             name: "Mens Porcelain Caps",
    //             pricing: { price: 260, sellprice: 225 },
    //             product_type: { virtual: false, downloadable: true },
    //             quantity: 1,
    //             shipping: { height: 33232, width: 32323, depth: 332, weight: 323, shipping_class: "5e707d8a3830d62560aed5d4" },
    //             short_description: "",
    //             sku: "FWM15VKT",
    //             status: "Publish",
    //             tax_class: null,
    //             updated: "2022-03-11T11:05:55.927Z",
    //             url: "mens-porcelain-shirt-7",
    //             __typename: "Product",
    //             _id: "62260943f9bb6e8b4a610e3b"

    //         }
    //     ];
    //     let n = [
    //         {
    //             _id: "62260943f9bb6e8b4a610e3b",
    //             product_image: "/assets/images/product/feature/original/1646996719523-category-thumb-1.jpg",
    //             product_price: 333,
    //             product_title: "Colors Bags",
    //             qty: 4,
    //             total: 24309,
    //         },
    //         {
    //             _id: "62260586f9bb6e8b4a610d92",
    //             product_image: "/assets/images/product/feature/original/1646996747342-category-thumb-8.jpg",
    //             product_price: 225,
    //             product_title: "Mens Porcelain Caps",
    //             qty: 1,
    //             total: 225,

    //         },
    //     ];

    //     let array3 = [...o]

    //     let l = o.forEach((obj1, idx) => {
    //         n[idx] = obj1
    //     })
    //     console.log("l", l)
    // }, [])


    return (
        <div>
            <PageTitle title="Contact" />
            <BreadCrumb title="Contact" />
            <Container>

                <div className="contact-address-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.249514270321!2d-0.13289958407495217!3d51.50863821843344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d194a4a1a7%3A0x62897f4fa2fd4ad0!2s10%20Suffolk%20St%2C%20West%20End%2C%20London%20SW1Y%204HG%2C%20UK!5e0!3m2!1sen!2sin!4v1584427401480!5m2!1sen!2sin"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        title="Address"
                    ></iframe>
                </div>
                <div className="get-in-touch">
                    <div className="row">
                        <div className="contact-heading">
                            <h3>Get In Touch With Us</h3>
                        </div>
                        <div className="col-lg-6">
                            <div className="get-in-touch-form">
                                <form action="">
                                    <input type="text" placeholder="Name" />
                                    <input type="email" placeholder="Email-Address" />
                                    <input type="number" placeholder="Mobile No." />
                                    <input type="text" placeholder="Address" />
                                    <input type="text" placeholder="City" />
                                    <textarea rows="5" placeholder="Message..."></textarea>
                                    <input type="submit" className="btn" value={"Send"} />
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="get-in-touch-contact">
                                <div className="contact-info">
                                    <h4>Contact Us</h4>
                                    <p><span>Address:</span> 10 Suffolk st Soho, London, UK</p>
                                    <Link href="tel:+1234567890">
                                        <p><a>Phone : (+01) - 2345 - 6789</a>
                                        </p>
                                    </Link>
                                    <Link href="mailto:support@abc.com">
                                        <p><a>Email : support@abc.com</a></p>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container >
        </div >
    )
}
export default Contact;