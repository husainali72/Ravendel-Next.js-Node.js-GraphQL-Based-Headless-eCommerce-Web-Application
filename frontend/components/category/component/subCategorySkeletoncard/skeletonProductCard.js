// src/components/ProductCardSkeleton.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductCardSkeleton = () => {
  return (
    <div className="product-card-loading">
      {[...Array(4)].map((_, index) => (
        <div className="p-card skeleton-card" key={index}>
          <div className="d-flex align-items-center">
            <div className="skeleton skeleton-image"></div>

          </div>
          <div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
