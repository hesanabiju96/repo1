import { createContext, useState, useCallback, useContext } from "react";
import type { ReactElement } from "react";
import type { Product } from "../types/Product";

// Define the shape of the context value
interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
}

// Create the context
export const CartContext = createContext<CartContextType | null>(null);

// Props for the provider component
interface CartProviderProps {
    children: ReactElement | ReactElement[];
}

// Provider component
export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = useCallback((product: Product) => {
        setCart((prevCart) => {
            const isAdded = prevCart.some((item) => item.id === product.id);
            return isAdded ? [...prevCart] : [...prevCart, product];
        });
    }, []);


    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};
