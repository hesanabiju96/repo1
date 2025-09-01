import { useCart } from '../../context/CartContext';
import './style.css';
export const Header = () => {
    const { cart } = useCart();
    return (
        <header className="header">
            <h2>Product List</h2>
            <h2>🛒 Cart ({cart.length})</h2>
        </header>
    );
};
