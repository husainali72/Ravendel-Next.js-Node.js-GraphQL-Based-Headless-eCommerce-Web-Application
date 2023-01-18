import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";

const DeleveryInformation = () => {
    return (
        <>
            <PageTitle title="delivery information" />
            <BreadCrumb title={"delivery information"} />
            <Container>
                <h1>Information</h1>
            </Container>

        </>
    )
}
export default DeleveryInformation;