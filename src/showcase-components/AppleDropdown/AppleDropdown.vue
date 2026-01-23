<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  options: string[];
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (name: string) => {
  emit('update:modelValue', name);
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
  <div class="apple-dropdown" ref="dropdownRef">
    <button
      class="apple-select-trigger"
      @click="toggleMenu"
      :class="{ 'is-active': isOpen }"
    >
      <span class="selected-value">{{ modelValue || placeholder || 'Select option' }}</span>
    </button>

    <Transition name="menu">
      <div v-if="isOpen" class="apple-menu">
        <div
          v-for="name in options"
          :key="name"
          class="apple-menu-item"
          :class="{ 'is-selected': name === modelValue }"
          @click="selectOption(name)"
        >
          <div class="item-content">
            <span class="selection-dot" :class="{ 'is-visible': name === modelValue }"></span>
            {{ name }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.apple-dropdown {
  position: relative;
  display: inline-block;
}

.apple-select-trigger {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%2386868b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m3 4.5 3 3 3-3'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0 36px 0 16px;
  height: 34px;
  font-family: var(--font-system);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  color: var(--text-primary);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 140px;
  display: flex;
  align-items: center;
  text-align: left;
}

.apple-select-trigger:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.theme-dark .apple-select-trigger:hover {
  background-color: rgba(255, 255, 255, 0.04);
}

.apple-select-trigger.is-active,
.apple-select-trigger:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.12);
}

.apple-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 180px;
  background-color: var(--bg-menu, rgba(255, 255, 255, 0.95));
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid var(--border-menu, rgba(0, 0, 0, 0.08));
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-menu, 0 10px 40px rgba(0, 0, 0, 0.1));
  padding: 4px;
  z-index: 1001;
  overflow: hidden;
}

.theme-light .apple-menu {
  --bg-menu: rgba(255, 255, 255, 0.95);
  --border-menu: rgba(0, 0, 0, 0.08);
  --shadow-menu: 0 10px 40px rgba(0, 0, 0, 0.06);
}

.theme-dark .apple-menu {
  --bg-menu: rgba(44, 44, 46, 0.9);
  --border-menu: rgba(255, 255, 255, 0.08);
  --shadow-menu: 0 10px 40px rgba(0, 0, 0, 0.3);
}

@media (prefers-color-scheme: dark) {
  .apple-menu:not(.theme-light *) {
    --bg-menu: rgba(44, 44, 46, 0.9);
    --border-menu: rgba(255, 255, 255, 0.08);
    --shadow-menu: 0 10px 40px rgba(0, 0, 0, 0.3);
  }
}

.apple-menu-item {
  padding: 6px 12px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-primary);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-bottom: 2px;
}

.apple-menu-item:last-child {
  margin-bottom: 0;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.selection-dot {
  width: 6px;
  height: 6px;
  background-color: var(--accent-primary);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.selection-dot.is-visible {
  opacity: 1;
}

.apple-menu-item:hover {
  background-color: rgba(0, 113, 227, 0.08);
}

.theme-dark .apple-menu-item:hover {
  background-color: rgba(0, 113, 227, 0.12);
}

.apple-menu-item.is-selected {
  background-color: rgba(0, 113, 227, 0.12);
  color: var(--text-primary);
}

.theme-light .apple-menu-item.is-selected {
  background-color: rgba(0, 113, 227, 0.12);
  color: #000;
}

.theme-dark .apple-menu-item.is-selected {
  background-color: rgba(0, 113, 227, 0.25);
  color: #ffffff;
}

@media (prefers-color-scheme: dark) {
  .apple-menu-item.is-selected {
    background-color: rgba(0, 113, 227, 0.25);
    color: #ffffff;
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
</style>
