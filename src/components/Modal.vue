<template>
  <div>
    <transition name="modal"  >
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container" v-click-outside="hola">
            <div class="modal-header">
              <slot name="header"> default header </slot>
            </div>
            <div class="modal-body">
              <slot name="body"> default body </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                default footer
                <button class="modal-default-button" @click="$emit('close')">
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: ['hiddenSave'],
  methods: {
    hola() {
      console.log('hola');
    },
  },
};
</script>
