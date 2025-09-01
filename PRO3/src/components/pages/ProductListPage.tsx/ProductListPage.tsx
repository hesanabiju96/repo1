import { useProducts } from "../../../hooks/useProduct";
import ProductList from "../../ProductList/ProductList";

const ProductListPage = () => {
    const { products, loading } = useProducts();
    return <div className="product-list-page">
        {products.length === 0 && !loading && <div>No products found.</div>}

        <ProductList products={products} />
        {loading && <p>Loading...</p>}

    </div>
}
export default ProductListPage;