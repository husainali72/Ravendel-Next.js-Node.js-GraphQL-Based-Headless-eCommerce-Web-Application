import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";

const PrivacyPolicy = () => {
    return (
        <div>
            <PageTitle title="PrivacyPolicy" />
            <BreadCrumb title={"PrivacyPolicy"} />
            <Container>
                <h1>PrivacyPolicy</h1>
            </Container>
        </div>
    )
}
export default PrivacyPolicy;