<template>
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
</template>

<script setup>
import { useCurrencyStore } from '../stores/currency';

const store = useCurrencyStore();
const { baseCurrency, currencies } = store;
</script>

<style scoped>
header { display: flex; justify-content: space-between; padding: 10px; }
nav a { margin-right: 10px; }
</style>