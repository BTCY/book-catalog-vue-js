<script setup lang="ts">
import type { IApiGetBooksItem } from "@/api/books-service.types";
import DetailsField from "./DetailsField.vue";

defineProps<{
  books: IApiGetBooksItem[] | undefined,
  loadState: string,
  totalItems: number | undefined,
  showResults: string,
  isHasNextPage: boolean,
}>();
</script> 


<template>
  <ul
    v-if="((loadState === 'success' && showResults === 'page') || showResults === 'scroll') && books && books.length > 0">

    <li v-for="book in books" :key="book.id">
      <div class="book-content-wrap">

        <div class="thumbnail-wrap">
          <img v-if="book.volumeInfo?.imageLinks?.thumbnail" class="book-thumbnail"
            :src=book.volumeInfo?.imageLinks?.thumbnail>
          <div v-else class="book-thumbnail-no-pic">no picture</div>
        </div>

        <div class="info-wrap">

          <h3 class="title">
            <RouterLink :to="{ name: 'book', params: { bookId: book.id } }" class="title-link">
              {{ book.volumeInfo?.title }}
            </RouterLink>
          </h3>

          <p v-if="book.volumeInfo?.description" class="info-description">{{ book.volumeInfo?.description }}</p>
          <p v-else class="info-description-no-desc">no description</p>

          <div class="info-footer">
            <DetailsField :field="{ title: 'Published', value: book?.volumeInfo?.publishedDate }" />
            <DetailsField :field="{ title: 'Language', value: book?.volumeInfo?.language }" />
            <RouterLink :to="{ name: 'book', params: { bookId: book.id } }" class="info-show-details-link">
              Show details
            </RouterLink>
          </div>

        </div>

      </div>
    </li>

  </ul>

  <ul v-if="loadState === 'loading'">
    <li v-for="i in Array(12).fill(0)" :key="i">
      <div class="book-content-wrap skeleton-mobile">

        <div class="thumbnail-wrap">
          <div class="book-thumbnail skeleton">&nbsp;</div>
        </div>

        <div class="info-wrap skeleton">
          &nbsp;
        </div>

      </div>
    </li>
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
  name: "BookSearchList",
  template: "#dookSearchList",
}
</script> 


<style scoped> ul {
   list-style-type: none;
   padding: 0px;
 }

 li {
   display: grid;
   grid-template-rows: 1fr;
   height: 200px;
   padding: 20px;
   margin-bottom: 30px;
   background-color: #ffffff;
   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
   border-radius: 10px;
   overflow: hidden;
 }

 .book-content-wrap {
   display: grid;
   grid-template-columns: 160px auto;
 }

 .thumbnail-wrap {
   overflow: hidden;
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

 .book-thumbnail-no-pic {
   display: flex;
   height: 200px;
   width: 128px;
   margin-top: 0px;
   left: 0px;
   border-radius: 4px;
   background-color: #F4F4F4;
   font-size: 0.875em;
   color: #aaaaaa;
   justify-content: center;
   align-items: center;
 }

 .info-wrap {
   position: relative;
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

 .info-description-no-desc {
   width: 100%;
   line-height: 1.2em;
   color: #aaaaaa;
   overflow: hidden;
   font-size: 0.875em;
 }

 .info-footer {
   display: grid;
   grid-template-columns: 110px 110px auto;
   grid-template-rows: 38px;
   position: absolute;
   width: 100%;
   bottom: 0px;
   border-top: 1px solid #ebebeb;
   margin-top: 10px;
   padding-top: 10px;
 }

 .info-footer>.field-wrap {
   padding: 0px;
   margin: 0px;
 }

 .info-show-details-link {
   position: absolute;
   top: 10px;
   right: 0px;
   padding: 10px;
   text-decoration: none;
   transition: all 250ms ease;
   font: .85em sans-serif;
   text-transform: uppercase;
   border: 1px solid #616161;
   border-radius: 5px;
   color: #000000;
 }

 .info-show-details-link:hover {
   border-color: #0000b3;
   color: #0000b3;
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

 .skeleton {
   height: 100%;
   width: 100%;
   background-color: #F4F4F4;
   border-radius: 5px;
 }

 @media (max-width: 600px) {
   li {
     display: block;
     height: 490px;
     position: relative;
   }

   .book-content-wrap {
     display: block;
     position: static;
   }

   .thumbnail-wrap {
     display: flex;
     height: 200px;
     justify-content: center;
     margin-bottom: 30px;
   }

   .info-wrap {
     position: static;
     height: 260px;
   }

   .info-footer {
     display: block;
     left: 0px;
     right: 0px;
     bottom: 0px;
     margin-top: 10px;
     padding: 10px 20px 35px;
     box-sizing: border-box;
   }

   .info-footer>.field-wrap {
     display: inline-block;
     width: 50%;
   }

   .info-footer>.field-wrap:last-of-type {
     text-align: right;
   }

   .info-show-details-link {
     box-sizing: border-box;
     position: relative;
     display: block;
     text-align: center;
     width: 100%;
     top: 15px;
     right: 0px;
   }
 }
</style>
