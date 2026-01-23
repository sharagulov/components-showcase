<script setup lang="ts">
defineProps<{
  links?: { label: string; url: string }[];
}>();
</script>

<template>
  <header class="apple-header">
    <div class="header-content">
      <div class="logo"></div>
      <nav class="nav-links">
        <a v-for="link in links" :key="link.label" :href="link.url" class="nav-link">
          {{ link.label }}
        </a>
      </nav>
      <div class="actions">
        <button class="search-btn">🔍</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.apple-header {
  width: 100%;
  max-width: 1024px;
  background-color: var(--header-bg, rgba(255, 255, 255, 0.8));
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--border);
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--spacing-md);
  margin: 0 auto;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.theme-dark .apple-header {
  --header-bg: rgba(28, 28, 30, 0.8);
}

@media (prefers-color-scheme: dark) {
  .apple-header {
    --header-bg: rgba(28, 28, 30, 0.8);
  }
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 20px;
  color: var(--text-primary);
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: var(--spacing-lg);
}

.nav-link {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--text-primary);
  opacity: 0.9;
}

.search-btn {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.8;
}

.search-btn:hover {
  opacity: 0.95;
}

@media (max-width: 600px) {
  .nav-links {
    display: none;
  }
}
</style>
