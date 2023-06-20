<script setup lang="ts">
import { RouterLink } from 'vue-router' 
</script> 


<template>
  <header>
    <div class="header-in">

      <div class="logo">
        <img alt="logo" class="logo-icon" src="@/assets/logo.svg" />
        <span class="logo-text">Book search<span class="logo-text-end">er</span></span>
      </div>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

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
   padding-top: 10%;
   margin-bottom: 30px;
 }

 .header-in {
   display: inline-block;
   text-align: start;
 }

 .logo {
   text-align: center;
   vertical-align: middle;
   margin-bottom: 30px;
   overflow: hidden;
   width: 100%;
 }

 .logo-icon {
   vertical-align: middle;
   width: 4em;
   margin-right: 10px;
   box-sizing: border-box;
 }

 .logo-text {
   color: #616161;
   font: 3.5em sans-serif;
   vertical-align: middle;
 }

 .logo-text-end {
   display: inline-block;
   border-bottom: 3px solid #b71c1c;
 }

 nav {
   font: .85em sans-serif;
 }

 nav>a {
   display: inline-block;
   text-decoration: none;
   margin: 0px 5px;
   padding: 5px;
   text-transform: uppercase;
   color: #616161;
   transition: .150ms;
 }

 nav>a:hover {
   background-color: #e6e6e6;
 }

 .router-link-active {
   background-color: #616161;
   color: #fefefe;

 }

 .router-link-active:hover {
   background-color: #616161;
   color: #fefefe;

 }
</style>
