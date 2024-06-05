## Overview

WeatherWatch is a web application that allows users to check the weather information of their current location or any other location on the map.

## Screenshots

![App Screenshot](https://github.com/Mani-Sankar01/weather-watch/blob/main/app.png?raw=true "Optional Title")

## Installation

Follow the below steps to install/run locally on your machine.

```bash
  git clone repo-url
  cd [project-dir]
```

Create a .env file in the root directory and add your OpenWeatherMap API key in the following format:

```bash
  VITE_SECRET_KEY=your_api_key_here
  cd [project-dir]
```

```bash
  npm install
  npm run dev
```

You have cloned/installed all the dependency. Now open Chrome and visit

```bash
  localhost:5173
```

## API Reference

#### Get API Key

```http
  https://openweathermap.org/api
```

| Parameter         | Type     | Description                |
| :---------------- | :------- | :------------------------- |
| `VITE_SECRET_KEY` | `string` | **Required**. Your API key |

```http
  https://leafletjs.com/
```

## Features

- Get current weather information based on user's location.
- View weather information on the map.
- Display recent search history.
- Convert temperature units between Celsius and Fahrenheit.Cross platform
- Responsive design for mobile and desktop.

## Tech Stack

**Client:** React, React Leaflet, OpenWeatherMap API, TailwindCSS, Lucide-React, TypeScript
