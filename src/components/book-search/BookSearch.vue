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
  </div>

  <BookSearchList :books=books />
  <Pagination :totalPages="10" :perPage="10" :currentPage="currentPage" @pagechanged="onPageChange" />
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
      maxResults: 10,
      loadState: ''
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
      window.scrollTo(0,0);
    },
    search() {
      this.loadState = 'loading'
      getBooks(
        this.keyword,
        this.maxResults,
        this.orderBy,
        (this.currentPage - 1) * this.maxResults
      ).then((response) => {
        this.books = response
        this.loadState = 'success'
        console.log(response)
      })
        .catch((error) => console.log(error))
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
