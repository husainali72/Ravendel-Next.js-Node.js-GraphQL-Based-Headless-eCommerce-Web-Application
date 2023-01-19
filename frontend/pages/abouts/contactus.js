import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";

const ContactUs = () => {
    return (
        <div>
            <PageTitle title="ContactUs" />
            <BreadCrumb title={"ContactUs"} />

            <Container>
                <h1>ContactUs</h1>
            </Container>
        </div>
    )
}
export default ContactUs;