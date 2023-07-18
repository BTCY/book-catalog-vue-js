<script setup lang="ts">
import { getBooks } from '@/api/books-service';
import { debounce } from '@/utils/debounce';
import BookSearchList from './BookSearchList.vue';
import Pagination from '@/components/common/pagination/Pagination.vue';
import type { IApiGetBooks } from '@/api/books-service.types';
</script> 


<template>
  <div class="toolbar">
    <div class="search-wrap">
      <input type="text" v-model="keyword" autofocus placeholder="Search..." class="search-input" required>
    </div>
    <div>
      <label for="order">Order by</label>&nbsp;
      <select name="order" v-model="orderBy" @change="search">
        <option value="newest">newest</option>
        <option value="relevance">relevance</option>
      </select>
    </div>
    <div>
      <label for="maxResults">Max results</label>&nbsp;
      <select name="maxResults" v-model="maxResults" @change="search">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>
    </div>
    <div>
      <label for="searchIn">Search in</label>&nbsp;
      <select name="searchIn" v-model="searchIn" @change="search">
        <option value="intitle">Title</option>
        <option value="inauthor">Author</option>
        <option value="inpublisher">Publisher</option>
        <option value="subject">Subject</option>
        <option value="">All</option>
      </select>
    </div>
  </div>

  <BookSearchList :books=books :loadState=loadState :totalItems=totalItems />

  <Pagination v-if="totalItems && totalPages && totalItems > 0" :totalPages=totalPages :perPage=maxResults
    :currentPage="currentPage" @pagechanged="onPageChange" />
</template>


<script lang="ts">
export default {
  name: 'BookSearch',
  data() {
    return {
      currentPage: 1,
      books: undefined as IApiGetBooks | undefined,
      keyword: '',
      orderBy: 'relevance',
      searchIn: 'intitle',
      maxResults: 10,
      loadState: '',
      totalItems: undefined,
      totalPages: undefined
    }
  },
  watch: {
    keyword: debounce(function () {
      this.search()
    }, 500)
  },
  methods: {
    onPageChange(page: any) {
      console.log(page)
      this.currentPage = page;
      this.search();
      window.scrollTo(0, 0);
    },
    search() {
      this.loadState = 'loading'
      getBooks(
        this.searchIn === '' ? this.keyword : `${this.searchIn}:${this.keyword}`,
        this.maxResults,
        this.orderBy,
        (this.currentPage - 1) * this.maxResults
      ).then((response) => {
        this.books = response
        this.totalItems = response?.totalItems ? response?.totalItems : undefined
        this.totalPages = response?.totalItems ? Math.floor(response.totalItems / this.maxResults) : undefined
        this.loadState = 'success'
        console.log(response)
      })
        .catch((error) => {
          console.log(error);
          this.books = undefined;
          this.totalItems = undefined;
          this.totalPages = undefined;
          this.loadState = 'error';
        })
    }
  }
}
</script>


<style scoped>
.toolbar {
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: 47%;
  margin-top: 50px;
  margin-bottom: 50px;
}

.search-wrap {
  margin-bottom: 10px;
  width: 100%;
}

.search-input {
  display: inline-block;
  border: none;
  background-color: #fbfbfb;
  border-bottom: 3px solid #b71c1c;
  width: 100%;
  font-size: 2em;
}

.search-input:focus {
  outline: none;
}
</style>
