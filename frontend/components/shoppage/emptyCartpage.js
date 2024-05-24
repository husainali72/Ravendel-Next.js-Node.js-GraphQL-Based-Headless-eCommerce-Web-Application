import Link from "next/link";
import emptyCart from "../../components/images/emptyCart.png";
const EmptyCart = () => {
  return (
    <>
      <div className="emptyCart">
        <div>
          <img src={emptyCart.src} className="emptyCartImage"/>
          <h5>Your cart is empty</h5>
          <p>Just relax, let us help you find some first class products</p>
          <div className="card-btons text-align-center outline">
          <Link href="/"> Start Shopping</Link>
        </div>
        </div>
      </div>
    </>
  );
};
export default EmptyCart;
