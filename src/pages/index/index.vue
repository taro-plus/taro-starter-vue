<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter';
import { Add } from '@nutui/icons-vue-taro';
import { storeToRefs } from 'pinia';

const counterStore = useCounterStore();
const { count } = storeToRefs(counterStore);
const add = () => {
  counterStore.increment();
};
</script>

<template>
  <view class="index">
    <Add color="red" />

    <nut-button @click="add">{{ count }}</nut-button>
  </view>
</template>
