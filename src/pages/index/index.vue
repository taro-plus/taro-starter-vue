<script lang="ts" setup>
import { useCounterStore } from '@/stores';
import { Minus, Plus } from '@nutui/icons-vue-taro';
import { storeToRefs } from 'pinia';

const counterStore = useCounterStore();
const { count } = storeToRefs(counterStore);
</script>

<template>
  <view class="index">
    <text>Counter Value: {{ count }}</text>

    <nut-button @click="counterStore.increment">
      <template #icon>
        <Plus />
      </template>
    </nut-button>

    <nut-button @click="counterStore.decrement">
      <template #icon>
        <Minus />
      </template>
    </nut-button>
  </view>
</template>
