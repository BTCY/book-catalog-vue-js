<script setup lang="ts">
import { RouterLink } from 'vue-router' 
</script>  


<template>
  <header>

    <nav>
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/about" class="nav-link">About</RouterLink>
    </nav>

    <div class="logo">
      <img alt="logo" class="logo-icon" src="@/assets/logo.svg" />
      <h2 class="logo-text">Book searcher</h2>
    </div>

  </header>
</template>


<script lang="ts">
export default {
  name: 'HeaderComponent'
}
</script> 


<style scoped> header {
   text-align: center;
   width: 100%;
   box-sizing: border-box;
   padding-top: 75px;
   margin-bottom: 60px;
 }


 .logo {
   padding-top: 6%;
   text-align: center;
   overflow: hidden;
   width: 100%;
 }

 .logo-icon {
   width: 4em;
   vertical-align: middle;
   margin-right: 10px;
   box-sizing: border-box;
 }

 .logo-text {
  display: inline;
   color: #616161;
   font: 3.5em sans-serif;
   vertical-align: middle;
 }

 nav {
   position: absolute;
   top: 20px;
   right: 20px;
   font: .85em sans-serif;
 }

 .nav-link {
   display: inline-block;
   text-decoration: none;
   margin: 0px 5px;
   padding: 5px;
   text-transform: uppercase;
   color: #616161;
   transition: all 250ms ease;
   border-radius: 5px;
 }

 .nav-link:hover {
   background-color: #e6e6e6;
 }

 .router-link-active {
   background-color: #616161;
   color: #fefefe;
   cursor: default;
 }

 .router-link-active:hover {
   background-color: #616161;
   color: #fefefe;
 }
</style>
