<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TopBar from './showcase-components/TopBar/TopBar.vue';
import SplitPreview from './components/SplitPreview.vue';
import { getComponentNames } from './showcase/registry';

const names = getComponentNames();

// Состояние (с инициализацией из URL)
const selectedComponent = ref(names[0] || '');
const bgLight = ref('#ffffff');
const bgDark = ref('#000000');

// Восстановление из URL
onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const comp = params.get('component');
  const bl = params.get('bgL');
  const bd = params.get('bgD');

  if (comp && names.includes(comp)) selectedComponent.value = comp;
  if (bl) bgLight.value = bl;
  if (bd) bgDark.value = bd;
});

// Синхронизация с URL при изменении
const updateUrl = () => {
  const url = new URL(window.location.href);
  url.searchParams.set('component', selectedComponent.value);
  url.searchParams.set('bgL', bgLight.value);
  url.searchParams.set('bgD', bgDark.value);
  window.history.replaceState({}, '', url.toString());
};

const onCompUpdate = (val: string) => {
  selectedComponent.value = val;
  updateUrl();
};

const onBgLUpdate = (val: string) => {
  bgLight.value = val;
  updateUrl();
};

const onBgDUpdate = (val: string) => {
  bgDark.value = val;
  updateUrl();
};
</script>

<template>
  <div class="showcase-app">
    <TopBar
      :selected-component="selectedComponent"
      :bg-light="bgLight"
      :bg-dark="bgDark"
      @update:selected-component="onCompUpdate"
      @update:bg-light="onBgLUpdate"
      @update:bg-dark="onBgDUpdate"
    />

    <SplitPreview
      v-if="selectedComponent"
      :component-name="selectedComponent"
      :bg-light="bgLight"
      :bg-dark="bgDark"
    />

    <div v-else class="empty-state">
      No components found in <code>src/components/</code>
    </div>
  </div>
</template>

<style>
.showcase-app {
  width: 100%;
  min-height: 100vh;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: var(--font-system);
  color: var(--text-secondary);
}
</style>
