import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";

const TrackMyOrder = () => {
    return (
        <div>
            <PageTitle title="TrackMyOrder" />
            <BreadCrumb title={"TrackMyOrder"} />
            <Container>
                <h1>TrackMyOrder</h1>
            </Container>
        </div>
    )
}
export default TrackMyOrder;