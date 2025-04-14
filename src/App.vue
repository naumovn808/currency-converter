<template>
  <div class="main">
    <header>
      <nav>
        <router-link to="/">Главная</router-link>
        <router-link to="/convert">Конвертация</router-link>
      </nav>
      <select v-model="baseCurrency">
        <option v-for="currency in currencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </header>

    <router-view />

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCurrencyStore } from './stores/currency.js';

const store = useCurrencyStore();
const { baseCurrency, currencies } = storeToRefs(store);

onMounted(() => {
  store.fetchRates();
});



</script>

<style scoped>
.main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 30px;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

nav a {
  margin-right: 10px;
}
</style>
