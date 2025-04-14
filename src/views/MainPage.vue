<template>
  <div>
    <h1>Курсы валют относительно {{ baseCurrency }}</h1>
    <ul>
      <li v-for="currency in filteredCurrencies" :key="currency">
        1 {{ currency }} = {{ getRate(currency) }} {{ baseCurrency }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCurrencyStore } from '../stores/currency';

const store = useCurrencyStore();
const { baseCurrency, currencies, rates } = store;

const filteredCurrencies = computed(() => currencies.filter(c => c !== baseCurrency.value));

const getRate = (currency) => {
  if (!rates.value[currency] || !rates.value[baseCurrency.value]) return 'N/A';
  const rate = rates.value[baseCurrency.value] / rates.value[currency];
  return rate.toFixed(2);
};
</script>

<style scoped>
div { padding: 20px; }
</style>