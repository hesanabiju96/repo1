import type { Product } from "../../types/Product";
import './style.css';

interface ProductProps {
    product: Product;
}
const ProductCard = (props: ProductProps) => {
    const { product } = props;
    return (
        <div className="product-card">
            <img src={product.thumbnail} className="" alt={product.title} />
            <div className="product-info">
                <h4>{product.title}</h4>
                <p className="description">{product.description}</p>
                <p>Price: ${product.price}</p>

            </div>
        </div>
    )
}
export default ProductCard;