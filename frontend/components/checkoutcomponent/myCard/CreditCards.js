/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useForm } from 'react-hook-form';
import { formatExpirationDate } from "./CardUtills";
const CreditCards = () => {
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        name: "",
        cvc: "",
        expiry: "",
        focus: "",
    })

    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm({ mode: "onSubmit", });

    const handleInputChange = (e) => {
        setCardDetails({
            ...cardDetails,
            [e.target.name]: e.target.value
        });
    };
    const onSubmit = data => {

        // console.log(data)
    }
    // console.log("error", errors)
    const handleInputFocus = (e) => {
        setCardDetails({ ...cardDetails, focus: e.target.name });
    }
    return (
        <>
            <h1>credit card</h1>
            <Cards
                cvc={cardDetails.cvc}
                expiry={cardDetails.expiry}
                focused={cardDetails.focus}
                name={cardDetails.name}
                number={cardDetails.cardNumber}
            />

            <div id="PaymentForm" style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Control
                            type="tel"
                            name="cardNumber"
                            placeholder="Card Number"
                            {...register('cardNumber', {
                                required: {
                                    value: true,
                                    message: "cardNumber is Required",
                                },
                                minLength: {
                                    value: 16,
                                    message: "Card Number Min length is 16",
                                },
                                maxLength: {
                                    value: 16,
                                    message: "Card Number Min length is 16",
                                }
                            })}
                            value={cardDetails.cardNumber}
                            onChange={handleInputChange}
                            onFocus={(e) => setCardDetails({ ...cardDetails, focus: e.target.name })}
                        />
                        <p>
                            <small style={{ color: 'red' }}>
                                {errors.cardNumber?.type === "required" && errors.cardNumber?.message}
                                {errors.cardNumber?.type === "minLength" && errors.cardNumber?.message}
                            </small>
                        </p>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Name on card"
                            {...register('name', {
                                required: {
                                    value: true,
                                    message: "CardHolder name is Required",
                                },
                            })}
                            value={cardDetails.name}
                            onChange={handleInputChange}
                            onFocus={(e) => setCardDetails({ ...cardDetails, focus: e.target.name })} />
                        <p>
                            <small style={{ color: 'red' }}>
                                {errors.name?.type === "required" && errors.name?.message}
                            </small>
                        </p>
                        <Row>
                            <Col>
                                <Form.Control
                                    name="expiry"
                                    type="text"
                                    placeholder="Valid Thru"
                                    {...register("expiry", {
                                        required: { value: true, message: "please enter expiry date" },
                                        pattern: { value: "\d\d/\d\d", message: "Please enter valid date" },
                                    }
                                    )}
                                    value={cardDetails.expiry}
                                    onChange={handleInputChange}
                                    onFocus={(e) => setCardDetails({ ...cardDetails, focus: e.target.name })}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="tel"
                                    name="cvc"
                                    placeholder="cvv"
                                    {...register("cvc", {
                                        required: {
                                            value: true,
                                            message: "CardHolder name is Required",
                                        },
                                        maxLength: {
                                            value: 3,
                                            message: "cvc number length max 3"
                                        }
                                    })}
                                    value={cardDetails.cvc}
                                    onChange={handleInputChange}
                                    onFocus={(e) => setCardDetails({ ...cardDetails, focus: e.target.name })}
                                />
                                <p>
                                    <small style={{ color: 'red' }}>
                                        {errors.cvc?.type === "required" && errors.cvc?.message}
                                        {errors.cvc?.type === "maxLength" && errors.cvc?.message}
                                    </small>
                                </p>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit">submit</Button>
                    </Form.Group>

                </Form>

            </div>
        </>

    )
}
export default CreditCards;