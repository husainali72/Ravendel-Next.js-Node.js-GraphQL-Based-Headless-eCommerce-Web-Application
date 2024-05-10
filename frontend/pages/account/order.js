/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GET_CUSTOMER_ORDERS_QUERY } from "../../queries/orderquery";
import { getSession, useSession } from "next-auth/react";
import {
  formatDate,
  query,
} from "../../utills/helpers";
import { get } from "lodash";
import LoadingCartTable from "../../components/cardcomponent/LoadingCard";
import DataTable from "../../components/TableComponent";
import { CircularProgress, IconButton } from "@mui/material";
import BasicModal from "../../components/ModalComponent";
import OrdersDetails from "../../components/account/component/orders-details";

const Order = () => {
  const { status } = useSession();
  const [customerOrder, setCustomerOrder] = useState([]);
  const [loading, setloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState({});
  const [order, setOrder] = useState();
  useEffect(() => {
    const userSession = getSession();
    userSession.then((res) => setSession(res));
  }, []);
  useEffect(() => {
    getOrderCustomer();
  }, [session]);
  
  const getOrderCustomer = () => {
    var id = "";
    var token = "";
    let success = get(session, "user.accessToken.success");
    if (success) {
      id = get(session, "user.accessToken.customer._id");
      token = get(session, "user.accessToken.token");
    }
    let variable = {
      id: id,
    };
    query(GET_CUSTOMER_ORDERS_QUERY, variable, token).then((response) => {
      if (response) {
        if (response.data.orderbyUser.data) {
          let customeradd = get(response, "data.orderbyUser.data", []);
          customeradd = customeradd.map((item)=> ({...item, date: formatDate(item.date)}))
          setloading(false);
          setCustomerOrder([...customeradd]);
        }
      }
    });
  };

  const handleShowDetailsPopup = (id) => {
    let orderDetail = customerOrder.filter((item) => item.id === id)
    setOrder(orderDetail);
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    console.log(customerOrder)
  }, [customerOrder])

  const columns = [
    { field: 'orderNumber', headerName: 'Order Number', minWidth: 140, flex: 1, filterable: false, sortable: true },
    { field: 'date', headerName: 'Date', minWidth: 140, flex: 1, filterable: false, sortable: true },
    { field: 'paymentStatus', headerName: 'Payment Status', minWidth: 140, flex: 1, filterable: false, sortable: true },
    { field: 'shippingStatus', headerName: 'Shipping Status', minWidth: 140, flex: 1, filterable: false, sortable: true },
    { headerName: 'Action', width: 60, filterable: false, sortable: false, renderCell: (params) => (
      <>
        <IconButton color="primary" aria-label="edit" onClick={() => handleShowDetailsPopup(params.row.id)}>
          <VisibilityIcon />
        </IconButton>
      </>
    ),},
  ]

  return (
    <div className="order-wrapper">
      {
        loading ?
          <div className="loading-wrapper">
            <CircularProgress/>
          </div>
        :
        <DataTable
          rows={customerOrder}
          columns={columns}
          rowHeight={40}
          columnHeaderHeight={40}
        />
      }
      <BasicModal
        openState={[open, setOpen]}
        handleClose={handleClose}
        className='order-details-wrapper'
      >
        <OrdersDetails
          orderDetail={get(order, "products", [])}
          order={order}
          billingInfo={get(order, "billing", {})}
          shippingInfo={get(order, "shipping", {})}
          tax={get(order, "taxAmount", 0)}
          subtotal={get(order, "subtotal", 0)}
          shippingAmount={get(order, "shippingAmount", 0)}
          total={get(order, "grandTotal", 0)}
          handleClose={handleClose}
        />
      </BasicModal>
      {/* <div className="row order-btn-row">
        <div>
          <button
            className="order-details-btn"
            onClick={() => handleReOrder(order)}
          >
            Reorder
          </button>
          <button
            className="order-details-btn"
            onClick={() => window.print()}
          >
            Print Invoices
          </button>
        </div>
      </div> */}
    </div>
  );
};
export default Order;