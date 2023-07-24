<template>
  <div class="container">
    <h2>Random Weather</h2>
    <!-- Display loading message when fetching data -->
    <p v-if="loading">Loading...</p>
    <!-- Display error message if there's an error fetching data -->
    <p v-else-if="error" class="alert alert-danger">{{ error }}</p>
    <!-- Display weather data if available -->
    <div v-else-if="weatherData && weatherData.name">
      <p>Location: {{ weatherData.name }}</p>
      <p>Temperature: {{ weatherData.main.temp }}°C</p>
      <p>Description: {{ weatherData.weather[0].description }}</p>
    </div>
    <!-- Display message if location could not be found -->
    <p v-else class="alert alert-info">No weather data found for the random location.</p>
    <!-- Button to fetch random weather data -->
    <button @click="fetchWeather" class="btn btn-primary">Get Random Weather</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      loading: false,
      error: null,
      weatherData: null,
    };
  },
  methods: {
    // Method to fetch random weather data
    async fetchWeather() {
      try {
        this.loading = true;
        const apiKey = ''; // Replace with your actual API key

        // Function to generate random coordinates
        const getRandomCoordinates = () => {
          const latitude = Math.random() * 180 - 90;
          const longitude = Math.random() * 360 - 180;
          return { latitude, longitude };
        };

        const { latitude, longitude } = getRandomCoordinates();

        // Construct the API URL with random coordinates
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        // Fetch weather data from the API
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        // Handle errors during API call
        this.error = 'Error fetching weather data';
      } finally {
        // Reset loading state
        this.loading = false;
      }
    },
  },
};

</script>

