<script setup lang="ts">
import { getBooks } from '@/api/books-service';
import { debounce } from '@/utils/debounce';
import BookSearchList from './BookSearchList.vue'; 
import type { IApiGetBooks } from '@/api/books-service.types';
</script> 


<template>
  <div class="toolbar">
    <div>
      <input type="text" v-model="keyword" placeholder="Search..." class="input" required>
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
</template>


<script lang="ts">
export default {
  name: 'BookSearch',
  data() {
    return {
      books: undefined as IApiGetBooks | undefined,
      keyword: '',
      orderBy: 'newest',
      maxResults: '500',
      loadState: ''
    }
  },
  watch: {
    keyword: debounce(function () {
      this.search()
    }, 500)
  },
  methods: {
    search() {
      this.loadState = 'loading'
      getBooks(this.keyword)
        .then((response) => {
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
}

.input {
  border: none;
  background-color: #fbfbfb;
  border-bottom: 3px solid #b71c1c;
}
</style>
