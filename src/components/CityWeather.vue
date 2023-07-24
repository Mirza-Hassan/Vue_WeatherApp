
<template>
  <div class="container">
    <h2>City Weather</h2>
    <!-- Form to search for city weather -->
    <form @submit.prevent="searchWeather" class="mb-3">
      <input type="text" v-model="city" placeholder="Enter city name" required class="form-control" />
      <button type="submit" class="btn btn-primary">Search</button>
    </form>
    <!-- Display loading message when fetching data -->
    <p v-if="loading">Loading...</p>
    <!-- Display error message if there's an error fetching data -->
    <p v-else-if="error" class="alert alert-danger">{{ error }}</p>
    <!-- Display weather data if available -->
    <div v-else-if="weatherData">
      <p>Location: {{ weatherData.name }}</p>
      <p>Temperature: {{ weatherData.main.temp }}°C</p>
      <p>Description: {{ weatherData.weather[0].description }}</p>
    </div>
    <!-- Display message if no weather data is available -->
    <p v-else class="alert alert-info">No weather data available for the provided city.</p>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
  data() {
    return {
      loading: false,
      error: null,
      city: '',
      weatherData: null,
    };
  },
  methods: {
    // Method to search weather data for a specific city
    async searchWeather() {
      try {
        this.loading = true;
        const apiKey = ''; // Replace with your actual API key

        // Check if weather data is already cached
        const cachedData = localStorage.getItem(this.city);
        if (cachedData) {
          // Use cached data if available
          this.weatherData = JSON.parse(cachedData);
        } else {
          // Fetch weather data from the API
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&units=metric`;
          const response = await axios.get(url);
          this.weatherData = response.data;

          // Cache the weather data
          localStorage.setItem(this.city, JSON.stringify(this.weatherData));
        }
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
  
