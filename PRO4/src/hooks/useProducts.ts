import { useState, useEffect } from 'react';
import type { Product } from '../types/Product';
import { fetchProductData } from '../services/service';

interface UseProductsProps {
    searchTerm: string;
    page: number;
}

export const useProducts = ({ searchTerm, page }: UseProductsProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const LIMIT = 20
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const skip = (page - 1) * LIMIT;
                const newData = await fetchProductData(searchTerm, LIMIT, skip);
                setProducts(newData);
                setHasMore(newData.length === LIMIT); // If less than limit, no more pages
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchTerm, page]);

    return { products, loading, hasMore };
};
