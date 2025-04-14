<template>
  <div class="convert-page">
    <h1>Конвертер валют</h1>

    <div class="row" v-for="(row, index) in 2" :key="index">
      <select v-model="selectedCurrencies[index]" @change="onCurrencyChange">
        <option v-for="currency in currencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>

      <input type="text" v-model="inputs[index]" @input="onInput(index)"
        :class="{ error: errors[index] || sameCurrencyError }" :disabled="sameCurrencyError" />
    </div>

    <p v-if="sameCurrencyError" class="error-message">Выберите разные валюты</p>
    <p v-else-if="errors.some(Boolean)" class="error-message">Введите корректное число</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useCurrencyStore } from '../stores/currency';

const store = useCurrencyStore();
const { currencies, baseCurrency, rates } = storeToRefs(store);

const selectedCurrencies = ref([
  baseCurrency.value,
  currencies.value.find(c => c !== baseCurrency.value),
]);

const inputs = ref(['', '']);
const errors = ref([false, false]);
const isUpdating = ref(false);

const sameCurrencyError = ref(false);

const getRate = (from, to) => {
  const direct = rates.value[from]?.[to];
  const inverse = rates.value[to]?.[from];
  if (direct) return direct;
  if (inverse) return 1 / inverse;
  return null;
};

const convert = (fromIndex, toIndex) => {
  const fromCurrency = selectedCurrencies.value[fromIndex];
  const toCurrency = selectedCurrencies.value[toIndex];
  const amount = parseFloat(inputs.value[fromIndex]);

  if (fromCurrency === toCurrency) {
    sameCurrencyError.value = true;
    inputs.value[toIndex] = '';
    return;
  } else {
    sameCurrencyError.value = false;
  }

  if (inputs.value[fromIndex] === '' || isNaN(amount)) {
    errors.value[fromIndex] = false; 
    return;
  }

  const rate = getRate(fromCurrency, toCurrency);
  if (rate !== null) {
    inputs.value[toIndex] = (amount * rate).toFixed(2);
    errors.value[toIndex] = false;
  } else {
    inputs.value[toIndex] = '';
  }

  errors.value[fromIndex] = false;
};

const onInput = (index) => {
  if (isUpdating.value || sameCurrencyError.value) return;

  isUpdating.value = true;
  const otherIndex = index === 0 ? 1 : 0;
  convert(index, otherIndex);
  isUpdating.value = false;
};

const onCurrencyChange = () => {
  convert(0, 1);
};

watch(selectedCurrencies, () => {
  convert(0, 1);
});
</script>

<style scoped>
.convert-page {
  padding: 20px;
  max-width: 400px;
  margin: auto;
}

.row {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

select,
input {
  flex: 1;
  padding: 8px;
  font-size: 16px;
}

input.error {
  border: 1px solid red;
}

.error-message {
  color: red;
  text-align: center;
}
</style>
