<script setup lang="ts">
interface IProps {
  text: string;
  link: string;
  icon?: any;
  variant?: VariantType;
  fullWidth?: boolean;
  target?: string
}

withDefaults(defineProps<IProps>(), {
  variant: VariantType.Text,
  fullWidth: true,
  target: "_blank"
}); 
</script> 


<template>
  <a :href="link" :style="style" @mouseenter="hover = true" @mouseleave="hover = false" target=target>
    {{
      (icon && icon)
    }}
      <!-- <previewIcon /> -->
    {{
      text
    }}
  </a>
</template> 


<script lang="ts">
import previewIcon from '../../../assets/previewIcon.svg';
const enum VariantType {
  Container = 'container',
  Text = 'text',
  Outline = 'outline',
}

export default {
  name: 'ButtonLink',
  // components: { previewIcon },
  data() {
    return {
      hover: false,
    }
  },
  computed: {
    style() {
      return {
        width: this.fullWidth ? '100%' : 'auto',
        ...(this.variant === VariantType.Container && {
          backgroundColor: '#26a69a',
          color: '#fff',
          ...(this.hover && { backgroundColor: '#009688' })
        }),
        ...(this.variant === VariantType.Text && {
          color: '#00695f',
          ...(this.hover && { backgroundColor: '#e0f2f1' })
        }),
        ...(this.variant === VariantType.Outline && {
          color: '#00695f',
          border: '1px solid #00695f',
          ...(this.hover && { backgroundColor: '#009688' })
        })
      };
    }
  }
}
</script>

<style scoped> a {
   text-transform: uppercase;
   padding: 10px 8px;
   display: inline-block;
   text-decoration: none;
   border-radius: 4px;
   transition: ease .2s;
   font-size: 0.875em;
 }
</style>
