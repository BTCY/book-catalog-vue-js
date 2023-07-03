<script setup lang="ts">
interface IProps {
  text: string;
  link: string;
  variant: VariantType;
  fullWidth: boolean;
}

withDefaults(defineProps<IProps>(), {
  variant: VariantType.Text,
  fullWidth: true
}); 
</script> 


<template>
  <a :href="link" :style="style">{{ text }}</a>
</template> 


<script lang="ts">
const enum VariantType {
  Container = 'container',
  Text = 'text',
  Outline = 'outline',
}

export default {
  name: 'ButtonLink', 
  computed: {
      style () {
        return {width :this.fullWidth ? '100%': 'auto'};
      }
    }
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
