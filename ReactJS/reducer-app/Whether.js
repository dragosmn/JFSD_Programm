import React, { useReducer, useState } from 'react';

// Action types
const ActionTypes = {
  SET_CITY: 'SET_CITY',
  FETCH_WEATHER_SUCCESS: 'FETCH_WEATHER_SUCCESS',
  FETCH_WEATHER_ERROR: 'FETCH_WEATHER_ERROR',
};

// Reducer function
const weatherReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_CITY:
      return { ...state, city: action.payload };
    case ActionTypes.FETCH_WEATHER_SUCCESS:
      return { ...state, weatherData: action.payload, error: null };
    case ActionTypes.FETCH_WEATHER_ERROR:
      return { ...state, weatherData: null, error: action.payload };
    default:
      return state;
  }
};

const Whether = () => {
  const [state, dispatch] = useReducer(weatherReducer, {
    city: '',
    weatherData: null,
    error: null,
  });

  const apiKey = 'f4adf8a53b335deeed9f79ae104bc0c8';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${apiUrl}?q=${state.city}&appid=${apiKey}`);
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: ActionTypes.FETCH_WEATHER_SUCCESS, payload: data });
      } else {
        dispatch({ type: ActionTypes.FETCH_WEATHER_ERROR, payload: data.message });
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      dispatch({ type: ActionTypes.FETCH_WEATHER_ERROR, payload: 'An error occurred while fetching weather data.' });
    }
  };

  const handleCityChange = (event) => {
    dispatch({ type: ActionTypes.SET_CITY, payload: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter City:
          <input type="text" value={state.city} onChange={handleCityChange} />
        </label>
        <button type="submit">Get Weather</button>
      </form>

      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}

      {state.weatherData && (
        <div>
          <h2>{state.weatherData.name}, {state.weatherData.sys.country}</h2>
          <p>Temperature: {state.weatherData.main.temp} °C</p>
          <p>Weather: {state.weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Whether;
