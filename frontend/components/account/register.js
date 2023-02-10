import { useState } from "react";
import { ADD_CUSTOMER } from "../../queries/customerquery";
import client from "../../apollo-client";
import Link from "next/link";
import { mutation } from "../../utills/helpers";

const registerObject = {
    ///////////////////////////////
    queryName: "addCustomer",
    ///////////////////////////////
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    company: "",
    phone: "",
}
const Register = () => {
    const [registerUser, setRegisterUser] = useState(registerObject);

    const doRegister = (e) => {
        e.preventDefault();
        // console.log('register', registerUser);
        mutation(ADD_CUSTOMER, registerUser).then(res => console.log('register', res))
        // registerCustomer(registerUser);
    }

    async function registerCustomer(registerUser) {
        var registerUsers = [];
        try {
            const { data: registerUserData } = await client.mutate({
                mutation: ADD_CUSTOMER,
                variables: registerUser,
            });
            registerUsers = registerUserData
        }
        catch (e) {
            console.log("error", e);
        }
        // console.log("registerUser", registerUsers)
    }

    return (
        <div className="p-30 register-box">
            <h4>Create your Account</h4>
            <p style={{ marginTop: 12 }} className="mb-50">Your personal data will be used to support your experience throughout this website, to manage
                access to your account, and for other purposes described in our privacy policy
            </p>
            <div className="form-container">
                <form onSubmit={doRegister}>
                    <input
                        type="first_name"
                        className="form-control"
                        id="first_name"
                        placeholder="First Name"
                        value={registerUser.first_name}
                        onChange={(e) => setRegisterUser({ ...registerUser, first_name: e.target.value })}
                    />
                    <input
                        type="last_name"
                        className="form-control"
                        id="last_name"
                        placeholder="Last Name"
                        value={registerUser.last_name}
                        onChange={(e) => setRegisterUser({ ...registerUser, last_name: e.target.value })}
                    />
                    <input
                        type="login-email"
                        style={{ marginTop: 12, }}
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={registerUser.email}
                        onChange={(e) => setRegisterUser({ ...registerUser, email: e.target.value })}
                    />
                    <input
                        type="number"
                        style={{ marginTop: 12, }}
                        className="form-control"
                        id="email"
                        placeholder="Mobile no."
                        value={registerUser.phone}
                        onChange={(e) => setRegisterUser({ ...registerUser, phone: e.target.value })}
                    />
                    <input
                        type="text"
                        style={{ marginTop: 12, }}
                        className="form-control"
                        id="text"
                        placeholder="company"
                        value={registerUser.company}
                        onChange={(e) => setRegisterUser({ ...registerUser, company: e.target.value })}
                    />
                    <input
                        type="password"
                        className="form-control"
                        style={{ marginTop: 12 }}
                        id="password"
                        placeholder="Password"
                        value={registerUser.password}
                        onChange={(e) => setRegisterUser({ ...registerUser, password: e.target.value })}
                    />
                    {/* <input
                        type="password"
                        className="form-control"
                        style={{ marginTop: 12 }}
                        id="confirm password"
                        placeholder="Confirm Password"
                        value={registerUser.confirmPassword}
                        onChange={(e) => setRegisterUser({ ...registerUser, confirmPassword: e.target.value })}
                    /> */}
                    <div className="form-check" style={{ marginTop: 12 }}>
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                        <Link href="/abouts/terms&condition">
                            <label className="form-check-label" >
                                I agree to terms & Policy.
                            </label>
                        </Link>
                        {/* <a href="#" style={{ float: 'right' }}>learn more</a> */}
                    </div>
                    <button type="submit" className="btn btn-success" style={{ marginTop: 12, backgroundColor: "#088178" }}>Register</button>
                </form>
            </div>
        </div>
    )
}
export default Register;