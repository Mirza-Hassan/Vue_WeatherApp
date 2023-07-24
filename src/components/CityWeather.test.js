import { shallowMount } from '@vue/test-utils';
import CityWeather from '@/components/CityWeather';
import axios from 'axios';

describe('CityWeather', () => {
  it('fetches weather data for a specific city', async () => {
    const mockWeatherData = {
      name: 'City',
      main: {
        temp: 25,
      },
      weather: [
        {
          description: 'Sunny',
        },
      ],
    };
    const city = 'London';

    // Mock the axios get method and return mockWeatherData
    axios.get = jest.fn().mockResolvedValue({ data: mockWeatherData });

    const wrapper = shallowMount(CityWeather, {
      mocks: {
        $axios: axios,
      },
    });

    // Set the city in the input field
    wrapper.find('input').setValue(city);

    // Trigger the searchWeather method
    await wrapper.vm.searchWeather();

    // Assert that loading is false
    expect(wrapper.vm.loading).toBe(false);

    // Assert that error is null
    expect(wrapper.vm.error).toBeNull();

    // Assert that weatherData is set correctly
    expect(wrapper.vm.weatherData).toEqual(mockWeatherData);
  });

  it('handles error during API call', async () => {
    const city = 'InvalidCity';

    // Mock the axios get method and throw an error
    axios.get = jest.fn().mockRejectedValue(new Error('API error'));

    const wrapper = shallowMount(CityWeather, {
      mocks: {
        $axios: axios,
      },
    });

    // Set the city in the input field
    wrapper.find('input').setValue(city);

    // Trigger the searchWeather method
    await wrapper.vm.searchWeather();

    // Assert that loading is false
    expect(wrapper.vm.loading).toBe(false);

    // Assert that error message is set
    expect(wrapper.vm.error).toBe('Error fetching weather data');

    // Assert that weatherData is null
    expect(wrapper.vm.weatherData).toBeNull();
  });

  it('uses cached weather data if available', async () => {
    const mockWeatherData = {
      name: 'City',
      main: {
        temp: 25,
      },
      weather: [
        {
          description: 'Sunny',
        },
      ],
    };
    const city = 'London';

    // Mock the localStorage getItem method to return cached data
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockWeatherData));

    const wrapper = shallowMount(CityWeather);

    // Set the city in the input field
    wrapper.find('input').setValue(city);

    // Trigger the searchWeather method
    await wrapper.vm.searchWeather();

    // Assert that loading is false
    expect(wrapper.vm.loading).toBe(false);

    // Assert that error is null
    expect(wrapper.vm.error).toBeNull();

    // Assert that weatherData is set to cached data
    expect(wrapper.vm.weatherData).toEqual(mockWeatherData);
  });
});
