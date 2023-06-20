<script setup lang="ts">
import { getBooks } from '@/api/books-service';
import { debounce } from '@/utils/debounce';
import BookSearchList from './BookSearchList.vue'; 
</script> 


<template>
  <div class="toolbar">
    <!-- <form @submit.prevent="search"> -->
    <div>
      <!-- <input type="text" v-model="keyword" placeholder="Search..." class="input" required> -->
      <input type="text" v-model="keyword" placeholder="Search..." class="input" required>
      <div>Value: {{ debouncedKeyword }}</div>
      <!-- <input type="submit" value="Search" class="button"> -->
    </div>
    <div>
      <label for="order">Order by</label>&nbsp;
      <select name="order" v-model="orderBy" @change="search">
        <option value="newest">newest</option>
        <option value="relevance">relevance</option>
      </select>
    </div>
    <!-- </form> -->
  </div>

  <BookSearchList :books=books />
</template>


<script lang="ts">
export default {
  name: 'BookSearch',
  data() {
    return {
      books: [] as any,
      keyword: '',
      debouncedKeyword: '',
      orderBy: 'newest',
      maxResults: '10',
      loadState: ''
    }
  },
  watch: {
    keyword: debounce(function (newVal) {
      console.log(newVal)
    }, 500)
  },
  methods: {
    search() {
      this.loadState = 'loading'
      console.log(123)
      // getBooks(this.keyword)
      //   .then((response) => {
      //     this.books = response
      //     this.loadState = 'success'
      //     console.log(response)
      //   })
      //   .catch((error) => console.log(error))
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
