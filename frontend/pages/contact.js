import BreadCrumb from "../components/breadcrumb/breadcrumb";
import PageTitle from "../components/PageTitle";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react"
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import { Controller, useForm } from "react-hook-form";
import notify from "../utills/notifyToast";
import PhoneInput from "react-phone-input-2";
import { isValidPhoneNumber } from "react-phone-number-input";
var defaultObj = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: '',
    message: "",
};
const Contact = () => {
    const [contact, setcontact] = useState(defaultObj);
    const handleChange = (e) => {
        setcontact({ ...contact, [e.target.name]: e.target.value });
    };
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
        control,
    } = useForm({ mode: "submit", });

    const onSubmit = () => {
        setcontact(defaultObj)
        notify("Sent succesfully", true)
    }
    return (
        <div>
            <PageTitle title="Contact" />
            <BreadCrumb title="Contact" />
            <Container>
                <Toaster />
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        name='name'
                                        {...register('name', {

                                            required: {
                                                value: (contact.name ? false : true),
                                                message: "Name is Required",
                                            },
                                            minLength: {
                                                value: 4,
                                                message: "Name Min length is 4",
                                            },
                                        })}
                                        onChange={handleChange}
                                        value={contact.name} />
                                    <p>
                                        <small style={{ color: 'red' }}>
                                            {errors.name?.type === "required" ? errors.name?.message : undefined}
                                            {errors.name?.type === "minLength" ? errors.name?.message : undefined}
                                        </small>
                                    </p>
                                    <input
                                        type="email"
                                        placeholder="Email-Address"
                                        name='email'
                                        {...register("email", {
                                            required: {
                                                value: (contact.email ? false : true),
                                                message: "Email is Required",
                                            },
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: "Invalid Email",
                                            },
                                        })}
                                        onChange={handleChange}
                                        value={contact.email} />
                                    <p>
                                        <small style={{ color: 'red' }}>
                                            {errors.email?.type === "required" ? errors.email?.message : undefined}
                                            {errors.email?.type === "minLength" ? errors.email?.message : undefined}
                                            {errors.email?.type === "maxLength" ? errors.email?.message : undefined}
                                            {errors.email?.type === "pattern" ? errors.email?.message : undefined}
                                        </small>
                                    </p>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        rules={{
                                            required: {
                                                value: (contact.phone ? false : true),
                                                message: "Phone number is Required",
                                            },
                                            validate: () => {
                                                return isValidPhoneNumber(`+${contact.phone}`)
                                            }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <PhoneInput
                                                inputClass={'custom-input'}
                                                specialLabel=""
                                                enableSearch='true'
                                                value={contact.phone}
                                                country={'in'}
                                                onChange={(value) => setcontact({ ...contact, phone: value })}
                                            />
                                        )}
                                    />
                                    {errors["phone"] && (
                                        <p>
                                            <small style={{ color: 'red' }}>
                                                {errors.phone?.type === "required" ? errors.phone?.message : undefined}
                                                {errors.phone?.type === "validate" ? "Phone number is invalid" : undefined}

                                            </small>
                                        </p>
                                    )}
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        name='address'
                                        {...register('address', {

                                            required: {
                                                value: (contact.address ? false : true),
                                                message: "Address is Required",
                                            },
                                        })}
                                        onChange={handleChange}
                                        style={{ marginTop: '10px' }}
                                        value={contact.address} />
                                    <p>
                                        <small style={{ color: 'red' }}>
                                            {errors.address?.type === "required" ? errors.address?.message : undefined}
                                        </small>
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        name='city'
                                        {...register('city', {
                                            required: {
                                                value: (contact.city ? false : true),
                                                message: "City is Required",
                                            },
                                        })}
                                        onChange={handleChange}
                                        value={contact.city} />
                                    <p>
                                        <small style={{ color: 'red' }}>
                                            {errors.city?.type === "required" ? errors.city?.message : undefined}
                                        </small>
                                    </p>
                                    <textarea
                                        rows="5"
                                        placeholder="Message..."
                                        name='message'
                                        {...register('message', {
                                            required: {
                                                value: (contact.message ? false : true),
                                                message: "Message is Required",
                                            },
                                        })}
                                        onChange={handleChange}
                                        value={contact.message}>
                                    </textarea>
                                    <p>
                                        <small style={{ color: 'red' }}>
                                            {errors.message?.type === "required" ? errors.message?.message : undefined}
                                        </small>
                                    </p>
                                    <input type="submit" className="btn" value='Send' />
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