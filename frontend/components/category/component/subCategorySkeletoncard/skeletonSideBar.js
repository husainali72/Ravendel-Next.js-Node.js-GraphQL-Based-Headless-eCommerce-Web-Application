// src/subCategorySkeletoncard/skeletonSideBar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SkeletonSideBar = () => {
    return (
        <div className="bg-light border-right skeleton skeleton-sidebar" id="sidebar-wrapper">
            <div className="sidebar-heading skeleton" style={{ width: '100%', height: '20px', margin: '10px 0' }}></div>
            <div className="list-group list-group-flush">
                <div className="list-group-item skeleton" style={{ height: '40px', margin: '10px 0' }}></div>
                <div className="list-group-item skeleton" style={{ height: '40px', margin: '10px 0' }}></div>
                <div className="list-group-item skeleton" style={{ height: '40px', margin: '10px 0' }}></div>
            </div>
        </div>
    );
}

export default SkeletonSideBar;
