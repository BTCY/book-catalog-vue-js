<script setup lang="ts">
</script> 


<template>
  <div class="book-details-wrap" v-if="book !== undefined">

    <div class="book-content-wrap">

      <div class="thumbnail-wrap">
        <img class="book-thumbnail" :src=book?.main?.image>
      </div>

      <div class="text-wrap">
        <h1>{{ book?.main?.title }}</h1>
      </div>

    </div>
  </div>
</template>



<script lang="ts">
import { useRoute } from 'vue-router'
import { getBook } from '@/api/books-service';
import type { IApiBook } from '@/api/books-service.types';

export default {
  name: 'BookDetails',
  data() {
    return {
      book: undefined as undefined | any,
      loadState: ''
    }
  },
  methods: {
    bookDataAdapter(apiBookData: IApiBook) {
      return ({
        main: {
          "title": apiBookData.volumeInfo?.title,
          "image": apiBookData.volumeInfo?.imageLinks?.thumbnail,

          //       readingModes:
          //       image - {{ apiBookData.volumeInfo?.readingModes?.image }
          //     }  
          //         text - {{ apiBookData.volumeInfo?.readingModes?.text }}
          // saleInfo:
          // isEbook - {{ apiBookData.saleInfo?.isEbook }}
          // amount - {{ apiBookData.saleInfo?.listPrice?.amount }}
          // currencyCode - {{ apiBookData.saleInfo?.listPrice?.currencyCode }} 
        },
        details: [
          {
            title: "Authors",
            value: apiBookData.volumeInfo?.authors
          },
          {
            title: "Categories",
            value: apiBookData.volumeInfo?.categories
          },
          {
            title: "Publisher",
            value: apiBookData.volumeInfo?.publisher
          },
          {
            title: "Published date",
            value: apiBookData.volumeInfo?.publishedDate
          },
          {
            title: "Description",
            value: apiBookData.volumeInfo?.description
          },
          {
            title: "Page count",
            value: apiBookData.volumeInfo?.printedPageCount
          },
          {
            title: "Print type",
            value: apiBookData.volumeInfo?.printType
          },
          {
            title: "Preview link",
            value: apiBookData.volumeInfo?.previewLink
          },
          {
            title: "Industry identifiers",
            value: apiBookData.volumeInfo?.industryIdentifiers
          },
          {
            title: "Maturity rating",
            value: apiBookData.volumeInfo?.maturityRating
          },
          {
            title: "Language",
            value: apiBookData.volumeInfo?.language
          },
          {
            title: "Info link",
            value: apiBookData.volumeInfo?.infoLink
          },
          {
            title: "Dimensions",
            value: apiBookData.volumeInfo?.dimensions
          },
          {
            title: "Canonical volume link",
            value: apiBookData.volumeInfo?.canonicalVolumeLink
          },
        ]
      })
    }
  },
  mounted() {
    const route = useRoute()
    const bookId = route.params.bookId as string
    this.loadState = 'loading'
    getBook(bookId)
      .then(response => {
        if (response !== undefined) {
          this.book = this.bookDataAdapter(response);
          // this.book = JSON.parse(
          //   JSON.stringify(this.bookDataAdapter(response))
          // )
          // console.log(this.book)
        }
        this.loadState = 'success'
      })
      .catch((error: any) => console.log(error))
  }
}
</script>

<style scoped> .book-details-wrap {
   padding: 20px;
   margin-bottom: 30px;
   background-color: #ffffff;
   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
   border-radius: 10px;
 }

 .book-content-wrap {
   display: grid;
   grid-template-columns: 160px auto;
 }
</style>
