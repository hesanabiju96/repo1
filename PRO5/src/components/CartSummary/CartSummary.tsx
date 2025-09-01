import './style.css';

type CartSummaryProps = {
    subtotal: number;
    totalCount: number;
};

const CartSummary = (props: CartSummaryProps) => {
    const { subtotal, totalCount } = props;
    return (
        <div className="cart-summary">
            <h3>{`Subtotal (${totalCount} items): ${subtotal.toFixed(2)}`}</h3>
        </div>
    );
}
export default CartSummary;