<script setup lang="ts">
import AppleColorPicker from '../AppleColorPicker/AppleColorPicker.vue';
import AppleDropdown from '../AppleDropdown/AppleDropdown.vue';
import { getComponentNames } from '../../showcase/registry';

defineProps<{
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

const onHexInput = (emitFn: any, value: string) => {
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    emitFn(value);
  }
};
</script>

<template>
  <header class="top-bar" :class="{ 'is-static': isStatic }">
    <div class="controls-container">
      <div class="control-group">
        <AppleDropdown
          :options="componentNames"
          :model-value="selectedComponent"
          @update:model-value="$emit('update:selectedComponent', $event)"
          placeholder="Component"
        />
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
  height: 52px;
  background-color: var(--topbar-bg, rgba(255, 255, 255, 0.72));
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid var(--border);
  border-radius: 999px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-md);
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

.theme-dark .top-bar {
  --topbar-bg: rgba(28, 28, 30, 0.72);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

@media (prefers-color-scheme: dark) {
  .top-bar {
    --topbar-bg: rgba(28, 28, 30, 0.72);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
}

.controls-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.control-group {
  display: flex;
  align-items: center;
}

.divider {
  width: 1px;
  height: 20px;
  background-color: var(--border);
}

.theme-controls {
  gap: var(--spacing-md);
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  background: var(--bg-secondary);
  padding: 4px 8px 4px 6px;
  border-radius: 999px;
  border: 1px solid var(--border);
}

.hex-input {
  background: transparent;
  border: none;
  width: 70px;
  font-family: var(--font-system);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  outline: none;
  text-align: center;
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
