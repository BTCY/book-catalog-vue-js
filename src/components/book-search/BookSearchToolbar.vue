<template>
  <div class="toolbar">
    <div class="search-wrap">
      <input type="text" v-model="keywordLocal" autofocus placeholder="Search..." class="search-input" required>
    </div>
    <div>
      <label for="order">Order by</label>&nbsp;
      <select name="order" v-model="orderByLocal">
        <option value="newest">newest</option>
        <option value="relevance">relevance</option>
      </select>
    </div>
    <div>
      <label for="maxResults">Max results</label>&nbsp;
      <select name="maxResults" v-model="maxResultsLocal">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>
    </div>
    <div>
      <label for="searchIn">Search in</label>&nbsp;
      <select name="searchIn" v-model="searchInLocal">
        <option value="intitle">Title</option>
        <option value="inauthor">Author</option>
        <option value="inpublisher">Publisher</option>
        <option value="subject">Subject</option>
        <option value="">All</option>
      </select>
    </div>
    <div>
      <label for="showResults">Show results</label>&nbsp;
      <select name="showResults" v-model="showResultsLocal">
        <option value="page">Page by page</option>
        <option value="scroll">Infinite scroll</option>
      </select>
    </div>
  </div>
</template>


<script lang="ts">
export default {
  name: 'BookSearchToolbar',
  template: '#bookSearchToolbar',
  props: {
    keyword: {
      type: String,
      required: false,
    },
    orderBy: {
      type: String,
      required: false,
    },
    searchIn: {
      type: String,
      required: false,
    },
    showResults: {
      type: String,
      required: false,
    },
    maxResults: {
      type: Number,
      required: false,
    },
  },
  computed: {
    keywordLocal: {
      get: function () {
        return this.keyword
      },
      set: function (value: any) {
        this.$emit('searchparamchange', 'keyword', value)
      }
    },
    orderByLocal: {
      get: function () {
        return this.orderBy
      },
      set: function (value: any) {
        this.$emit('searchparamchange', 'orderBy', value)
      }
    },
    maxResultsLocal: {
      get: function () {
        return this.maxResults
      },
      set: function (value: any) {
        this.$emit('searchparamchange', 'maxResults', Number(value))
      }
    },
    searchInLocal: {
      get: function () {
        return this.searchIn
      },
      set: function (value: any) {
        this.$emit('searchparamchange', 'searchIn', value)
      }
    },
    showResultsLocal: {
      get: function () {
        return this.showResults
      },
      set: function (value: any) {
        this.$emit('searchparamchange', 'showResults', value)
      }
    }
  },
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
