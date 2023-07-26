<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
        First
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
        Previous
      </button>
    </li>

    <li v-for="page in pages" :key="page.name" class="pagination-item">
      <button type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }">
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
        Last
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'BookSearchPagination',
  template: '#bookSearchPagination',
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 10
    },
    totalPages: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;

    },
    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page: number) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive(page: number) {
      return this.currentPage === page;
    },
  }
}
</script>

<style>
.pagination {
  list-style-type: none;
  text-align: center;
  font-size: 1.25em;
}

.pagination-item {
  display: inline-block;
  margin: 0px 2px;
}

.pagination-item>button {
  min-width: 35px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 250ms ease;
  background-color: #ebebeb;
  border: none;
  cursor: pointer;
}

.pagination-item>button:hover {
  background-color: #cccccc;
}

button.active {
  color: #ffffff;
  background-color: #922d2d;
}

button.active:hover {
  color: #ffffff;
  background-color: #922d2d;
  cursor: default;
}
</style>