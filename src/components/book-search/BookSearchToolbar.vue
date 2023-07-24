<template>
  <div class="toolbar">
    <div class="search-wrap">
      <input type="text" v-model="keywordLocal" autofocus placeholder="Search..." class="search-input" required>
    </div>
    <div class="params-wrap">
      <div class="param">
        <label for="order" class="param-label">Order by</label>&nbsp;
        <select name="order" v-model="orderByLocal" class="param-select">
          <option value="newest">newest</option>
          <option value="relevance">relevance</option>
        </select>
      </div>
      <div class="param">
        <label for="maxResults" class="param-label">Max results</label>&nbsp;
        <select name="maxResults" v-model="maxResultsLocal" class="param-select">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
        </select>
      </div>
      <div class="param">
        <label for="searchIn" class="param-label">Search in</label>&nbsp;
        <select name="searchIn" v-model="searchInLocal" class="param-select">
          <option value="intitle">title</option>
          <option value="inauthor">author</option>
          <option value="inpublisher">publisher</option>
          <option value="subject">subject</option>
          <option value="">all</option>
        </select>
      </div>
      <div class="param">
        <label for="showResults" class="param-label">Show results</label>&nbsp;
        <select name="showResults" v-model="showResultsLocal" class="param-select">
          <option value="page">page by page</option>
          <option value="scroll">infinite scroll</option>
        </select>
      </div>
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
  display: grid;
  width: 100%;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 40px;
}

.search-wrap {
  width: 100%;
  margin-bottom: 30px;
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

.params-wrap {}

.param {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
}

.param-label {
  font-size: 0.875em;
  color: #616161;
  /* text-transform: uppercase; */
}

.param-select {
  font-size: 0.875em;
  border: 0px;
  border-bottom: 1px dashed #616161;
  background-color: transparent;
  font-weight: bold;
}

.param-select:hover {
  cursor: pointer;
}
</style>
