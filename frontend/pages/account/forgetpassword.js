import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";

const ForgetPassword = () => {
    return (
        <div>
            <PageTitle title="ForgetPassword" />
            <BreadCrumb title={"ForgetPassword"} />
            <Container>
                <h1>ForgetPassword</h1>
            </Container>
        </div>
    )
}
export default ForgetPassword;