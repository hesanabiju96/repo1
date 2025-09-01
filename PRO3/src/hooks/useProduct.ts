import { useEffect, useState } from "react";
import { fetchProducts } from "../services/service";
import type { Product } from "../types/Product";

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const products = await fetchProducts();
                setProducts(products);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }
        getProducts();
    }, []);

    return { products, loading };


}


