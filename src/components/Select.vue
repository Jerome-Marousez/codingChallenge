<template>

  <div class="select-container">

    <input
        type="text"
        :placeholder="modelValue ? '' : placeholder"
        :value="selected"
        class="select"
        readonly
        aria-readonly="true"
        @click.self="toggleMenu"
    />
    <div v-if="modelValue" class="select-cross" @click="removeSelection"><i class="fas fa-times"/></div>

    <div v-if="!isMenuOpen" class="select-arrow" @click="toggleMenu"><i class="fas fa-chevron-down"/></div>
    <div v-else class="select-arrow" @click="toggleMenu"><i class="fas fa-chevron-up"/></div>

    <div v-if="isMenuOpen" class="menu-container">
      <div v-for="option in options" :key="option" class="option" role="option" @click="selectOption(option)">
        {{ option.charAt(0).toUpperCase() + option.slice(1) }}
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "Select",

  props: {
    modelValue: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "Select",
    },
    options: {
      type: Set,
      required: true
    },
  },

  data() {
    return {
      isMenuOpen: false,
      selected: null,
    }
  },

  methods: {
    removeSelection() {
      this.selected = []
      this.$emit('update:modelValue', null)
    },

    handleOutsideClick(e){
      if(!e.path.some(div => div.className === 'select-container')){
        this.isMenuOpen = false
      }
    },

    selectOption(option){
      this.selected = option
      this.toggleMenu()
      this.$emit('update:modelValue', option)
    },

    toggleMenu(){
      this.isMenuOpen = !this.isMenuOpen
    },
  },

  mounted(){
    document.addEventListener('click', this.handleOutsideClick)
  },

  destroyed(){
    document.removeEventListener('click', this.handleOutsideClick)
  },

}
</script>

<style scoped>
.select-container {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
}
.select-container > input {
  cursor: pointer;
}
.select-arrow{
  cursor: pointer;
  position: absolute;
  right: 2em;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
  transition: transform .2s linear;
}
.select-cross{
  cursor: pointer;
  position: absolute;
  right: 3.5em;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
}
.menu-container {
  width: 100%;
  position: absolute;
  top: 3.5em;
  padding-block: .6em;
  padding-inline: 2em;
  border-radius: .3em;
  background-color: var(--bg-secondary);
  border: none;
  animation: grow-top .2s ease-out forwards;
  transform-origin: top;
  max-height: clamp(25vh, 30vh, 50vh);
  overflow-y: auto;
  z-index: 2;
}
@keyframes grow-top {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
.option {
  padding-block: .6em;
  cursor: pointer;
}
.option:hover {
  font-weight: bold;
}
</style>