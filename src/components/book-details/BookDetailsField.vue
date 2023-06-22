<script setup lang="ts">
defineProps<{
  field: Field
}>()
</script> 


<template>
  <div class="field-wrap" v-if="typeof field?.value === 'string' || typeof field?.value === 'number'">
    <span>{{ field.title }}</span>
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
   padding: 10px 5p;
 }
</style>
