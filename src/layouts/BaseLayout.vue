<template>
  <div class="container">
    <div class="container-in">

      <slot name="header"></slot>

      <main>
        <slot></slot>
      </main>

    </div>
  </div>
</template> 

<style scoped> .container {
   height: 100vh;
   width: 100%;
   background-color: #fefefe;
   box-sizing: border-box;
   font-size: 16px;
 }

 .container-in {
   min-height: inherit;
   width: 100%;
   box-sizing: border-box;
   max-width: 900px;
   margin: 0 auto;
   /* border: 1px solid #888 */
 }
</style>

