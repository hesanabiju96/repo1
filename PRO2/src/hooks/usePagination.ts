import { useCallback, useRef } from "react";
interface PaginationOptions {
    hasMore: boolean;
    loading: boolean;
    onLoadMore: () => void;
}
export const usePagination = (props: PaginationOptions) => {
    const { hasMore, loading, onLoadMore } = props;

    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useCallback((node: HTMLTableRowElement | null) => {
        if (loading) return; // Do not observe if loading
        if (observer.current) observer.current.disconnect(); // Disconnect previous observer

        if (node) {
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    onLoadMore();
                }
            });
            observer.current.observe(node);
        }
    }, [loading, hasMore, onLoadMore]);

    return lastElementRef;

}