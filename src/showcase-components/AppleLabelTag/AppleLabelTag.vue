<script setup lang="ts">
interface Props {
  label?: string;
}

defineProps<Props>();
</script>

<template>
  <span class="apple-label-tag">
    <slot>{{ label }}</slot>
  </span>
</template>

<style scoped>
.apple-label-tag {
  /* Использование системного шрифта Apple */
  font-family: var(--font-system);

  /* Размер примерно в 3 раза меньше medium кнопки (34px / 3 ≈ 11.3px) */
  /* 12px — это компактный размер, соответствующий Footnote/Caption в iOS */

  /* Микро-шрифт для соответствия размеру */
  font-size: 9px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.01em;

  /* Визуальный стиль: невзрачный, похож на кнопку */
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 3px 9px;
  border-radius: 999px; /* Pill shape */

  /* Цветовая схема Apple: сдержанная */
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border);

  /* Отсутствие анимаций */
  transition: none;

  /* Предотвращение выделения текста */
  user-select: none;

  /* Вертикальное выравнивание относительно текста */
  vertical-align: middle;
}

/* Темная тема (через переменные из tokens.css) */
.theme-dark .apple-label-tag {
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
}
</style>
