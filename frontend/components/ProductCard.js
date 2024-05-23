import React from 'react'
import PropTypes from "prop-types";
import Link from 'next/link';
import { get } from 'lodash';
import ProductImage from './imageComponent';
import Price from './priceWithCurrency';

const ProductCard = ({cardItems}) => {
  return (
    <div className='product-cards-wrapper'>
        {
            cardItems?.map((product)=>(
                <div className='p-card' key={product?.productId}>
                    <div className='d-flex align-items-center'>
                        <Link href={"/product/" + product.url}>
                        <a>
                            <ProductImage
                                src={get(product, "productImage", "")}
                                alt={product?.name}
                                className="cart-product-image cursor-pointer"
                            />
                        </a>
                        </Link>
                        <Link href={"/product/" + product.url}>
                            <h3 className="cart-product-name  cursor-pointer mx-2 mb-0">  
                            {get(product, "productTitle", "")}
                            </h3>
                        </Link>
                    </div>
                    <div>
                        <div className="itemContainer-base-price">
                            <div className="itemComponents-base-price itemComponents-base-bold ">
                                <div>
                                    <Price price={get(product, "amount", 0)} />
                                </div>
                            </div>

                            {get(product, "discountPercentage", 0) !== 0 && (
                            <div className="itemContainer-base-discountBlock">
                                <span className="itemComponents-base-strikedAmount">
                                    <span className="itemComponents-base-price itemComponents-base-strike itemContainer-base-strikedAmount">
                                        <Price price={get(product, "mrpAmount", 0)} />
                                    </span>
                                </span>
                                <p className="itemComponents-base-itemDiscount">
                                {get(product, "discountPercentage")}% OFF
                                </p>
                            </div>
                            )}
                        </div>
                        <div className='d-flex justify-content-end'>
                            <b className='qty'>Qty: {get(product, "qty", 0)}</b>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default ProductCard

ProductCard.propTypes = {
    cardItems: PropTypes.array.isRequired
}