import Weather_Model from "../model/Weather_Model";

export default class WeatherController {
    #apiKey = '40f6ccceae954782446b3d4bb031bb70';
    #apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    #weatherModel;
    #mainController;

    constructor(mainController)
    {
        this.#weatherModel = new Weather_Model();
        this.#mainController = mainController;
    }

    get weatherModel() {
        return this.#weatherModel;
    }

    getWeatherByCity(city) {
        return new Promise((resolve, reject) => {
            let url = this.#apiUrl + city + ',nl&appid=' + this.#apiKey;
            fetch(url)
                .then(function(response) {
                    return response.json();
                })
                .then(function(myJSON) {

                }
                .catch((err) => {
                    reject(err);
                }))
            });
        }


    getWeatherByCityBetter(city) {
        let url = this.#apiUrl + city + ',nl&appid=' + this.#apiKey;

        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.cod != '200') {
                    return Promise.reject(data.cod);
                }

                return Promise.resolve(data);
            });
    }
    // getWeatherByCity(city) {
    //
    //     let url = this.#apiUrl + city + ',nl&appid=' + this.#apiKey;
    //     console.log(url);
    //     fetch(url)
    //         .then((resp) => resp.json()) // Transform the data into json
    //         .then(function(data) {
    //             console.log("weather return" + data.name);
    //             //let weather = {name: data.name, temperature: data.temp};
    //             let weather = {
    //                 name: "test",
    //                 temperature: 5
    //             };
    //
    //             return weather;
    //         })
    //         .catch(function() {
    //             console.log('error in api code url: ' + url);
    //         });
    // }

}