<template>

  <nav>
    <router-link to="/">Home</router-link>
  </nav>

  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <Component :is="Component" :key="route.fullPath"/>
    </transition>
  </router-view>

</template>

<style>
@import 'styles/custom-properties.css';
@import 'styles/normalize.css';
@import 'styles/layout.css';

@font-face {
  font-family: main;
  src: url('@/assets/fonts/main.ttf');
}

* {
  font-family: main;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: .3s ease-out;
}

</style>
