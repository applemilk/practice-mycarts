<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <button class="md-close" @click="mdShow=false">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <div class="btn-wrap">
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if = "mdShow" @click="mdShow=false"></div>
  </div>
</template>

<script>
export default {
  props: ['mdShow'],
  data () {
    return {
      msg: 'hi'
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
