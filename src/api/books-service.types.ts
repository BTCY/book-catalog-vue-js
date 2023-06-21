/**
 * @file API Types: books.
 * 
 * {@link https://developers.google.com/books/docs/v1/using?hl=ru#PerformingSearch API}
 */


/**
 * Get books.
 * 
 * @interface IApiGetBooks
 */
export interface IApiGetBooks {
    kind?: string;
    totalItems?: number;
    items?: {
        kind?: string;
        id?: string;
        etag?: string;
        selfLink?: string;
        volumeInfo?: {
            title?: string;
            authors?: string[];
            publishedDate?: string;
            industryIdentifiers?: {
                type?: string;
                identifier?: string;
            }[];
            readingModes?: {
                text?: boolean;
                image?: boolean;
            };
            pageCount?: number;
            printType?: string;
            maturityRating?: string;
            allowAnonLogging?: boolean;
            contentVersion?: string;
            panelizationSummary?: {
                containsEpubBubbles?: boolean;
                containsImageBubbles?: boolean;
            };
            imageLinks?: {
                smallThumbnail?: string;
                thumbnail?: string;
            };
            language?: string;
            previewLink?: string;
            infoLink?: string;
            canonicalVolumeLink?: string;
            subtitle?: string;
            publisher?: string;
            description?: string;
            categories?: string[];
            averageRating?: number;
            ratingsCount?: number;
        };
        saleInfo?: {
            country?: string;
            saleability?: string;
            isEbook?: boolean;
            listPrice?: {
                amount?: number;
                currencyCode?: string;
            };
            retailPrice?: {
                amount?: number;
                currencyCode?: string;
            };
            buyLink?: string;
            offers?: {
                finskyOfferType?: number;
                listPrice?: {
                    amountInMicros?: number;
                    currencyCode?: string;
                };
                retailPrice?: {
                    amountInMicros?: number;
                    currencyCode?: string;
                };
            }[];
        };
        accessInfo?: {
            country?: string;
            viewability?: string;
            embeddable?: boolean;
            publicDomain?: boolean;
            textToSpeechPermission?: string;
            epub?: {
                isAvailable?: boolean;
                acsTokenLink?: string;
            };
            pdf?: {
                isAvailable?: boolean;
            };
            webReaderLink?: string;
            accessViewStatus?: string;
            quoteSharingAllowed?: boolean;
        };
        searchInfo?: {
            textSnippet?: string;
        };
    }[];
}


/**
 * Book info.
 * 
 * @interface IApiBook 
 */
export interface IApiBook {
    kind?: string;
    id: string;
    etag: string;
    selfLink?: string;
    volumeInfo?: {
        title?: string;
        authors?: string[];
        publisher?: string;
        publishedDate?: string;
        description?: string;
        industryIdentifiers?: {
            type?: string;
            identifier?: string;
        }[];
        readingModes?: {
            text?: boolean;
            image?: boolean;
        };
        pageCount?: number;
        printedPageCount?: number;
        printType?: string;
        categories?: string[];
        maturityRating?: string;
        allowAnonLogging?: boolean;
        contentVersion?: string;
        panelizationSummary?: {
            containsEpubBubbles?: boolean;
            containsImageBubbles?: boolean;
        };
        imageLinks?: {
            smallThumbnail?: string;
            thumbnail?: string;
            small?: string;
            medium?: string;
            large?: string;
            extraLarge?: string;
        };
        language?: string;
        previewLink?: string;
        infoLink?: string;
        canonicalVolumeLink?: string;
        dimensions?: {
            height?: string;
        };
    };
    layerInfo?: {
        layers?: {
            layerId?: string;
            volumeAnnotationsVersion?: string;
        }[];
    };
    saleInfo?: {
        country?: string;
        saleability?: string;
        isEbook?: boolean;
        listPrice?: {
            amount?: number;
            currencyCode?: string;
        };
        retailPrice?: {
            amount?: number;
            currencyCode?: string;
        };
        buyLink?: string;
        offers?: {
            finskyOfferType?: number;
            listPrice?: {
                amountInMicros?: number;
                currencyCode?: string;
            };
            retailPrice?: {
                amountInMicros?: number;
                currencyCode?: string;
            };
        }[];
    };
    accessInfo?: {
        country?: string;
        viewability?: string;
        embeddable?: boolean;
        publicDomain?: boolean;
        textToSpeechPermission?: string;
        epub?: {
            isAvailable?: boolean;
            acsTokenLink?: string;
        };
        pdf?: {
            isAvailable?: boolean;
        };
        webReaderLink?: string;
        accessViewStatus?: string;
        quoteSharingAllowed?: boolean;
    };
}

