/* eslint-disable no-unused-vars */
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";
import InputField from "../../components/inputField";
import {
  emailErrorMessage,
  passwordErrorMessage,
} from "../../components/validationMessages";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { mutationWithoutToken, queryWithoutToken } from "../../utills/helpers";
import {
  SEND_FORGOT_PASSWORD_EMAIL,
  VERIFY_FORGOT_PASSWORD_TOKEN,
} from "../../queries/forgotPasswordQuery";
import { passwordValidation, validateEmail } from "../../utills/Validation";
import { get } from "lodash";
import { useRouter } from "next/router";
import PasswordField from "../../components/passwordField";
import ChangePassword from "../../components/account/forgotPasswordComponent/changePassword";
import SendEmail from "../../components/account/forgotPasswordComponent/sendEmail";
import { Toaster } from "react-hot-toast";

const ForgetPassword = () => {
  const [token, setToken] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = router.query.token;
    setToken(token);
  }, [router.query]);

  return (
    <div className="forget-password-container">
      {/* <PageTitle title="Forget Password" /> */}
      <BreadCrumb title={"Forget Password"} />
      <Container>
        <Toaster />
        {token ? <ChangePassword token={token} /> : <SendEmail />}
      </Container>
    </div>
  );
};

export default ForgetPassword;
