import type { Cart } from "../../types/Cart";
import "./style.css";

type CartItemProps = {
    cartItem: Cart;
    key: number;
    onQuantityChange: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
};
const CartItem = (props: CartItemProps) => {
    const { cartItem: item, key, onQuantityChange, onRemove } = props;
    const handleIncrease = () => onQuantityChange(item.id, item.quantity + 1);
    const handleDecrease = () => onQuantityChange(item.id, item.quantity - 1);
    const handleRemove = () => onRemove(item.id);

    const totalCost = item.price * item.quantity;
    return (
        <div className="cart-item" key={key}>
            <img className="product-image" src={item.thumbnail} alt={item.title} />
            <div className="item-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <div className="item-actions">
                    <div className="quantity-controls">
                        <button onClick={handleDecrease}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={handleIncrease}>+</button>
                    </div>
                    <div className="divider">|</div>
                    <span onClick={handleRemove}>Remove</span>
                </div>
            </div>
            <div>
                <h2>${totalCost.toFixed(2)}</h2>
            </div>
        </div>
    );
}
export default CartItem;