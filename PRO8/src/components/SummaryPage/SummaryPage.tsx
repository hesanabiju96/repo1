import "./style.css";
import { useCart } from "../../hooks/useCart";
import type { Cart } from "../../types/Cart";
import CartSummary from "../CartSummary/CartSummary";
import CartItem from "../CartItem/CartItem";

const SummaryPage = () => {
    const { cartData, loading } = useCart();





    // const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    if (!loading && cartData?.products.length === 0) {
        return <div>No items in the cart</div>
    }
    return (
        <div className="cart-page">
            {(cartData?.products?.length ?? 0) > 0 ?
                <><div className="product-list">
                    {cartData?.products.map((item: Cart) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))}

                </div>
                    <CartSummary cartData={cartData?.products || []} />
                </> : ''}
            {loading && <p>Loading...</p>}

        </div>

    )
}
export default SummaryPage;