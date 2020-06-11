import Weather_Model from "../model/Weather_Model";

export default class WeatherController {
    #apiKey = '40f6ccceae954782446b3d4bb031bb70';
    #apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    #weatherModel;

    constructor()
    {
        this.#weatherModel = new Weather_Model();
    }

    get weatherModel() {
        return this.#weatherModel;
    }

    getWeatherByCity(city) {
        return new Promise((resolve, reject) => {
            let url = this.#apiUrl + city + ',nl&appid=' + this.#apiKey;
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    if (data.cod && data.cod == 404) {
                        reject(data);
                    }
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        })
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