import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";

const Help = () => {
    return (
        <div>
            <PageTitle title="help" />
            <BreadCrumb title={"help"} />
            <Container>
                <h1>help</h1>
            </Container>
        </div>
    )
}
export default Help;