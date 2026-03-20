<template>
  <div class="text-white bg-gradient-to-r from-[#009474] to-[#096CA9] h-screen w-screen relative">
    <div :style="`background-image: url(${imgBG});`"
         class="bg-green-darken-2 absolute h-full w-full bg-cover opacity-50">
    </div>
    <div class=" w-full h-full absolute flex items-center ">
      <div class="container mx-auto">
        <router-link to='/'>
          <h1 class="text-h2">PHYLOGRAPHIX</h1>
        </router-link>
        <span>Version 1</span>
        <p class="mt-5  md:w-1/2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis magnam quasi odio sit
          nostrum, alias eius repudiandae sed adipisci rerum iusto pariatur aliquam. Totam porro neque, sunt aut in
          nam.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="container mx-auto flex items-center justify-center my-10">
      <div class="flex-1">
        <h3 class="text-h3 ">Développed by</h3>
        <p class="mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, porro. Dolorum doloremque
          quae natus nisi maxime commodi libero adipisci, assumenda doloribus. Quidem iusto corporis saepe recusandae
          quo, placeat ipsam possimus.</p>
        <p class="text-red-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, porro. Dolorum
          doloremque quae natus nisi maxime commodi libero adipisci, assumenda doloribus. Quidem iusto corporis saepe
          recusandae quo, placeat ipsam possimus.</p>
      </div>
      <div class="flex-1" cols="6">
        <div></div>
        <div class="relative rounded-l-full">
          <div class="absolute h-full w-full bg-gradient-to-r from-[#009474] to-[#096CA9] opacity-50"></div>
          <img :src="imgjeriel" alt="" class="h-full aspect-[3/2] object-cover rounded-full" srcset="">
          <div class="absolute">Jeriel</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const imgBG = require("@/assets/img/img2.jpeg")
const imgjeriel = require("@/assets/img/img2.jpeg")

</script>
