export function createInfiniteScrollHandler(loadMore: () => void, threshold = 100) {
    return (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollTop + clientHeight >= scrollHeight - threshold) {
            loadMore();
        }
    };
}