import axios from 'axios'

/**
 * @file API: Indexed DB.
 */

const key = "AIzaSyB7fcxmsckIlWDr67JBMLTW3A8Sz0Wrgy4"

/**
 *  API .
 * 
 * @param   {string}   start_date        The start date of your preferred timeframe. 
 * @return  {any}    Exchange rate history
 */
export const getBooks = (
    q: string,
): Promise<any> =>
    axios.get<any>(
        "https://www.googleapis.com/books/v1/volumes", {
        params: {
            q,
            key,
        }
    })
        .then((res: any) => res.data)
        .catch((e: any) => {
            throw e;
        });

/**
 *  API .
 * 
 * @param   {string}   start_date        The start date of your preferred timeframe. 
 * @return  {any}    Exchange rate history
 */
export const getBook = (
    bookId: string,
): Promise<any> =>
    axios.get<any>(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`, {
        params: {
            key,
        }
    })
        .then((res: any) => res.data)
        .catch((e: any) => {
            throw e;
        });  