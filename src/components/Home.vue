<script setup lang="ts">
</script> 


<template>
  <div class="greetings">
    <div class="query">
      <form @submit.prevent="search">
        <div>
          <input type="text" v-model="keyword" placeholder="Search..." class="input" required>
          <input type="submit" value="Search" class="button">
        </div>
        <div>
          <label for="order">Order by</label>&nbsp;
          <select name="order" v-model="orderBy" @change="search">
            <option value="newest">newest</option>
            <option value="relevance">relevance</option>
          </select>
        </div>
      </form>
    </div>

    <div class="col-md-12">
      <ul>
        <li v-for="book in books.items" :key="book.id" class="list-group-item">
          <h3>{{ book.volumeInfo.title }}</h3>
          <div class="book-content-wrap">
            <img class="book-thumbnail" :src=book.volumeInfo?.imageLinks?.thumbnail>
            <strong>{{ book.volumeInfo.subtitle }}</strong>
            <RouterLink :to="{ name: 'book', params: { bookId: book.id } }">About</RouterLink>
            <br />
            {{ book.volumeInfo.description }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
import { getBooks } from '@/api/books-service';

interface AnimalFacts {
  text: string
}

export default {
  name: 'AnimalFacts',
  data() {
    return {
      books: [] as any,
      keyword: '',
      orderBy: 'newest',
      maxResults: '10',
      loadState: ''
    }
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
  },

  mounted() {
    // getBook('V0NCAAAAIAAJ')
    //   .then((response: any) => {
    //     console.log(response)
    //   })
    //   .catch((error: any) => console.log(error))

  }
}
</script>


<style scoped> h1 {
   font-weight: 500;
   font-size: 2.6rem;
   top: -10px;
 }

 .book-content-wrap {
   position: relative;
   padding: 10px 10px 10px 138px;
 }

 .book-thumbnail {
   position: absolute;
   top: 10px;
   left: 0px;
 }

 .input {
   border: none;
   border-bottom: 3px solid #b71c1c;
 }
</style>
