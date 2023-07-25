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
      <div class="book-content-wrap">

        <div class="thumbnail-wrap">
          <img class="book-thumbnail" :src=book.volumeInfo?.imageLinks?.thumbnail>
        </div>

        <div class="info-wrap">
          <h3 class="title">
            <RouterLink :to="{ name: 'book', params: { bookId: book.id } }" class="title-link">
              {{ book.volumeInfo?.title }}
            </RouterLink>
          </h3>
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
  name: 'BookSearchList',
  template: '#dookSearchList',
}
</script> 


<style scoped> ul {
   list-style-type: none;
   padding: 0px;
 }

 li {
   height: 200px;
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

 .thumbnail-wrap {
   display: inline-block;
 }

 .book-thumbnail {
   height: auto;
   max-height: 200px;
   width: 100%;
   max-width: 128px;
   margin-top: 0px;
   left: 0px;
   border-radius: 4px;
 }

 .info-wrap {
   display: inline-block;
 }

 .title {
   font-size: 1.5em;
   margin: -6px 0px 15px;
   line-height: 1.5em;
   width: 100%;
   overflow: hidden;
   display: -webkit-box;
   -webkit-line-clamp: 1;
   -webkit-box-orient: vertical;
 }

 .title-link {
   color: #000000;
   text-decoration: none;
   transition: all 250ms ease;
 }

 .title-link:hover {
   color: #0000b3;
   text-decoration: none;
 }

 .info-description {
   width: 100%;
   line-height: 1.2em;
   color: #616161;
   overflow: hidden;
   display: -webkit-box;
   -webkit-line-clamp: 6;
   -webkit-box-orient: vertical;
   margin: 0px;
   font-size: 0.875em;
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
