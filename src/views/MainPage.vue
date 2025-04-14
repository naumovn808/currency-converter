<template>
  <div class="main-page">
    <h1>Курсы валют относительно {{ baseCurrency }}</h1>
    <ul v-if="rates[baseCurrency] || Object.values(rates).some(r => r[baseCurrency])">
      <li v-for="currency in filteredCurrencies" :key="currency">
        1 {{ baseCurrency }} = {{ getRate(currency) }} {{ currency }}
      </li>
    </ul>
    <p v-else>Загрузка курсов...</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCurrencyStore } from '../stores/currency';

const store = useCurrencyStore();
const { baseCurrency, currencies, rates } = storeToRefs(store);

const filteredCurrencies = computed(() =>
  currencies.value.filter(c => c !== baseCurrency.value)
);

const getRate = (currency) => {
  const direct = rates.value[currency]?.[baseCurrency.value];
  const inverse = rates.value[baseCurrency.value]?.[currency];

  if (direct) return direct.toFixed(2);
  if (inverse) return (1 / inverse).toFixed(2);
  return 'N/A';
};

</script>
<style scoped>
.main-page {
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
}
</style>
