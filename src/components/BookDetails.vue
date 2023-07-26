<script setup lang="ts">
import DetailsField from './DetailsField.vue';
import ButtonLink from './ButtonLink.vue';
</script> 


<template>
  <div class="book-details-wrap" v-if="book !== undefined">


    <div class="book-content-wrap">

      <div class="asaid-wrap">
        <img class="book-image" :src=book?.image>

        <div class="asaid-button-link-wrap">
          <ButtonLink v-if=book.canonicalVolumeLink.value :text=book.canonicalVolumeLink.title
            :link=book.canonicalVolumeLink.value />
          <ButtonLink v-if=book.previewLink.value :text=book.previewLink.title :link=book.previewLink.value />
        </div>
      </div>

      <div class="info-wrap">
        <h1>{{ book?.title }}</h1>

        <p>{{ `${book.price.title} ${book.price.value}` }}</p>

        <div class="fields-wrap">
          <DetailsField v-for="field in book.details" :key="field.title" :field="field" />
        </div>

        <div v-html="book?.description" class="field-description"></div>

        <div class="fields-wrap">
          <DetailsField v-for="field in book.subDetails" :key="field.title" :field="field" />
        </div>
      </div>

    </div>
  </div>
</template>



<script lang="ts">
import { useRoute } from 'vue-router'
import { getBook } from '@/api/books-service';
import type { IApiBook } from '@/api/books-service.types';

export default {
  name: 'BookDetails',
  data() {
    return {
      book: undefined as undefined | any,
      loadState: ''
    }
  },
  methods: {
    bookDataAdapter(apiBookData: IApiBook) {
      console.log(apiBookData);
      return ({
        title: apiBookData.volumeInfo?.title,
        image: apiBookData.volumeInfo?.imageLinks?.thumbnail,
        description: apiBookData.volumeInfo?.description,
        canonicalVolumeLink: {
          title: "Google Play",
          value: apiBookData.volumeInfo?.canonicalVolumeLink
        },
        previewLink: {
          title: "Preview",
          value: apiBookData.volumeInfo?.previewLink
        },
        price: {
          title: "Price",
          value: apiBookData.saleInfo?.listPrice?.amount && apiBookData.saleInfo?.listPrice?.currencyCode
            ? apiBookData.saleInfo.listPrice.amount + apiBookData.saleInfo.listPrice.currencyCode
            : undefined
        },
        details: [
          {
            title: "Authors",
            value: apiBookData.volumeInfo?.authors
          },
          {
            title: "Categories",
            value: apiBookData.volumeInfo?.categories
          },
        ].filter(f => f.value),
        subDetails: [
          {
            title: "Publisher",
            value: apiBookData.volumeInfo?.publisher
          },
          {
            title: "Published date",
            value: apiBookData.volumeInfo?.publishedDate
          },
          {
            title: "Print type",
            value: apiBookData.volumeInfo?.printType
          },
          {
            title: "Page count",
            value: apiBookData.volumeInfo?.printedPageCount
          },
          {
            title: "Industry identifiers",
            value: apiBookData.volumeInfo?.industryIdentifiers?.map(i => i.type + ' — ' + i.identifier)
          },
          {
            title: "Language",
            value: apiBookData.volumeInfo?.language
          },
          {
            title: "Dimensions",
            value: apiBookData.volumeInfo?.dimensions
          },
        ].filter(f => f.value),
      })
    }
  },
  mounted() {
    const route = useRoute()
    const bookId = route.params.bookId as string
    this.loadState = 'loading'
    getBook(bookId)
      .then(response => {
        if (response !== undefined) {
          this.book = this.bookDataAdapter(response);
        }
        this.loadState = 'success'
      })
      .catch((error: any) => console.log(error))
  }
}
</script>

<style scoped>  .book-details-wrap {
    margin-bottom: 30px;
    background-color: #ffffff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 10px;
  }

  .book-content-wrap {
    display: grid;
    grid-template-columns: 180px auto;
  }

  .book-content-wrap h1 {
    margin: 0px 0px 24px;
    padding: 0px;
  }

  .asaid-wrap {
    padding: 27px 20px;
  }

  .book-image {
    max-width: 180px;
    height: 192px;
    margin-bottom: 10px;
  }

  .asaid-button-link-wrap {
    box-sizing: content-box;
  }

  .info-wrap {
    padding: 20px;
  }

  .field-description {
    margin-bottom: 20px;
    font-size: 0.875em;
  }

  .fields-wrap {
    padding: 10px 5px;
    display: grid;
    grid-template-columns: 50% auto;
  }
</style>
