import Link from "next/link";
import { useState } from "react";
import { useSession } from 'next-auth/react';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Container from 'react-bootstrap/Container';
import AccountSidebar from "../../components/account/component/AccountSidebar";
import Order from "./order";
import MyAddress from "../../components/account/MyAddress";
import EditAddress from "../../components/account/EditAddress";

const sidebarItems = [
    {
        name: 'My Orders',
        active: true,
        icon: <Inventory2OutlinedIcon/>,
        component: <Order/>
    },
    {
        name: 'My Addresses',
        active: false,
        icon: <FmdGoodOutlinedIcon />,
        component: <MyAddress/>
    },
    {
        name: 'Edit Profile',
        active: false,
        icon: <EditNoteIcon />,
        component: <EditAddress/>
    },
    // {
    //     name: 'My Wishlist',
    //     active: false,
    //     icon: <BookmarkBorderOutlinedIcon/>,
    //     component: <Order/>
    // },
    // {
    //     name: 'Notification',
    //     active: false,
    //     icon: <NotificationsActiveOutlinedIcon/>,
    //     component: <Order/>
    // },
]

const Account = () => {
    const [sidebarItemsState, setSidebarItemsState] = useState(sidebarItems);
    const session = useSession()
    let customer = session.status === "authenticated"

    return (
        <>
            <Container>
                {
                    customer ?
                    <div className="account-page">
                        <div className="account-page-head">
                            <h2>My Account</h2>
                        </div>
                        <div className="account-main">
                            <AccountSidebar
                                items={[sidebarItemsState, setSidebarItemsState]}
                            />
                            {
                                sidebarItemsState.map((item) => (
                                    <>
                                        {
                                            item.active === true &&
                                            <div className="account-content">
                                                {item.component}
                                            </div>
                                        }
                                    </>
                                ))
                            }
                        </div>
                    </div>
                    :
                    <div className="checkout-unauthorised-container">
                        <h3>Please Login First</h3>
                        <Link href="/login">
                            <button
                            type="button"
                            className="btn btn-success primary-btn-color checkout-login-btn"
                            >
                            login
                            </button>
                        </Link>
                    </div>
                }
            </Container>
        </>

    )
}
export default Account;

// export async function getServerSideProps(context) {

//     const session = await getSession(context)
//     // console.log("context", session)
//     return {
//         props: {
//             // csrfToken: await getCsrfToken(context),
//         },
//     };
// }

