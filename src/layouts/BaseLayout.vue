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
   min-height: 100vh;
   width: 100%;
   background-color: #fbfbfb;
   box-sizing: border-box;
   font-size: 16px;
   padding: 0px 20px 0px;
 }

 .container-in {
   min-height: inherit;
   width: 100%;
   box-sizing: border-box;
   max-width: 900px;
   margin: 0 auto;
   padding-bottom: 90px;
 }
</style>

