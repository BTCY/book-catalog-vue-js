<script setup lang="ts">
import BookDetailsField from './BookDetailsField.vue'
</script> 


<template>
  <div class="book-details-wrap" v-if="book !== undefined">

    <div class="book-content-wrap">

      <div class="book-image-wrap">
        <img class="book-image" :src=book?.image>
      </div>

      <div class="info-wrap">
        <h1>{{ book?.title }}</h1>

        <div class="fields-wrap">
          <BookDetailsField v-for="field in book.details" :key="field.title" :field="field" />
        </div>

        <div contenteditable="true" v-html="book?.description"></div>

        <div class="fields-wrap">
          <BookDetailsField v-for="field in book.subDetails" :key="field.title" :field="field" />
        </div>
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
        "title": apiBookData.volumeInfo?.title,
        "image": apiBookData.volumeInfo?.imageLinks?.thumbnail,
        "description": apiBookData.volumeInfo?.description,

        //       readingModes:
        //       image - {{ apiBookData.volumeInfo?.readingModes?.image }
        //     }  
        //         text - {{ apiBookData.volumeInfo?.readingModes?.text }}
        // saleInfo:
        // isEbook - {{ apiBookData.saleInfo?.isEbook }}
        // amount - {{ apiBookData.saleInfo?.listPrice?.amount }}
        // currencyCode - {{ apiBookData.saleInfo?.listPrice?.currencyCode }}  
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
        ].filter(f => f.value),
        subDetails: [
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
        ].filter(f => f.value)
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
        }
        this.loadState = 'success'
      })
      .catch((error: any) => console.log(error))
  }
}
</script>

<style scoped> .book-details-wrap {
   margin-bottom: 30px;
   background-color: #ffffff;
   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
   border-radius: 10px;
 }

 .book-content-wrap {
   display: grid;
   grid-template-columns: 180px auto;
 }

 .book-content-wrap h1 {
   margin: 0px 0px 24px;
 }

 .book-image-wrap {
   padding: 20px;
 }

 .book-image {
   max-width: 180px;
 }

 .info-wrap {
   padding: 20px;
 }

 .fields-wrap {
   padding: 10px 5px;
   display: grid;
   grid-template-columns: 50% auto;
 }
</style>
