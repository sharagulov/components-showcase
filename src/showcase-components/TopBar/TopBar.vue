<script setup lang="ts">
import { computed } from 'vue';
import AppleColorPicker from '../AppleColorPicker/AppleColorPicker.vue';
import AppleDropdown from '../AppleDropdown/AppleDropdown.vue';
import { getComponentNames } from '../../showcase/registry';

const props = defineProps<{
  selectedComponent: string;
  bgLight: string;
  bgDark: string;
  isStatic?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:selectedComponent', value: string): void;
  (e: 'update:bgLight', value: string): void;
  (e: 'update:bgDark', value: string): void;
}>();

const componentNames = getComponentNames();

const currentIndex = computed(() => {
  return componentNames.indexOf(props.selectedComponent);
});

const canGoPrevious = computed(() => {
  return currentIndex.value > 0;
});

const canGoNext = computed(() => {
  return currentIndex.value < componentNames.length - 1;
});

const goToPrevious = () => {
  if (canGoPrevious.value) {
    emit('update:selectedComponent', componentNames[currentIndex.value - 1]);
  }
};

const goToNext = () => {
  if (canGoNext.value) {
    emit('update:selectedComponent', componentNames[currentIndex.value + 1]);
  }
};

const onHexInput = (emitFn: any, value: string) => {
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    emitFn(value);
  }
};
</script>

<template>
  <header class="top-bar" :class="{ 'is-static': isStatic }">
    <div class="controls-container">
      <div class="control-group component-navigation">
        <button
          class="nav-button nav-button-prev"
          :disabled="!canGoPrevious"
          @click="goToPrevious"
          aria-label="Previous component"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 3-6 6m0-6 6 6"/>
          </svg>
        </button>
        <AppleDropdown
          :options="componentNames"
          :model-value="selectedComponent"
          @update:model-value="$emit('update:selectedComponent', $event)"
          placeholder="Component"
        />
        <button
          class="nav-button nav-button-next"
          :disabled="!canGoNext"
          @click="goToNext"
          aria-label="Next component"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 3 6 6m0-6-6 6"/>
          </svg>
        </button>
      </div>

      <div class="divider"></div>

      <div class="control-group theme-controls">
        <div class="color-picker-wrapper">
          <AppleColorPicker
            :model-value="bgLight"
            @update:model-value="$emit('update:bgLight', $event)"
          />
          <input
            type="text"
            :value="bgLight"
            @input="onHexInput((v: string) => $emit('update:bgLight', v), ($event.target as HTMLInputElement).value)"
            class="hex-input"
            maxlength="7"
          />
        </div>

        <div class="color-picker-wrapper">
          <AppleColorPicker
            :model-value="bgDark"
            @update:model-value="$emit('update:bgDark', $event)"
          />
          <input
            type="text"
            :value="bgDark"
            @input="onHexInput((v: string) => $emit('update:bgDark', v), ($event.target as HTMLInputElement).value)"
            class="hex-input"
            maxlength="7"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.top-bar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  height: 56px;
  /* Светлая тема: более прозрачный белый для глубокого блюра */
  background-color: var(--topbar-bg, rgba(255, 255, 255, 0.7));
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  /* Граница: очень тонкая, как в Control Center */
  border: 1px solid var(--topbar-border, rgba(0, 0, 0, 0.08));
  border-radius: 999px;
  /* Мягкая, распределенная тень */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.02);
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-lg);
  width: auto;
  white-space: nowrap;
}

.top-bar.is-static {
  position: relative;
  top: 0;
  left: 0;
  transform: none;
  z-index: 1;
}

/* Явное определение для светлой темы */
.theme-light .top-bar {
  --topbar-bg: rgba(255, 255, 255, 0.7);
  --topbar-border: rgba(0, 0, 0, 0.06);
  --control-bg: rgba(0, 0, 0, 0.04);
}

.theme-dark .top-bar {
  --topbar-bg: rgba(28, 28, 30, 0.75);
  --topbar-border: rgba(255, 255, 255, 0.1);
  --control-bg: rgba(255, 255, 255, 0.06);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

@media (prefers-color-scheme: dark) {
  .top-bar:not(.theme-light *) {
    --topbar-bg: rgba(28, 28, 30, 0.75);
    --topbar-border: rgba(255, 255, 255, 0.1);
    --control-bg: rgba(255, 255, 255, 0.06);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  }
}

.controls-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.control-group {
  display: flex;
  align-items: center;
}

.component-navigation {
  gap: 8px;
}

.nav-button {
  appearance: none;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  color: var(--text-secondary);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  flex-shrink: 0;
}

.nav-button:hover:not(:disabled) {
  background-color: rgba(0, 0, 0, 0.02);
  color: var(--text-primary);
  border-color: var(--border);
}

.theme-dark .nav-button:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.04);
}

.nav-button:active:not(:disabled) {
  transform: scale(0.95);
}

.nav-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-button:focus-visible {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.12);
}

.nav-button svg {
  width: 12px;
  height: 12px;
}

.divider {
  width: 1px;
  height: 24px;
  background-color: var(--border);
  opacity: 0.6;
}

.theme-controls {
  gap: var(--spacing-md);
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  /* Используем переменную для фона контрола */
  background: var(--control-bg, rgba(0, 0, 0, 0.04));
  padding: 5px 10px 5px 8px;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.color-picker-wrapper:hover {
  background: rgba(0, 0, 0, 0.06);
  border-color: rgba(0, 0, 0, 0.05);
}

.theme-dark .color-picker-wrapper:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.05);
}

.hex-input {
  background: transparent;
  border: none;
  width: 70px;
  font-family: var(--font-system);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  outline: none;
  text-align: center;
  letter-spacing: 0.02em;
}

.hex-input:focus {
  color: var(--accent-primary);
}

.hex-input:focus {
  color: var(--text-primary);
}

@media (max-width: 600px) {
  .top-bar {
    width: 90%;
    height: auto;
    padding: var(--spacing-sm);
    flex-direction: column;
    border-radius: var(--radius-md);
  }

  .controls-container {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}
</style>
