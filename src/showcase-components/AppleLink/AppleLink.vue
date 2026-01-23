<script setup lang="ts">
interface Props {
  href?: string;
  target?: string;
}

withDefaults(defineProps<Props>(), {
  target: '_self'
});

const isExternal = (href?: string) => {
  if (!href) return false;
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
};
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :target="isExternal(href) ? '_blank' : target"
    :rel="isExternal(href) ? 'noopener noreferrer' : undefined"
    class="apple-link"
  >
    <slot>Learn more</slot>
  </a>
  <button
    v-else
    type="button"
    class="apple-link"
  >
    <slot>Learn more</slot>
  </button>
</template>

<style scoped>
.apple-link {
  /* Использование токенов из tokens.css */
  font-family: var(--font-system);
  font-size: var(--font-body-size);
  font-weight: 400;
  line-height: var(--line-body);

  /* Акцентный цвет */
  color: var(--accent-primary);
  text-decoration: none;

  /* Плавные переходы для микро-взаимодействий */
  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              text-decoration-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  outline: none;

  display: inline;
}

/* Подчеркивание на hover и focus */
.apple-link:hover,
.apple-link:focus-visible {
  text-decoration: underline;
  text-decoration-color: var(--accent-primary);
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}

/* Более темный оттенок при hover */
.apple-link:hover {
  color: #0066cc;
}

/* Focus состояние с outline */
.apple-link:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Активное состояние */
.apple-link:active {
  color: #0051a3;
}

.theme-dark .apple-link:active {
  color: #4ab8f0;
}

/* Уважение к prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .apple-link {
    transition: none;
  }
}
</style>
