export default class WeatherController {
    #apiKey = '40f6ccceae954782446b3d4bb031bb70';
    #apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';


    /*getWeatherByCity(city) {
        return new Promise((resolve, reject) => {
            fetch('api.openweathermap.org/data/2.5/weather?q=' + city + ',nl&appid=' + this.#apiKey)
                .then((res) => res.json())
                .then((data) => {
                    if (data.cod && data.cod == 404) {
                        reject(data);
                    }
                    localStorage.setItem('city', data.name);
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }
    */
    getWeatherByCity(city) {
        let url = this.#apiUrl + city + ',nl&appid=' + this.#apiKey;
        fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
                console.log('DATA= ' + data);
            })
            .catch(function() {
                console.log('error in api code url: ' + url);
            });
    }

}