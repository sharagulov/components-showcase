<script setup lang="ts">
interface Props {
  label?: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium'
});
</script>

<template>
  <button class="apple-button" :class="[`is-${variant}`, `is-${size}`]">
    {{ label || (variant === 'primary' ? 'Click Me' : 'Cancel') }}
  </button>
</template>

<style scoped>
.apple-button {
  /* Использование токенов из tokens.css */
  font-family: var(--font-system);
  font-weight: 500;

  /* Полностью закругленные края (pill shape) */
  border-radius: 999px;
  border: 1px solid transparent;

  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  outline: none;
}

/* Small размер (пропорция 1/1.25 от medium) */
.apple-button.is-small {
  height: 28px;
  font-size: 0.75rem; /* 12px */
  padding: 0 12px;
  min-width: 64px;
}

/* Medium размер (базовый, как у AppleDropdown) */
.apple-button.is-medium {
  height: 34px;
  font-size: 0.8125rem; /* 13px */
  padding: 0 16px;
  min-width: 80px;
}

/* Large размер (пропорция 1.25x от medium, соответствует touch target) */
.apple-button.is-large {
  height: 44px;
  font-size: 1rem; /* 16px */
  padding: 0 24px;
  min-width: 100px;
}

.apple-button.is-primary {
  background-color: var(--accent-primary);
  color: #ffffff;
  border-color: transparent;
}

.apple-button.is-primary:hover {
  background-color: #0077ed;
  opacity: 1;
}

.apple-button.is-primary:active {
  background-color: #0066cc;
  transform: scale(0.98);
}

.apple-button.is-secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border);
}

.apple-button.is-secondary:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.theme-dark .apple-button.is-secondary:hover {
  background-color: rgba(255, 255, 255, 0.04);
}

.apple-button.is-secondary:active {
  background-color: rgba(0, 0, 0, 0.04);
  transform: scale(0.98);
}

.theme-dark .apple-button.is-secondary:active {
  background-color: rgba(255, 255, 255, 0.06);
}

.apple-button:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

.apple-button.is-primary:focus-visible {
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.12);
  outline: none;
}
</style>
