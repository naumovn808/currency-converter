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
      rates.value = data;
    } catch (error) {
      console.error('Ошибка загрузки курсов:', error);
      // Заглушка на случай недоступности API
      rates.value = { USD: 1, EUR: 0.85, RUB: 91.45 };
    }
  };

  return { baseCurrency, currencies, rates, fetchRates };
});