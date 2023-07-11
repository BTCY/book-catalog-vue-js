import axios from 'axios'
import type { IApiBook, IApiGetBooks } from './books-service.types';

/**
 * @file API: Indexed DB.
 */

const key = "AIzaSyB7fcxmsckIlWDr67JBMLTW3A8Sz0Wrgy4"

/**
 *  API .
 * 
 * @param   {string}   q        The start date of your preferred timeframe. 
 * @return  {Promise<IApiGetBooks>}    Exchange rate history
 */
export const getBooks = (
    q: string,
    maxResults: number = 10,
    orderBy: string = "relevance",
): Promise<IApiGetBooks> =>
    axios.get<IApiGetBooks>(
        "https://www.googleapis.com/books/v1/volumes", {
        params: {
            q,
            key,
            maxResults,
            orderBy
        }
    })
        .then(res => res.data)
        .catch((e: any) => {
            throw e;
        });

/**
 *  API .
 * 
 * @param   {string}   bookId      The start date of your preferred timeframe. 
 * @return  {Promise<IApiBook>}    Exchange rate history
 */
export const getBook = (
    bookId: string,
): Promise<IApiBook> =>
    axios.get<IApiBook>(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`, {
        params: {
            key,
        }
    })
        .then(res => res.data)
        .catch((e: any) => {
            throw e;
        });  