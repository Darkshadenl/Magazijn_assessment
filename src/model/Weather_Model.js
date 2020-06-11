export default class Weather_Model {

    parseWeatherData(weatherData) {
        let promise = Promise.resolve(weatherData);
        let weather;

        promise.then(function(val) {
            weather = val;
        });

        return weather;
    }
};