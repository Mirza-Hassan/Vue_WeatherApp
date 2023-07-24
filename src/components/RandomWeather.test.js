import { shallowMount } from '@vue/test-utils';
import RandomWeather from '@/components/RandomWeather';
import axios from 'axios';

describe('RandomWeather', () => {
  let wrapper;

  beforeEach(() => {
    // Create a mock for $axios
    const $axios = axios.create();

    // Assign the mock $axios to the wrapper
    wrapper = shallowMount(RandomWeather, {
      mocks: {
        $axios,
      },
    });
  });

  it('fetches weather data successfully', async () => {
    // Trigger the fetchWeather method
    await wrapper.vm.fetchWeather();

    // Assert that loading is false
    expect(wrapper.vm.loading).toBe(false);

    // Assert that error is null
    expect(wrapper.vm.error).toBeNull();

    // Assert that weatherData is not null
    expect(wrapper.vm.weatherData).not.toBeNull();
  });

  it('handles error during API call', async () => {
    // Trigger the fetchWeather method
    await wrapper.vm.fetchWeather().catch(error => {
      // Assert that loading is false
      expect(wrapper.vm.loading).toBe(false);
  
      // Assert that error message is set
      expect(wrapper.vm.error).toBe('Error fetching weather data');
  
      // Assert that weatherData is null
      expect(wrapper.vm.weatherData).toBeNull();
    });
  });
  
});
