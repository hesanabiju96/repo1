import type { Cart } from '../../types/Cart';
import './style.css';

type CartSummaryProps = {
    cartData: Cart[]
};

const CartSummary = (props: CartSummaryProps) => {
    const { cartData: products } = props;
    const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + tax + shipping;
    const totalItems = products.reduce((count, p) => count + p.quantity, 0);
    return (
        <div className="cart-summary">
            <h2>Cart Summary</h2>
            <div className='summary-details'>
                <p><span>Items:</span> <span>{totalItems}</span></p>
                <p><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></p>
                <p><span>Tax (10%):</span> <span>${tax.toFixed(2)}</span></p>
                <p><span>Shipping:</span> <span>${shipping.toFixed(2)}</span></p>
                <h3><span>Total:</span> <span>${total.toFixed(2)}</span></h3>
            </div>
        </div>
    );
}
export default CartSummary;