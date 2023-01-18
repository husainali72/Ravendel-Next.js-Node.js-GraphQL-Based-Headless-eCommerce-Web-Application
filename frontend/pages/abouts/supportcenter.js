import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";

const SupportCenter = () => {
    return (
        <div>
            <PageTitle title="SupportCenter" />
            <BreadCrumb title={"SupportCenter"} />
            <Container>
                <h1>SupportCenter</h1>
            </Container>
        </div>
    )
}
export default SupportCenter;