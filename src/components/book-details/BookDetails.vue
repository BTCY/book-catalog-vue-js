<script setup lang="ts">
import DetailsField from '../common/details-field/DetailsField.vue'
</script> 


<template>
  <div class="book-details-wrap" v-if="book !== undefined">

    <div class="book-content-wrap">

      <div class="asaid-wrap">
        <img class="book-image" :src=book?.image>

        <div>
          {{ `${book.printType.title} ${book.printType.value}` }}
          {{ `${book.infoLink.title} ${book.infoLink.value}` }}
          {{ `${book.canonicalVolumeLink.title} ${book.canonicalVolumeLink.value}` }}
          {{ `${book.previewLink.title} ${book.previewLink.value}` }}
          {{ `${book.price.title} ${book.price.value}` }}
          {{ `${book.isEbook.title} ${book.isEbook.value}` }}
        </div>
      </div>

      <div class="info-wrap">
        <h1>{{ book?.title }}</h1>

        <div class="fields-wrap">
          <DetailsField v-for="field in book.details" :key="field.title" :field="field" />
        </div>

        <div v-html="book?.description"></div>

        <div class="fields-wrap">
          <DetailsField v-for="field in book.subDetails" :key="field.title" :field="field" />
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
      console.log(apiBookData);
      return ({
        title: apiBookData.volumeInfo?.title,
        image: apiBookData.volumeInfo?.imageLinks?.thumbnail,
        description: apiBookData.volumeInfo?.description,
        printType: {
          title: "Print type",
          value: apiBookData.volumeInfo?.printType
        },
        infoLink: {
          title: "Info link",
          value: apiBookData.volumeInfo?.infoLink
        },
        canonicalVolumeLink: {
          title: "Canonical volume link",
          value: apiBookData.volumeInfo?.canonicalVolumeLink
        },
        previewLink: {
          title: "Preview link",
          value: apiBookData.volumeInfo?.previewLink
        },
        price: {
          title: "Price",
          value: apiBookData.saleInfo?.listPrice?.amount && apiBookData.saleInfo?.listPrice?.currencyCode
            ? apiBookData.saleInfo.listPrice.amount + apiBookData.saleInfo.listPrice.currencyCode
            : undefined
        },
        isEbook: {
          title: "isEbook",
          value: apiBookData.saleInfo?.isEbook
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
        ].filter(f => f.value),
        subDetails: [
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
            title: "Industry identifiers",
            value: apiBookData.volumeInfo?.industryIdentifiers?.map(i => i.type + ' — ' + i.identifier)
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
            title: "Dimensions",
            value: apiBookData.volumeInfo?.dimensions
          },
        ].filter(f => f.value),
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

 .asaid-wrap {
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
