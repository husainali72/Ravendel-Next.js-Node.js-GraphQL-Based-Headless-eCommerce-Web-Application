import { Container, Row } from "react-bootstrap";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";

const PaymentFailed = () => {
    return (
        <div>
            <PageTitle title="Payment Failed" />
            <BreadCrumb title={"Payment-Failed"} />
            <Container>
                <Row style={{ margin: "34px" }}>
                    <h1 className="payment-failed-container" style={{ color: "red", marginBottom: "20px !important", fontWeight: "bold" }}>Payment Failed</h1>
                    <h4 className="payment-failed-container" style={{ fontWeight: "bold" }}>Please Try Again Later</h4>
                </Row>
            </Container>
        </div>
    )
}
export default PaymentFailed;