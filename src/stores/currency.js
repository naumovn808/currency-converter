import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCurrencyStore = defineStore('currency', () => {
  const baseCurrency = ref('RUB');
  const currencies = ref(['USD', 'EUR', 'RUB']);
  const rates = ref({});

  const fetchRates = async () => {
    try {
      const response = await fetch('https://status.neuralgeneration.com/api/currency');
      const data = await response.json();

      const structuredRates = {};

      for (const pair in data) {
        const [from, to] = pair.toUpperCase().split('-');
        if (!structuredRates[from]) structuredRates[from] = {};
        structuredRates[from][to] = data[pair];
      }

      rates.value = structuredRates;

    } catch (error) {
      console.error('Ошибка загрузки курсов:', error);
    }
  };

  return { baseCurrency, currencies, rates, fetchRates };
});