import { useEffect, useState } from "react";
import type { Cart } from "../types/Cart";
import { fetchCartData } from "../services/service";

export const useCart = () => {
    const [cartData, setCartData] = useState<Cart[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        const getCartData = async () => {
            setLoading(true);

            try {
                const cartProducts = await fetchCartData();
                setCartData(cartProducts);

            } catch (error) {
                console.error("Error in useCart hook:", error);
            } finally {
                setLoading(false);
            }
        }
        getCartData();
    }, [])
    return { cartData, loading };
}