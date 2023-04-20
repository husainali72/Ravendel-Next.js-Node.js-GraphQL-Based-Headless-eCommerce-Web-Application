import Link from "next/link";
import { useState, useEffect } from "react"
import { Spinner } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { getImage, getPrice } from '../../utills/helpers';
const CartTable = (props) => {
    const { cartItems,
        decimal,
        isQuantityBtnLoading,
        CalculateProductTotal,
        DecreaseQuantity,
        IncreaseQuantity,
        AllCartItemsClear,
        quantity,
        removeToCart,
        updateCartProduct, currency
    } = props;
    return (
        <div>
            <div className="table-responsive">
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>SubTotal</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems && cartItems?.length > 0 && cartItems.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <Link href={"/product/" + item.url}>
                                        <div className="td-flex cursor-pointer">
                                            <img src={getImage(item.feature_image, 'thumbnail')} />
                                        </div>
                                    </Link>
                                </td>
                                <td>
                                    <Link href={"/product/" + item.url}>
                                        <div className="td-flex cursor-pointer">
                                            <h3>{item.name}</h3>
                                        </div>
                                    </Link>
                                </td>
                                <td>
                                    <div className="td-flex">
                                        <span>{currency} {(item.pricing?.sellprice ? getPrice(item.pricing?.sellprice, decimal) : getPrice(item.pricing?.price, decimal))}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="td-flex">
                                        <span className={`btn btn-primary btn-less ${isQuantityBtnLoading && "disableButton"}`} style={{ margin: '2px' }} onClick={() => {
                                            DecreaseQuantity(item)
                                        }}>
                                            <i className="fas fa-chevron-down" ></i>
                                        </span>
                                        <span className="btn btn-info max-button-width-load">
                                            {item?.quantity}
                                        </span>
                                        <span className={`btn btn-primary btn-more ${isQuantityBtnLoading && "disableButton"}`} style={{ margin: '2px' }} onClick={() => {
                                            IncreaseQuantity(item)
                                        }}>
                                            <i className="fas fa-chevron-up"></i>
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="td-flex">
                                        <span>{currency} {((item.pricing?.sellprice ? getPrice(item.pricing?.sellprice * item.quantity, decimal) : getPrice(item.pricing?.price * item.quantity, decimal)) || 0)}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="td-flex">
                                        <i onClick={() => removeToCart(item)} className="far fa-trash-alt"></i></div>
                                </td>
                            </tr>
                        ))
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="clear-cart">
                                <i onClick={() => AllCartItemsClear()} className="fas fa-times clear-cart">Clear Cart</i>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="cart-action text-end">
                <Link href="/shop"><a className="card-btons "><i className="fas fa-shopping-bag"></i> Continue Shopping</a></Link>
            </div>

        </div>
    )
}
export default CartTable;