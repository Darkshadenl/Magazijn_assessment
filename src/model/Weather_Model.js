export default class Weather_Model {

    #weather;

    #parseWeatherData(weatherJSON) {
        let temperature = weatherJSON.main.temp - 273.15;
        temperature = temperature.toFixed(2);
        let weather = {city: weatherJSON.name, type: weatherJSON.weather[0].main, temp: temperature};
        return weather;
        //console.log(weatherData.name);
        //console.log(weatherData.weather[0].main);
        //console.log(weatherData.main.temp - 273.15);
    }

    setWeather(weatherJSON) {
        let weather = this.#parseWeatherData(weatherJSON);
        this.#weather = weather;
        console.log(weather);
        console.log("is set");
    }

    get weather() {
        return this.#weather;
    }
};