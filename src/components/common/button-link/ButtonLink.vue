<script setup lang="ts">
defineProps<{
  text: string
}>()
</script> 


<template>
  <button>{{ text }}</button>
</template> 


<script lang="ts">
interface Field {
  title: string;
  value: unknown;
}
export default {
  name: 'ButtonLink',
}
</script>

<style scoped> .field-wrap {
   margin-bottom: 20px;
 }

 .field-wrap h4 {
   margin: 0px 0px 4px;
 }

 .field-wrap ul {
   padding: 0px 0px 0px 16px;
   margin: 0px;
 }
</style>
