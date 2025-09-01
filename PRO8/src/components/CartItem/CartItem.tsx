import type { Cart } from "../../types/Cart";
import "./style.css";

type CartItemProps = {
    cartItem: Cart;
    key: number;
};
const CartItem = (props: CartItemProps) => {
    const { cartItem: item, key, } = props;

    const totalCost = item.price * item.quantity;
    return (
        <div className="cart-item" key={key}>
            <img className="product-image" src={item.thumbnail} alt={item.title} />
            <div className="item-details">
                <h4>{item.title}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${totalCost.toFixed(2)}</p>
            </div>
        </div>
    );
}
export default CartItem;