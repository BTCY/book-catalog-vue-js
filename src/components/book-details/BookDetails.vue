<script setup lang="ts">
</script> 


<template>
  <div class="about">
    <h1>Book</h1>
  </div>
</template>



<script lang="ts">
import { useRoute } from 'vue-router'
import { getBook } from '@/api/books-service';

export default {
  name: 'AnimalFacts',
  // data() {

  // },
  methods: {

  },

  mounted() {
    const route = useRoute()
    const bookId = route.params.bookId as any

    getBook(bookId)
      .then((response: any) => {
        console.log(response)
      })
      .catch((error: any) => console.log(error))
  }
}
</script>

<style scoped> h1 {
   font-weight: 500;
   font-size: 2.6rem;
   top: -10px;
 }
</style>
