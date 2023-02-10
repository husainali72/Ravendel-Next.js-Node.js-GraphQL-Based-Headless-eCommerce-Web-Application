import Link from "next/link";
import { useState, useEffect } from "react"
import Table from 'react-bootstrap/Table';
import { getImage } from '../../utills/helpers';
const CartTable = (props) => {
    // const dispatch = useDispatch();
    const { cartItems,
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
                                    <div className="td-flex">
                                        <img src={getImage(item.feature_image, 'thumbnail')} />
                                    </div>
                                </td>
                                <td>
                                    <div className="td-flex">
                                        <h3>{item.name}</h3>
                                    </div>
                                </td>
                                <td>
                                    <div className="td-flex">
                                        <span>{currency} {(item.pricing?.sellprice ? item.pricing?.sellprice : item.pricing?.price)}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="td-flex">
                                        <span className="btn btn-primary btn-less" style={{ margin: '2px' }} onClick={() => DecreaseQuantity(item)}>
                                            <i className="fas fa-chevron-down"></i>
                                        </span>
                                        <span className="btn btn-info">
                                            {item.quantity || quantity}
                                        </span>
                                        <span className="btn btn-primary btn-more" style={{ margin: '2px' }} onClick={() => IncreaseQuantity(item)}>
                                            <i className="fas fa-chevron-up"></i>
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="td-flex">
                                        {/* item.pricing?.sellprice not showing correct price so manually ading price multiply by quantity */}
                                        {/* <span>{currency} {((item.pricing?.sellprice ? item.pricing?.sellprice : item.pricing?.price * item.quantity) || 0).toFixed(2)}</span> */}
                                        <span>{currency} {((item.pricing?.sellprice ? item.pricing?.price * item.quantity : item.pricing?.sellprice ) || 0).toFixed(2)}</span>
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
                            {/* <td className="cart-total">Total {currency}{CalculateProductTotal(cartItems).toFixed(2)}</td> */}
                            <td className="clear-cart">
                                <i onClick={() => AllCartItemsClear()} className="fas fa-times clear-cart">Clear Cart</i>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="cart-action text-end">
                {/* <a className="card-btons disable-btn  mr-10 mb-sm-15" onClick={() => updateCartProduct()}><i className="fas fa-random"></i> Update Cart</a> */}
                <Link href="/shop"><a className="card-btons "><i className="fas fa-shopping-bag"></i> Continue Shopping</a></Link>
            </div>

        </div>
    )
}
export default CartTable;