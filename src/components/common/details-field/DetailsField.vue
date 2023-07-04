<script setup lang="ts">
defineProps<{
  field: Field
}>()
</script> 


<template>
  <div class="field-wrap" v-if="(typeof field?.value === 'string' || typeof field?.value === 'number')
    || (Array.isArray(field?.value) && field?.value?.length > 0)">

    <h4>{{ field.title }}</h4>

    <ul v-if="Array.isArray(field?.value) && field?.value?.length > 0">
      <li v-for="v, i in field.value" :key="i">{{ v }}</li>
    </ul>

    <span v-else>{{ field.value }}</span>

  </div>
</template> 


<script lang="ts">
interface Field {
  title: string;
  value: unknown;
}
export default {
  name: 'DetailsField',
}
</script>

<style scoped> .field-wrap {
   margin-bottom: 20px;
   font-size: 0.875em;
 }

 .field-wrap h4 {
   margin: 0px 0px 4px;
 }

 .field-wrap ul {
   padding: 0px 0px 0px 18px;
   margin: 0px;
 }
</style>
