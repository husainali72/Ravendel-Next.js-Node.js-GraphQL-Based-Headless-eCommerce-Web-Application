/* eslint-disable no-unused-vars */

import Link from "next/link";
import { useState } from "react";
import { useSession, getSession, signIn, signOut, getCsrfToken } from 'next-auth/react';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import Container from 'react-bootstrap/Container';
import LogIn from "../../components/account/login";
import Register from "../../components/account/register";
import { useSelector, useDispatch } from "react-redux";
import { customerAction } from "../../redux/actions/loginAction";
import AccountSidebar from "../../components/account/component/AccountSidebar";
import Order from "./order";

const sidebarItems = [
    {
        name: 'My Orders',
        active: true,
        icon: <NotificationsActiveOutlinedIcon/>,
        component: <Order/>
    },
    {
        name: 'Edit Profile',
        active: false,
        icon: <EditNoteIcon />,
        component: <Order/>
    },
    {
        name: 'My Addresses',
        active: false,
        icon: <FmdGoodOutlinedIcon />,
        component: <Order/>
    },
    {
        name: 'My Wishlist',
        active: false,
        icon: <BookmarkBorderOutlinedIcon/>,
        component: <Order/>
    },
    {
        name: 'Notification',
        active: false,
        icon: <NotificationsActiveOutlinedIcon/>,
        component: <Order/>
    },
]

const Account = () => {
    const [sidebarItemsState, setSidebarItemsState] = useState(sidebarItems);
    const session = useSession()
    let customer = session.status === "authenticated"
    const dispatch = useDispatch();

    return (
        <>
            <Container>
                {
                    customer &&
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

