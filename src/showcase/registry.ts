import { defineAsyncComponent, markRaw } from 'vue';

// Автоматически находим все Vue компоненты по паттерну: src/showcase-components/<Name>/<Name>.vue
const componentFiles = import.meta.glob('../showcase-components/*/*.vue');
const demoFiles = import.meta.glob<{ demoProps: Record<string, any> }>('../showcase-components/*/demo.ts', { eager: true });

export interface ComponentItem {
  name: string;
  loader: ReturnType<typeof defineAsyncComponent>;
  demoProps?: Record<string, any>;
}

const registry: Record<string, ComponentItem> = {};

for (const path in componentFiles) {
  // Извлекаем имя компонента из пути (например, AppleButton из ../showcase-components/AppleButton/AppleButton.vue)
  const match = path.match(/\.\.\/showcase-components\/(.+)\/\1\.vue$/);

  if (match) {
    const name = match[1];
    const demoPath = `../showcase-components/${name}/demo.ts`;
    const demo = demoFiles[demoPath];

    registry[name] = {
      name,
      loader: markRaw(defineAsyncComponent(componentFiles[path] as any)),
      demoProps: demo?.demoProps
    };
  }
}

export const getComponentRegistry = () => registry;
export const getComponentNames = () => Object.keys(registry);
export const getComponentLoader = (name: string) => registry[name]?.loader;
export const getComponentDemoProps = (name: string) => registry[name]?.demoProps || {};
