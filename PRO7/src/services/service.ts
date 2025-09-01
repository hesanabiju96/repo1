export const fetchCartData = async () => {
    const BASE_URL = "https://dummyjson.com/carts/1";
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return (data?.products || []);

    } catch (error) {
        console.error("Error fetching cart data:", error);
    }
}