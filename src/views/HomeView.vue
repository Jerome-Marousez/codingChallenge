<template>

  <div class="home">

    <TestComponent />

    <teleport to="#modal-root">
      <Modal v-if="isModalActive">
        <template v-slot:header>Modal</template>
        <template v-slot:default>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</template>
        <template v-slot:footer>That was great wasn't it!</template>
      </Modal>
    </teleport>

  </div>

</template>

<script>
import Modal from "@/components/tools/Modal";
import TestComponent from "@/components/TestComponent";

export default {
  name: 'HomeView',
  components: {
    Modal,
    TestComponent,
  },
}
</script>

<style scoped>

.home {

}

</style>