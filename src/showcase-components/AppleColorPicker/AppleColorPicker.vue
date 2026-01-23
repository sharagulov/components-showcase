<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isOpen = ref(false);
const popoverRef = ref<HTMLElement | null>(null);

const presets = [
  '#000000', '#1D1D1F', '#424245', '#86868B', '#A1A1A6', '#D2D2D7', '#E5E5E7', '#F5F5F7', '#FFFFFF',
  '#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#0071E3', '#5E5CE6', '#AF52DE', '#FF2D55', '#A2845E'
];

const toggle = () => isOpen.value = !isOpen.value;

const selectColor = (color: string) => {
  emit('update:modelValue', color);
};

const handleClickOutside = (event: MouseEvent) => {
  if (popoverRef.value && !popoverRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => window.addEventListener('mousedown', handleClickOutside));
onUnmounted(() => window.removeEventListener('mousedown', handleClickOutside));
</script>

<template>
  <div class="apple-color-picker" ref="popoverRef">
    <button
      class="picker-trigger"
      @click="toggle"
      :style="{ backgroundColor: modelValue }"
      :title="modelValue"
    ></button>

    <Transition name="popover">
      <div v-if="isOpen" class="picker-popover">
        <div class="presets-grid">
          <button
            v-for="color in presets"
            :key="color"
            class="color-preset"
            :style="{ backgroundColor: color }"
            :class="{ 'is-selected': modelValue.toUpperCase() === color.toUpperCase() }"
            @click="selectColor(color)"
          ></button>
        </div>

        <div class="custom-input-section">
          <div class="hex-label">HEX</div>
          <input
            type="text"
            :value="modelValue"
            @input="e => selectColor((e.target as HTMLInputElement).value)"
            class="hex-field"
            maxlength="7"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.apple-color-picker {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.picker-trigger {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
}

.theme-dark .picker-trigger {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2);
}

.picker-trigger:hover {
  transform: scale(1.05);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2), 0 2px 4px rgba(0, 0, 0, 0.05);
}

.picker-popover {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
  background-color: var(--bg-popover, rgba(255, 255, 255, 0.95));
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid var(--border-popover, rgba(0, 0, 0, 0.07));
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-popover, 0 12px 40px rgba(0, 0, 0, 0.12));
  padding: 16px;
  z-index: 1002;
  box-sizing: border-box;
}

.theme-light .picker-popover {
  --bg-popover: rgba(255, 255, 255, 0.95);
  --border-popover: rgba(0, 0, 0, 0.07);
  --shadow-popover: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.theme-dark .picker-popover {
  --bg-popover: rgba(44, 44, 46, 0.9);
  --border-popover: rgba(255, 255, 255, 0.08);
  --shadow-popover: 0 12px 40px rgba(0, 0, 0, 0.3);
}

@media (prefers-color-scheme: dark) {
  .picker-popover:not(.theme-light *) {
    --bg-popover: rgba(44, 44, 46, 0.9);
    --border-popover: rgba(255, 255, 255, 0.08);
    --shadow-popover: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
}

.presets-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.color-preset {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}

.theme-dark .color-preset {
  border-color: rgba(255, 255, 255, 0.1);
}

.color-preset:hover {
  transform: scale(1.08);
  z-index: 1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.color-preset.is-selected {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

.custom-input-section {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.hex-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-tertiary);
  text-transform: uppercase;
}

.hex-field {
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 6px 8px;
  font-family: var(--font-system);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-primary);
  outline: none;
  text-align: center;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.hex-field:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1);
}

.popover-enter-active,
.popover-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.popover-enter-from,
.popover-leave-to {
  opacity: 0;
  transform: translate(-50%, -8px) scale(0.95);
}

.popover-enter-to,
.popover-leave-from {
  opacity: 1;
  transform: translate(-50%, 0) scale(1);
}
</style>
