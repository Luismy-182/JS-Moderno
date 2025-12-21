<script setup>
//forma de composition API
import Button from './components/Button.vue';
import Header from './components/Header.vue';
import { ref, computed, watch } from 'vue';
import { calcularTotal } from './helpers';

const cantidad = ref(10000);
const MIN = 0;
const MAX = 20000;
const STEP = 100;
const meses=ref(6); //state de 6 meses
const total = ref(calcularTotal(cantidad.value, meses.value))

const formatearMoneda = (valor) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(valor);
};
watch([cantidad, meses], ()=>{
  total.value = calcularTotal(cantidad.value, meses.value);
});

const pagoMensual =computed(()=>{
  return total.value/meses.value;
});

const handleCHangeRestar = () => {
  //restamos con el step
  const valor = cantidad.value - STEP;
  (valor < MIN) ? alert('Valor invalido') : cantidad.value = valor;

}

const handleCHangeSumar = () => {
  //sumamos con el step
  const valor = cantidad.value + STEP;
  (valor > MAX) ? alert('superaste el limite') : cantidad.value = valor;
}
</script>

<template>
  <div class="my-20 max-w-lg mx-auto shadow p-10 bg-white">
    <Header />

    <div class="flex justify-between mt-10">

      <Button :operador="'-'" :fn="handleCHangeRestar" />

      <Button :operador="'+'" :fn="handleCHangeSumar" />


    </div>

    <div class="my-5">
      <input type="range" class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600" name="" id="" :step="STEP"
      :max="MAX" 
      :min="MIN" 
      v-model.number="cantidad" 
      />

      <p class="text-center my-10 text-5xl font-extrabold text-indigo-600">{{ formatearMoneda(cantidad) }}</p>

      <h2 class="text-2xl font-extrabold text-gray-500 text-center ">Elige un <span class="text-indigo-600">plazo</span> a pagar
      </h2>

      <select class="w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500 mt-5"
      :value="meses"
      v-model.number="meses"
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>
    </div>

    <div class="my-5 space-y-3 bg-gray-50 p-5">
      <h2 class="text-2xl font-extrabold text-gray-500 text-center">
        Resumen <span class="text-indigo-600">de pagos</span>
      </h2>
      <p class="text-xl text-gray-500 text-center font-bold">{{meses}} Meses</p>
      <p class="text-xl text-gray-500 text-center font-bold"> Total a pagar: {{formatearMoneda(total) }} </p>
      <p class="text-xl text-gray-500 text-center font-bold">Mensuales: {{ formatearMoneda(pagoMensual) }} </p>
    </div>

  </div>
</template>
