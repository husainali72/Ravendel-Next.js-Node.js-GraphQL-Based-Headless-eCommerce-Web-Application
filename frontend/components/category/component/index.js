// src/App.js
import React from 'react';
import SkeletonProductCard from './subCategorySkeletoncard/skeletonProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import SkeletonSideBar from './subCategorySkeletoncard/skeletonSideBar';
import PropTypes from "prop-types";
const SubCategorySkeletoncard = ({parentLoading}) => {
    return (
        <div className="d-flex" id="wrapper">
          {parentLoading&&  <SkeletonSideBar/>}
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <div className="d-flex flex-wrap">
                        <SkeletonProductCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
SubCategorySkeletoncard.propTypes = {
    parentLoading: PropTypes.boolean,
  };

export default SubCategorySkeletoncard;
