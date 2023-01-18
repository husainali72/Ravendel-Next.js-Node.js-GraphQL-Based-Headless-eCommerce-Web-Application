import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";

const TermsandCondition = () => {
    return (
        <div>
            <PageTitle title="Terms & Condition" />
            <BreadCrumb title={"TermsandCondition"} />
            <Container>
                <h1>TermsandCondition</h1>
            </Container>
        </div>
    )
}
export default TermsandCondition;