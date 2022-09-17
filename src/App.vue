<template>

  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <Component :is="Component" :key="$route.fullPath"/>
    </transition>
  </router-view>

</template>

<style scoped>
@import 'styles/custom-properties.css';
@import 'styles/normalize.css';
@import 'styles/style.css';
@import 'styles/theme_light.css';
@import 'styles/theme_dark.css';

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: .3s ease-out;
}

</style>
