<template>
  <div>
    <h1>Конвертация валют</h1>
    <div class="conversion-row">
      <select v-model="fromCurrency">
        <option v-for="currency in currencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
      <input type="number" v-model.number="fromAmount" min="0" @input="updateToAmount" />
      <span v-if="!isFromAmountValid" class="error">Введите положительное число</span>
    </div>
    <div class="conversion-row">
      <select v-model="toCurrency">
        <option v-for="currency in currencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
      <input type="number" v-model.number="toAmount" min="0" @input="updateFromAmount" />
      <span v-if="!isToAmountValid" class="error">Введите положительное число</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useCurrencyStore } from '../stores/currency';

const store = useCurrencyStore();
const { baseCurrency, currencies, rates } = store;

const fromCurrency = ref('RUB');
const toCurrency = ref('USD');
const fromAmount = ref(0);
const toAmount = ref(0);

const isFromAmountValid = computed(() => fromAmount.value >= 0);
const isToAmountValid = computed(() => toAmount.value >= 0);

const updateToAmount = () => {
  if (!isFromAmountValid.value || !rates.value[fromCurrency.value] || !rates.value[toCurrency.value]) return;
  const rate = rates.value[toCurrency.value] / rates.value[fromCurrency.value];
  toAmount.value = Number((fromAmount.value * rate).toFixed(2));
};

const updateFromAmount = () => {
  if (!isToAmountValid.value || !rates.value[fromCurrency.value] || !rates.value[toCurrency.value]) return;
  const rate = rates.value[fromCurrency.value] / rates.value[toCurrency.value];
  fromAmount.value = Number((toAmount.value * rate).toFixed(2));
};

// Установка начальных валют на основе основной валюты
watch(
  () => baseCurrency.value,
  (newBase) => {
    fromCurrency.value = newBase;
    toCurrency.value = currencies.find(c => c !== newBase) || 'USD';
  },
  { immediate: true }
);
</script>

<style scoped>
div { padding: 20px; }
.conversion-row { display: flex; align-items: center; margin: 10px 0; }
select, input { margin-right: 10px; }
.error { color: red; }
</style>