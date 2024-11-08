export const debounce = (callback: () => void, delay: number) => {
    let debounceTimeout: ReturnType<typeof setTimeout>;
    return () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            callback();
        }, delay);
    }
}

export function roundWith2Decimals(number: number): number {
    return Math.round(number * 100) / 100;
}

export function getOccurrence<T>(array: T[], value:T) {
    return array.filter((v) => (v === value)).length;
}