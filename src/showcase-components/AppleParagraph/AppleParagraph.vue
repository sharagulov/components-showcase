<script setup lang="ts">
interface Props {
  text?: string;
  maxWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: '38em'
});
</script>

<template>
  <p class="apple-paragraph" :style="{ maxWidth }">
    <template v-if="text">{{ text }}</template>
    <slot v-else></slot>
  </p>
</template>

<style scoped>
.apple-paragraph {
  /* Использование токенов из tokens.css */
  font-family: var(--font-system);
  font-size: var(--font-body-size); /* 1rem / 16px */
  line-height: var(--line-small); /* 1.5 - небольшое расстояние между строками */
  letter-spacing: -0.025em; /* Чуть уменьшенное расстояние между буквами для красоты */

  /* Цвет текста */
  color: var(--text-primary);

  /* Оптимальная длина строки для читаемости (40-50 символов) */
  max-width: 38em; /* ~600px at 16px base */

  /* Отступы между абзацами */
  margin: 0 0 var(--spacing-md) 0;
  transition: font-weight 0.2s ease, color 0.2s ease;
}

/* Явно прописываем веса для обеих тем */
.theme-light .apple-paragraph {
  font-weight: 500; /* Сделаем 600 вместо 500, чтобы вы точно увидели разницу */
}

.theme-dark .apple-paragraph {
  font-weight: 400;
}

/* Системные настройки (если классы не применились) */
@media (prefers-color-scheme: light) {
  .apple-paragraph:not(.theme-dark *) {
    font-weight: 600;
  }
}

@media (prefers-color-scheme: dark) {
  .apple-paragraph:not(.theme-light *) {
    font-weight: 400;
  }
}

.apple-paragraph:last-child {
  margin-bottom: 0;
}

/* Адаптация для мобильных устройств */
@media (max-width: 767px) {
  .apple-paragraph {
    max-width: 100%;
  }
}
</style>
