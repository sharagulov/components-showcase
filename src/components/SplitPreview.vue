<script setup lang="ts">
import { computed, onErrorCaptured, ref, watch } from 'vue';
import { getComponentLoader, getComponentDemoProps } from '../showcase/registry';
import AppleButton from '../showcase-components/AppleButton/AppleButton.vue';

const props = defineProps<{
  componentName: string;
  bgLight: string;
  bgDark: string;
}>();

const error = ref<Error | null>(null);
const themeLeft = ref<'light' | 'dark'>('light');
const themeRight = ref<'light' | 'dark'>('dark');

const toggleLeftTheme = () => {
  themeLeft.value = themeLeft.value === 'light' ? 'dark' : 'light';
};

const toggleRightTheme = () => {
  themeRight.value = themeRight.value === 'light' ? 'dark' : 'light';
};

// Сбрасываем ошибку при смене компонента
watch(() => props.componentName, () => {
  error.value = null;
});

const asyncComp = computed(() => {
  const loader = getComponentLoader(props.componentName);
  return loader || null;
});

const demoProps = computed(() => getComponentDemoProps(props.componentName));

// Перехват ошибок загрузки компонента
onErrorCaptured((e) => {
  error.value = e as Error;
  return false;
});
</script>

<template>
  <main class="split-preview">
    <!-- Левая половина -->
    <section
      class="preview-half left"
      :class="[`theme-${themeLeft}`]"
      :style="{ '--half-bg': bgLight }"
    >
      <div class="component-container">
        <div v-if="error" class="error-msg">
          Failed to load {{ componentName }}
        </div>
        <Suspense v-else-if="asyncComp">
          <component :is="asyncComp" v-bind="demoProps" />
          <template #fallback>
            <div class="loader">
              <div class="spinner"></div>
            </div>
          </template>
        </Suspense>
      </div>

      <div class="theme-toggle-container">
        <AppleButton
          :label="themeLeft === 'light' ? 'Switch to Dark' : 'Switch to Light'"
          variant="secondary"
          @click="toggleLeftTheme"
          class="theme-toggle-btn"
        />
      </div>
    </section>

    <!-- Правая половина -->
    <section
      class="preview-half right"
      :class="[`theme-${themeRight}`]"
      :style="{ '--half-bg': bgDark }"
    >
      <div class="component-container">
        <div v-if="error" class="error-msg">
          Failed to load {{ componentName }}
        </div>
        <Suspense v-else-if="asyncComp">
          <component :is="asyncComp" v-bind="demoProps" />
          <template #fallback>
            <div class="loader">
              <div class="spinner"></div>
            </div>
          </template>
        </Suspense>
      </div>

      <div class="theme-toggle-container">
        <AppleButton
          :label="themeRight === 'light' ? 'Switch to Dark' : 'Switch to Light'"
          variant="secondary"
          @click="toggleRightTheme"
          class="theme-toggle-btn"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.split-preview {
  display: flex;
  width: 100%;
  height: 100vh;
}

.preview-half {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--half-bg);
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
  color: var(--text-primary);
}

.preview-half.left {
  border-right: 1px solid var(--border);
}

.component-container {
  padding: var(--spacing-4xl);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
}

.theme-toggle-container {
  padding: var(--spacing-xl);
  width: 100%;
  display: flex;
  justify-content: center;
  background: linear-gradient(to top, var(--half-bg) 80%, transparent);
}

.theme-toggle-btn {
  scale: 0.85;
  opacity: 0.8;
}

.theme-toggle-btn:hover {
  opacity: 1;
  scale: 0.9;
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(128, 128, 128, 0.1);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-msg {
  color: var(--status-error);
  font-family: var(--font-system);
  font-size: var(--font-small-size);
  background: rgba(255, 59, 48, 0.1);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-sm);
}

@media (max-width: 768px) {
  .split-preview {
    flex-direction: column;
  }

  .preview-half {
    height: 50%;
  }

  .preview-half.left {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}
</style>
