import { useState } from "react";
import { useProducts } from "../../../hooks/useProducts";
import ProductList from "../../ProductList/ProductList";
import SearchBar from "../../SearchBar/SearchBar";
import './style.css';

const ProductListPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const { products, loading, hasMore } = useProducts({ searchTerm, page });

    const handleNext = () => {
        if (hasMore) setPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    return <div className="product-list-page">
        <SearchBar onSearch={setSearchTerm} pageSet={setPage} />
        {products.length === 0 && !loading && <div>No products found.</div>}
        {products.length > 0 && <div className="pagination-controls">
            <button onClick={handlePrev} disabled={page === 1 || loading}>
                {'<'}
            </button>
            <span>{page}</span>
            <button onClick={handleNext} disabled={!hasMore || loading}>
                {'>'}
            </button>
        </div>}
        <ProductList products={products} />
        {loading && <p>Loading...</p>}

    </div>
}
export default ProductListPage;