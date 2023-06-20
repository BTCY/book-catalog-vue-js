export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
    let timeoutID: number | undefined = undefined;

    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    } as T;
}