<template>

  <div class="modal-backdrop">

    <div
        class="modal-container"
        role="dialog"
        aria-labelledby="header"
        aria-modal="true"
    >

      <div class="modal-header">
        <slot name="header" id="header"></slot>
      </div>

      <div class="modal-body">
        <slot></slot>
      </div>

      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>

    </div>

  </div>


</template>


<script>
export default {
  name: "Modal",

}
</script>


<style scoped>

.modal-backdrop {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  margin-inline: var(--responsive-spacing);
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  padding: 1em;
}

.modal-header {

}

.modal-body {

}

.modal-footer {

}

</style>