<script setup lang="ts">
defineProps<{
  field: Field
}>()
</script> 


<template>
  <div class="field-wrap" v-if="typeof field?.value === 'string' || typeof field?.value === 'number'">
    <h4>{{ field.title }}</h4>
    <span>{{ field.value }}</span>
  </div>
</template>



<script lang="ts">
interface Field {
  title: string;
  value: string | number | undefined | null;
}
export default {
  name: 'BookDetailsField',
}
</script>

<style scoped> .field-wrap {
   margin-bottom: 20px;
 }

 .field-wrap h4 {
   margin: 0px 0px 4px;
 }
</style>
