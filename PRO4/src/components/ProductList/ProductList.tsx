import type { Product } from "../../types/Product";
import ProductCard from "../ProductCard/ProductCard";
import './style.css';

interface ProductListProps {
    products: Product[];
}

const ProductList = (props: ProductListProps) => {
    const { products } = props;

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )

}
export default ProductList;