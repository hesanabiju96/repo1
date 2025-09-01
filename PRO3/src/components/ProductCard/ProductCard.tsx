import { useState } from 'react';
import type { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import './style.css';

interface ProductProps {
    product: Product;
}
const ProductCard = (props: ProductProps) => {
    const { product } = props;
    const { cart, addToCart } = useCart();
    const [clicked, setClicked] = useState(false);

    const isAdded = cart.some((item: Product) => item.id === product.id);

    const handleClick = () => {
        if (!isAdded) {
            addToCart(product);
            setClicked(true);
            setTimeout(() => setClicked(false), 1000);
        }
    }
    return (
        <div className="product-card">
            <img src={product.thumbnail} className="" alt={product.title} />
            <div className="product-info">
                <h4>{product.title}</h4>
                <p>💲{product.price} | ⭐ {product.rating}</p>
                <button onClick={handleClick} disabled={isAdded}>
                    {isAdded ? 'Added 🛒' : clicked ? 'Adding...' : 'Add to Cart'}
                </button>
            </div>
        </div>
    )
}
export default ProductCard;