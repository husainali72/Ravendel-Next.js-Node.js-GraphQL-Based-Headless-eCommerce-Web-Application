import Link from "next/link";
import emptyCart from "../../components/images/emptyCart.png";
const EmptyCart = () => {
  return (
    <>
      <div className="emptyCart">
        <div>
          <img src={emptyCart.src} className="emptyCartImage"/>
          <h5>Your cart is empty</h5>
          <p>Looks like your hunt for the perfect item is still on! Keep browsing to explore our top products.</p>
          <Link href="/">
          <div  className="card-btons text-align-center primary-btn-color">
          Start Shopping
        </div>
        </Link>
        </div>
      </div>
    </>
  );
};
export default EmptyCart;
