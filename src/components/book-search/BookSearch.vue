<script setup lang="ts">
import { getBooks } from '@/api/books-service';
import { debounce } from '@/utils/debounce';
import BookSearchList from './BookSearchList.vue';
import type { IApiGetBooks } from '@/api/books-service.types';
</script> 


<template>
  <div class="toolbar">
    <div class="search-wrap">
      <input type="text" v-model="keyword" autofocus  placeholder="Search..." class="search-input" required>
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
