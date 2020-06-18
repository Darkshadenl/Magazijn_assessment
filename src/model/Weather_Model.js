export default class Weather_Model {

    #weather;


    parseWeatherData(weatherData) {
        let temperature = weatherData.main.temp - 273.15;
        temperature = temperature.toFixed(2);
        let cityName = weatherData.name;
        let weather = {city: cityName, type: weatherData.weather[0].main, temp: temperature};
        return weather;
    }

    setWeather(weatherData) {
        this.#weather = this.parseWeatherData(weatherData);
    }

    get weather() {
        return this.#weather;
    }
};