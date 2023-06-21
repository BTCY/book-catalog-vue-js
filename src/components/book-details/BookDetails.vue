<script setup lang="ts">
</script> 


<template>
  <div class="book-div-wrap" v-if="book !== undefined">

    <h1>{{ book.volumeInfo?.title }}</h1>
    <div class="book-content-wrap">

      <div class="thumbnail-wrap">
        <img class="book-thumbnail" :src=book.volumeInfo?.imageLinks?.thumbnail>
      </div>

      <div class="text-wrap">
        id: {{ book.id }}<br />
        categories: {{ book.volumeInfo?.categories?.map(c => c) }}<br />
        description: {{ book.volumeInfo?.description }}<br />
        publisher: {{ book.volumeInfo?.publisher }}<br />
        publishedDate: {{ book.volumeInfo?.publishedDate }}<br />
        printedPageCount: {{ book.volumeInfo?.printedPageCount }}<br />
        printType: {{ book.volumeInfo?.printType }}<br />
        previewLink: {{ book.volumeInfo?.previewLink }}<br />
        industryIdentifiers: {{ book.volumeInfo?.industryIdentifiers?.map(i => i) }}<br />
        maturityRating: {{ book.volumeInfo?.maturityRating }}<br />
        language: {{ book.volumeInfo?.language }}<br />
        infoLink: {{ book.volumeInfo?.infoLink }}<br />
        imageLinksMedium: {{ book.volumeInfo?.imageLinks?.medium }}<br />
        dimensions: {{ book.volumeInfo?.dimensions }}<br />
        canonicalVolumeLink: {{ book.volumeInfo?.canonicalVolumeLink }}<br />
        authors: {{ book.volumeInfo?.authors?.map(a => a) }}<br />
        readingModes:
        image - {{ book.volumeInfo?.readingModes?.image }} <br />
        text - {{ book.volumeInfo?.readingModes?.text }}<br />
        saleInfo:
        isEbook - {{ book.saleInfo?.isEbook }}<br />
        amount - {{ book.saleInfo?.listPrice?.amount }}<br />
        currencyCode - {{ book.saleInfo?.listPrice?.currencyCode }}<br />
        <br />
        <RouterLink :to="{ name: 'book', params: { bookId: book.id } }">More</RouterLink>
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
      book: undefined as undefined | IApiBook,
      loadState: ''
    }
  },
  // methods: {  }, 
  mounted() {
    const route = useRoute()
    const bookId = route.params.bookId as string
    this.loadState = 'loading'
    getBook(bookId)
      .then(response => {
        this.book = response
        this.loadState = 'success'
        console.log(response)
      })
      .catch((error: any) => console.log(error))
  }
}
</script>

<style scoped> .book-div-wrap {
   padding: 20px;
   margin-bottom: 30px;
   background-color: #ffffff;
   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
   border-radius: 10px;
 }
</style>
