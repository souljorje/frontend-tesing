<template>
  <div>
    <form action="#" @submit.prevent="mutate('decrement')">
      <label>
        Decrement by:
        <input type="number" v-model.number="decrementValue">
      </label>
      <button type="submit">Make!</button>
    </form>
    <form action="#" @submit.prevent="mutate('increment')">
      <label>
        Increment by:
        <input type="number" v-model.number="incrementValue">
      </label>
      <button type="submit">Make!</button>
    </form>
    <div>
      Mutate by 1:
      <button @click="decrement(1)">Decrement</button>
      <button @click="increment(1)">Increment</button>
    </div>
    <button @click="reset">Reset</button>
    <div class="value">{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: 'counter',
  data() {
    return {
      value: this.initialValue,
      decrementValue: 0,
      incrementValue: 0,
    };
  },
  props: {
    initialValue: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    value() {
      this.emit('valueChanged', this.value);
    },
  },
  methods: {
    increment(value = 1) {
      this.value += value;
    },
    decrement(value = 1) {
      this.value -= value;
    },
    mutate(actionType) {
      this[actionType](this[`${actionType}Value`]);
      this[`${actionType}Value`] = null;
    },
    reset() {
      this.value = 0;
    },
  },
};
</script>
