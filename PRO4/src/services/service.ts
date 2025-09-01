export const fetchProductData = async (searchTerm: string, limit: number, skip: number) => {
    const BASE_URL = "https://dummyjson.com/products";
    try {

        const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}&skip=${skip}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.products || [];
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}