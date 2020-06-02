export default class WeatherController {
    #apiKey = '40f6ccceae954782446b3d4bb031bb70'


    getWeatherByCity(city) {
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
}