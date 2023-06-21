/**
 *  Delayed function call.
 * 
 * @param   {Function}   fn       Function to be called. 
 * @param   {number}     delayMS  After how long it will be called (in milliseconds). 
 * @return  {T}                   Returns a function to be executed with a delay.
 */
export function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delayMS: number
): T {
    let timeoutID: number | undefined = undefined;

    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
            fn.apply(this, args);
        }, delayMS);
    } as T;
}