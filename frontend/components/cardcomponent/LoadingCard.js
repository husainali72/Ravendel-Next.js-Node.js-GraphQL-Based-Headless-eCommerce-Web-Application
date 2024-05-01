/* eslint-disable no-undef */
import { Placeholder } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
const LoadingCartTable = () => {
   
const cartItems = [1,2,3]
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
                                     <Placeholder as="p" animation="glow">
                                        <Placeholder style={{ width: '35%', height:"50px" , borderRadius:"3px"}}
                                         xs={12} size="lg"/>
                                    </Placeholder>
                                        {/* <img src={getImage(item.feature_image, 'thumbnail')} />   */}
                                    </div>
                                   
                                </td>
                                <td>
                                    <div className="td-flex">
                                    <Placeholder as="p" animation="glow">
                                        <Placeholder  xs={12} size="lg"/>
                                        <Placeholder style={{ width: '75%'}} xs={12} size="sm"/>
                                    </Placeholder>
                                    </div>
                                </td>
                                <td>
                                    <div className="td-flex">
                                    <Placeholder as="p" animation="glow">
                                        <Placeholder xs={12} size="lg"/>
                                    </Placeholder>
                                    </div>
                                </td>
                                <td>
                                    <div className="td-flex">
                                    <Placeholder as="p" animation="glow">
                                        <Placeholder xs={12} size="lg"/>
                                        <Placeholder  xs={12} size="sm"/>
                                        
                                    </Placeholder>
                                    </div>
                                </td>
                                <td>
                                    <div className="td-flex">
                                    <Placeholder as="p" animation="glow">
                                        <Placeholder xs={12} size="lg"/>
                                        <Placeholder  xs={12} size="sm"/>
                                    </Placeholder>
                                    </div>
                                </td>
                                <td>
                                    <div className="td-flex">
                                       <Placeholder as="p" animation="glow">
                                        <Placeholder style={{width:"75%"}} xs={12} size="lg"/>
                                    </Placeholder>
                                    </div>
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
                    <a className="card-btons "><i className="fas fa-shopping-bag"></i> Continue Shopping</a>

            </div>

        </div>
    )
}
export default LoadingCartTable;