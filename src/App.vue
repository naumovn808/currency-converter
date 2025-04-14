<template>
  <Header />
  <router-view />
</template>

<script setup>
import Header from './components/Header/Header.vue';
import { useCurrencyStore } from './stores/currency';

const store = useCurrencyStore();
store.fetchRates();
</script>

<style>
body { font-family: Arial, sans-serif; }
</style>