<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { getBooks } from '@/api/books-service';
import { debounce } from '@/utils/debounce';
import BookSearchList from './BookSearchList.vue';
import Pagination from '@/components/common/pagination/Pagination.vue';
import type { IApiGetBooks, IApiGetBooksItem } from '@/api/books-service.types';
// onMounted(function () {
//   window.addEventListener("scroll", handleScroll)
// })

// onUnmounted(function () {
//   window.removeEventListener("scroll", handleScroll)
// })

// function handleScroll(e: any) {
//   let element = scrollComponent.value
//   if (element && element.getBoundingClientRect().bottom < window.innerHeight) {
//     this.search()
//   }
// }  
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
    <div>
      <label for="showResults">Show results</label>&nbsp;
      <select name="showResults" v-model="showResults" @change="handleShowResultsOnChange">
        <option value="page">Page by page</option>
        <option value="scroll">Infinite scroll</option>
      </select>
    </div>
  </div>

  <div class="scrolling-component" id="theList" ref="scrollComponent">
    <BookSearchList :books=books :loadState=loadState :totalItems=totalItems />
  </div>

  <Pagination v-if="showResults === 'page' && totalItems && totalPages && totalItems > 0" :totalPages=totalPages
    :perPage=maxResults :currentPage="currentPage" @pagechanged="onPageChange" />
</template>


<script lang="ts">

const scrollComponent = ref<HTMLInputElement | null>(null);
export default {
  name: 'BookSearch',
  data() {
    return {
      currentPage: 1,
      books: [] as IApiGetBooksItem[] | [],
      keyword: '',
      orderBy: 'relevance',
      searchIn: 'intitle',
      showResults: 'page',
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
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleShowResultsOnChange() {
      this.currentPage = 1;
      this.search();
    },
    handleScroll() {
      if (this.loadState === 'loading' || this.showResults === 'page') return;
      console.log(1)
      let element = scrollComponent.value
      if (element && element.getBoundingClientRect().bottom < window.innerHeight) {
        this.search()
      }
    },
    onPageChange(page: any) {
      console.log(page)
      this.currentPage = page;
      this.search();
      window.scrollTo(0, 0);
    },
    search() {
      if (this.keyword.trim() === '') return;

      if (this.showResults === 'scroll') {
        this.currentPage++;
      }
      this.loadState = 'loading';
      getBooks(
        this.searchIn === '' ? this.keyword : `${this.searchIn}:${this.keyword}`,
        this.maxResults,
        this.orderBy,
        (this.currentPage - 1) * this.maxResults
      ).then(
        (response) => {
          this.showResults === 'scroll'
            ? this.books.push(...response?.items || []) || undefined
            : this.books = response?.items || [];
          this.totalItems = response?.totalItems ? response?.totalItems : undefined
          this.totalPages = response?.totalItems ? Math.floor(response.totalItems / this.maxResults) : undefined
          this.loadState = 'success'
          console.log(this.books)
        }
      ).catch(
        (error) => {
          console.log(error);
          this.books = undefined;
          this.totalItems = undefined;
          this.totalPages = undefined;
          this.loadState = 'error';
        }
      )
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
