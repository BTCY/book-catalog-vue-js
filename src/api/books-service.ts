import axios from "axios"
import type { IApiBook, IApiGetBooks } from "./books-service.types";

/**
 * @file API: Google Book API.
 * 
 * {@link https://developers.google.com/books/docs/v1/using?hl=ru#PerformingSearch API}
 */


const key = "AIzaSyB7fcxmsckIlWDr67JBMLTW3A8Sz0Wrgy4"


/**
 *  API: get found books.
 * 
 * @param   {string}   q               Search word 
 * @param   {number}   maxResults      Maximum number of results
 * @param   {string}   orderBy         Sort type
 * @param   {number}   startIndex      Show result starting from index
 * @return  {Promise<IApiGetBooks>}    Search results
 */
export const getBooks = (
    q: string,
    maxResults: number = 10,
    orderBy: string = "relevance",
    startIndex: number = 0
): Promise<IApiGetBooks> =>
    axios.get<IApiGetBooks>(
        "https://www.googleapis.com/books/v1/volumes", {
        params: {
            q,
            key,
            maxResults,
            orderBy,
            startIndex
        }
    })
        .then(res => res.data)
        .catch((e: any) => {
            throw e;
        });


/**
 *  API: get detailed information on the selected book.
 * 
 * @param   {string}   bookId      Book ID
 * @return  {Promise<IApiBook>}    Detailed information about the book
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