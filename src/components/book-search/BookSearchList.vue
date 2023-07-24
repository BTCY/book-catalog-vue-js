<script setup lang="ts">
import type { IApiGetBooksItem } from '@/api/books-service.types';

defineProps<{
  books: IApiGetBooksItem[] | undefined,
  loadState: string,
  totalItems: number | undefined,
  showResults: string,
  isHasNextPage: boolean,
}>() 
</script> 


<template>
  <ul
    v-if="((loadState === 'success' && showResults === 'page') || showResults === 'scroll') && books && books.length > 0">
    <li v-for="book in books" :key="book.id">
      <h3>{{ book.volumeInfo?.title }}</h3>
      <div class="book-content-wrap">

        <div class="thumbnail-wrap">
          <img class="book-thumbnail" :src=book.volumeInfo?.imageLinks?.thumbnail>
        </div>

        <div class="info-wrap">
          <p class="info-description">{{ book.volumeInfo?.description }}</p>

          <div class="info-footer">
            <RouterLink :to="{ name: 'book', params: { bookId: book.id } }">More</RouterLink>
          </div>
        </div>

      </div>
    </li>
  </ul>

  <ul v-if="loadState === 'loading'">
    <li v-for="i in  Array(12).fill(0)" :key="i"> </li>
  </ul>

  <div class="end-of-list" v-if="showResults === 'scroll' && loadState === 'success' && isHasNextPage === false">
    End of list
  </div>

  <div class="no-found" v-if="loadState === 'success' && totalItems === undefined">
    No results found
  </div>

  <div class="error" v-if="loadState === 'error'">
    Error
  </div>
</template> 


<script lang="ts">
export default {
  name: 'BookSearchList'
}
</script> 


<style scoped> ul {
   list-style-type: none;
   padding: 0px;
 }

 li {
   height: 250px;
   padding: 20px;
   margin-bottom: 30px;
   background-color: #ffffff;
   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
   border-radius: 10px;
 }

 h3 {
   font-size: 1.5em;
   margin: 0px 0px 20px;
   line-height: 1.5em;
   width: 100%;
   overflow: hidden;
   display: -webkit-box;
   -webkit-line-clamp: 1;
   -webkit-box-orient: vertical;
 }

 .book-content-wrap {
   display: grid;
   grid-template-columns: 160px auto;
 }

 .thumbnail-wrap {
   display: inline-block;
 }

 .info-wrap {
   display: inline-block;
 }

 .info-description {
   width: 100%;
   overflow: hidden;
   display: -webkit-box;
   -webkit-line-clamp: 9;
   -webkit-box-orient: vertical;
   margin: 0px;
   font-size: 0.875em;
 }

 .book-thumbnail {
   top: 10px;
   left: 0px;
 }

 .end-of-list {
   text-align: center;
   font-size: 1em;
   color: #999999;
 }

 .no-found {
   text-align: center;
   font-size: 2em;
 }

 .error {
   text-align: center;
   font-size: 2em;
   color: tomato;
 }
</style>
