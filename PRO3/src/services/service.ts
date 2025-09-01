export const fetchProducts = async () => {
    const BASE_URL = "https://dummyjson.com/products"

    const response = await fetch(BASE_URL)
    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }
    const data = await response.json()
    return data.products.slice(0, 30)
}