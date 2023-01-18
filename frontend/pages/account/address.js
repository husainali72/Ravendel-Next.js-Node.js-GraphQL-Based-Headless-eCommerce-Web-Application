import { Container } from "react-bootstrap";
import OrdersDetails from "../../components/account/component/orders-details";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import PageTitle from "../../components/PageTitle";

const Address = () => {
    return (
        <div>
            <PageTitle title="Address" />
            <BreadCrumb title={"Address"} />
            <Container>
                <OrdersDetails />
            </Container>
        </div>
    )
}
export default Address;