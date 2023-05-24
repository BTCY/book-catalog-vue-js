import axios from 'axios'

/**
 * @file API: Indexed DB.
 */

const headers = {
    // "key": "AIzaSyB7fcxmsckIlWDr67JBMLTW3A8Sz0Wrgy4", 
}

/**
 *  API .
 * 
 * @param   {string}   start_date        The start date of your preferred timeframe. 
 * @return  {any}    Exchange rate history
 */
export const getBooks = (
    start_date?: string,
): Promise<any> =>
    axios.get<any>( 
        "https://www.googleapis.com/books/v1/volumes?q=quilting", { 
        // params: { id: "buc0AAAAMAAJ", dq: "holmes", as_brr: 4, source: "webstore_bookcard" }
    })
        .then((res: any) => res.data)
        .catch((e: any) => {
            throw e;
        }); 