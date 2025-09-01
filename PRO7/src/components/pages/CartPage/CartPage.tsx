import { useEffect, useState } from "react";
import { useCart } from "../../../hooks/useCart";
import type { Cart } from "../../../types/Cart";
import CartItem from "../../CartItem/CartItem";
import "./style.css";
import CartSummary from "../../CartSummary/CartSummary";

const CartPage = () => {
    const [cartItems, setCartItems] = useState<Cart[]>([]);
    const { cartData, loading } = useCart();

    useEffect(() => {
        if (!loading && cartData.length > 0) {
            setCartItems(cartData);
        }
    }, [cartData, loading]);


    const updateQuantity = (id: number, qnty: number) => {
        setCartItems(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: qnty }
                }
                return item;
            })
        })
    }

    const removeItem = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    if (!loading && cartData.length === 0) {
        return <div>No items in the cart</div>
    }
    return (
        <div className="cart-page">
            {cartItems.length > 0 ?
                <><div className="product-list">
                    {cartItems.map((item: Cart) => (
                        <CartItem key={item.id} cartItem={item} onQuantityChange={updateQuantity} onRemove={removeItem} />
                    ))}

                </div>
                    <CartSummary subtotal={subtotal} totalCount={totalCount} />
                </> : ''}
            {loading && <p>Loading...</p>}

        </div>

    )
}
export default CartPage;