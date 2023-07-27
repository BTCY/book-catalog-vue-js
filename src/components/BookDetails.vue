<script setup lang="ts">
import { useRoute } from "vue-router"
import { getBook } from "@/api/books-service";
import type { IApiBook } from "@/api/books-service.types";
import DetailsField from "./DetailsField.vue"; 
</script> 


<template>
  <div class="book-details-wrap" v-if="(loadState === 'success' && book !== undefined || loadState === 'loading')">
    <div class="book-content-wrap">

      <div class="asaid-wrap">

        <div class="book-image-wrap">
          <div v-if="loadState === 'loading'" class="skeleton-book-image">&nbsp;</div>
          <img v-else-if="book?.image" class="book-image" :src=book.image>
          <div v-else class="book-image-no-pic">no picture</div>
        </div>

        <div v-if="loadState === 'success'" class="asaid-button-link-wrap">

          <p v-if="book?.price?.value" class="price">{{ `${book.price.title} ${book.price.value}` }}</p>
          <p v-else class="price">no price</p>

          <a v-if=book.canonicalVolumeLink.value :href="book.canonicalVolumeLink.value" target="_blank"
            class="button-link">
            {{ book.canonicalVolumeLink.title }}
          </a>

          <a v-if=book.previewLink.value :href="book.previewLink.value" target="_blank" class="button-link">
            {{ book.previewLink.title }}
          </a>

        </div>
      </div>

      <div v-if="loadState === 'loading'" class="info-wrap">
        <div class="skeleton-info-wrap">&nbsp;</div>
      </div>

      <div v-if="loadState === 'success'" class="info-wrap">
        <h1>{{ book?.title }}</h1>

        <div class="fields-wrap">
          <DetailsField v-for="field in book.details" :key="field.title" :field="field" />
        </div>

        <div v-if="book?.description" v-html="book?.description" class="info-description"></div>
        <p v-else class="info-description-no-desc">no description</p>

        <div class="fields-wrap">
          <DetailsField v-for="field in book.subDetails" :key="field.title" :field="field" />
        </div>
      </div>

    </div>
  </div>

  <div v-if="loadState === 'error'" class="error">Error</div>

  <div class="no-found" v-if="loadState === 'success' && book === undefined">
    Book not found
  </div>
</template> 


<script lang="ts">
export default {
  name: "BookDetails",
  data() {
    return {
      book: undefined as undefined | any,
      loadState: ""
    }
  },
  methods: {
    bookDataAdapter(apiBookData: IApiBook) {
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
            value: apiBookData.volumeInfo?.industryIdentifiers?.map(i => i.type + " — " + i.identifier)
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
    this.loadState = "loading"
    getBook(bookId)
      .then(response => {
        if (response !== undefined) {
          this.book = this.bookDataAdapter(response);
        }
        this.loadState = "success"
      })
      .catch((error) => {
        console.log(error);
        this.loadState = "error"
        this.book = undefined;
      })
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
    min-height: 460px;
    display: grid;
    grid-template-columns: 168px auto;
  }

  .book-content-wrap h1 {
    margin: 0px 0px 24px;
    padding: 0px;
  }

  .asaid-wrap {
    padding: 27px 20px;
  }

  .book-image-wrap {
    height: 200px;
  }

  .book-image {
    margin-bottom: 10px;
    height: auto;
    max-height: 200px;
    width: 100%;
    width: 128px;
    max-width: 128px;
    border-radius: 4px;
  }

  .book-image-no-pic {
    display: flex;
    height: 200px;
    width: 128px;
    margin-top: 0px;
    left: 0px;
    border-radius: 4px;
    background-color: #F4F4F4;
    font-size: 0.875em;
    color: #aaaaaa;
    justify-content: center;
    align-items: center;
  }

  .asaid-button-link-wrap {
    box-sizing: border-box
  }

  .button-link {
    color: #00695f;
    text-transform: uppercase;
    padding: 10px 8px;
    display: block;
    text-decoration: none;
    border-radius: 4px;
    transition: all 250ms ease;
    font-size: 0.875em;
    box-sizing: border-box;
  }

  .button-link:hover {
    background-color: #e0f2f1
  }

  .info-wrap {
    padding: 20px;
    box-sizing: border-box;
  }

  .price {
    color: #6e531f;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0px 20px;
    background-color: #fffcdf;
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

  .info-description {
    width: 100%;
    line-height: 1.2em;
    color: #616161;
    margin: 0px 0px 20px;
    font-size: 0.875em;
  }

  .info-description-no-desc {
    width: 100%;
    line-height: 1.2em;
    color: #aaaaaa;
    overflow: hidden;
    font-size: 0.875em;
  }

  .no-found {
    text-align: center;
    font-size: 2em;
  }

  .error {
    text-align: center;
    font-size: 2em;
    color: tomato;
  }

  .skeleton-book-image {
    height: 200px;
    width: 100%;
    max-width: 128px;
    background-color: #F4F4F4;
    border-radius: 5px;
  }

  .skeleton-info-wrap {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    background-color: #F4F4F4;
    border-radius: 5px;
  }

  @media (max-width: 600px) {
    .book-content-wrap {
      min-height: 740px;
      display: block;
      position: relative;
    }

    .book-image-wrap {
      display: flex;
      justify-content: center;
    }

    .skeleton-info-wrap {
      height: 460px;
    }

    .fields-wrap {
      grid-template-columns: 100%;
    }
  }
</style>
