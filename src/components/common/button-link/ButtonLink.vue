<script setup lang="ts">
interface IProps {
  text: string;
  link: string;
  variant: VariantType;
}

withDefaults(defineProps<IProps>(), {
  variant: VariantType.Text,
}); 
</script> 


<template>
  <a :href="link">{{ text }}</a>
</template> 


<script lang="ts">
const enum VariantType {
  Container = 'container',
  Text = 'text',
  Outline = 'outline',
}

export default {
  name: 'ButtonLink',
}
</script>

<style scoped> a {
   padding: 10px 8px;
   background-color: rgb(167, 140, 210);
   display: inline-block;
   color: #fff;
   text-decoration: none;
   border-radius: 4px;
 }
</style>
