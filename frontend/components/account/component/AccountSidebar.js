import React from 'react'
import PropTypes from "prop-types";

const AccountSidebar = ({items}) => {
    const [sidebarItemsState, setSidebarItemsState] = items;

    const handleLinkClick = (index) => {
        let data = sidebarItemsState.map((item,i)=> ({...item, active: i === index}));
        data[index] = {...data[index], active: true}
        setSidebarItemsState(data)
    }

    return (
        <div className='account-sidebar'>
            {
                sidebarItemsState.map((item, index) => (
                    <button key={item.name} onClick={()=> handleLinkClick(index)} className={`sidebar-item ${item.active ? 'active' : ''}`}>
                        {item.icon}
                        {item.name}
                    </button>
                ))
            }
        </div>
    )
}

export default AccountSidebar

AccountSidebar.propTypes = {
    items: PropTypes.any.isRequired,
};