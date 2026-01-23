<script setup lang="ts">
import { ref } from 'vue';

const isChecked = ref(false);

const toggle = () => {
  isChecked.value = !isChecked.value;
};
</script>

<template>
  <div
    class="apple-toggle"
    :class="{ 'is-checked': isChecked }"
    @click="toggle"
    tabindex="0"
    @keydown.space.prevent="toggle"
    role="switch"
    :aria-checked="isChecked"
  >
    <div class="apple-toggle-handle"></div>
  </div>
</template>

<style scoped>
.apple-toggle {
  --toggle-width: 51px;
  --toggle-height: 31px;
  --toggle-padding: 2px;

  width: var(--toggle-width);
  height: var(--toggle-height);
  background-color: var(--toggle-bg, #e9e9ea);
  border-radius: calc(var(--toggle-height) / 2);
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1.5px solid transparent;

  /* Контейнер для клика (touch target) */
  box-sizing: border-box;
}

.theme-light .apple-toggle {
  --toggle-bg: #e9e9ea;
}

.theme-dark .apple-toggle {
  --toggle-bg: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.04);
}

@media (prefers-color-scheme: dark) {
  .apple-toggle:not(.theme-light *) {
    --toggle-bg: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.04);
  }
}

.apple-toggle.is-checked {
  background-color: var(--status-success);
  border-color: transparent;
}

.apple-toggle-handle {
  width: calc(var(--toggle-height) - var(--toggle-padding) * 2 - 3px);
  height: calc(var(--toggle-height) - var(--toggle-padding) * 2 - 3px);
  background-color: #ffffff;
  border-radius: 50%;
  position: absolute;
  top: var(--toggle-padding);
  left: var(--toggle-padding);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15), 0 3px 1px rgba(0, 0, 0, 0.06);
}

.apple-toggle.is-checked .apple-toggle-handle {
  transform: translateX(calc(var(--toggle-width) - var(--toggle-height) + 1px));
}

.apple-toggle:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 4px;
}
</style>
