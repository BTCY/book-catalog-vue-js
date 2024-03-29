<script setup lang="ts">
import { ref } from "vue";
import { getBooks } from "@/api/books-service";
import { debounce } from "@/utils/debounce";
import type { IApiGetBooksItem } from "@/api/books-service.types";
import BookSearchToolbar from "./BookSearchToolbar.vue";
import BookSearchList from "./BookSearchList.vue";
import BookSearchPagination from "./BookSearchPagination.vue";
</script> 


<template>
  <BookSearchToolbar :keyword=keyword :orderBy=orderBy :searchIn=searchIn :showResults=showResults :maxResults=maxResults
    @searchparamchange="onSearchParamChange" />

  <div class="scrolling-component" id="theList" ref="scrollComponent">
    <BookSearchList :books=books :loadState=loadState :totalItems=totalItems :showResults=showResults
      :isHasNextPage=isHasNextPage />
  </div>

  <BookSearchPagination
    v-if="(showResults === 'page' && loadState === 'success' && books.length > maxResults - 1) && totalItems && totalPages && totalItems > 0"
    :totalPages="totalPages" :currentPage="currentPage" @pagechanged="onPageChange" />
</template>


<script lang="ts">
const scrollComponent = ref<HTMLInputElement | null>(null);
export default {
  name: "BookSearch",
  data() {
    return {
      currentPage: 1,
      books: [] as IApiGetBooksItem[] | [],
      keyword: "",
      orderBy: "relevance",
      searchIn: "intitle",
      showResults: "page",
      maxResults: 10,
      loadState: "",
      totalItems: undefined,
      totalPages: undefined,
      isHasNextPage: true,
    }
  },
  watch: {
    keyword: debounce(function () {
      this.loadState = "loading";
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
    handleScroll() {
      if (this.loadState === "loading" || this.showResults === "page") return;

      const element = scrollComponent.value;
      if (element && element.getBoundingClientRect().bottom < window.innerHeight + 600) {
        this.isHasNextPage = (this.maxResults * this.currentPage) <= this.totalItems;
        if (this.isHasNextPage) {
          this.currentPage++;
          this.search();
        }
      }
    },
    onPageChange(page: number) {
      this.currentPage = page;
      this.search();
      window.scrollTo(0, 0);
    },
    onSearchParamChange(field: string, value: number | string) {
      this[field] = value;
      this.currentPage = 1;
      this.isHasNextPage = true;
      if (field !== "keyword") {
        this.books = [];
        this.search();
      }
      if (field === "keyword" && this.showResults === "scroll") {
        this.books = [];
      }
      window.scrollTo(0, 0);
    },
    search() {
      if (this.keyword.trim() === "") {
        this.loadState = "";
        return
      };

      this.loadState = "loading";
      getBooks(
        this.searchIn === "" ? this.keyword : `${this.searchIn}:${this.keyword}`,
        this.maxResults,
        this.orderBy,
        (this.currentPage - 1) * this.maxResults
      ).then(
        (response) => {
          this.showResults === "scroll"
            ? this.books.push(...response?.items || [])
            : this.books = response?.items || [];
          this.totalItems = response?.totalItems
            ? response.totalItems
            : undefined;
          this.totalPages = response?.totalItems
            ? Math.ceil(response.totalItems / this.maxResults)
            : undefined;
          this.loadState = "success";
        }
      ).catch(
        (error) => {
          console.log(error);
          this.books = undefined;
          this.totalItems = undefined;
          this.totalPages = undefined;
          this.loadState = "error";
        }
      )
    }
  }
}
</script> 
