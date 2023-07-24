<template>
  <div id="app">
    <RandomWeather />
    <CityWeather />
  </div>
</template>

<script>
import RandomWeather from './RandomWeather.vue';
import CityWeather from './CityWeather.vue';

  export default {
    name: 'app',
    components: {
      RandomWeather,
      CityWeather,
    },
  }
</script>