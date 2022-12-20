const form = document.querySelector("form")
const ville = document.querySelector("input")
const forecastToday = document.querySelector("div.forecast p.temperature");
const currentWeather = document.querySelector('.weather')
let elCity = document.querySelector("div.today h2")
let currentDate = document.querySelector(".time")
let currentHumidity = document.querySelector('.humidity')
let nextHoursContainer = document.querySelector(".nextHoursContainer")
let backGroundImage = document.querySelector(".topImage")

let days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",]
let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]

const d = new Date();

let month = d.getMonth()
let day = d.getDay();
let hour = d.getHours();
let minutes = d.getMinutes();

let date = d.getDate()
let time = d.getTime()

let currentTime = days[day] + " " + date + " " + months[month] + " " + hour + ":" + minutes

currentDate.innerText = currentTime

form.addEventListener("submit", e => {
    e.preventDefault()
    console.log(d.getDay());

    let adress = ville.value

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '27169919bemshe28a722293c7209p156d66jsnbac7cb8f8b3d',
            'X-RapidAPI-Host': 'spott.p.rapidapi.com'
        }
    };

    fetch(`https://spott.p.rapidapi.com/places/autocomplete?limit=10&skip=0&language=%20fr&country=FR&q=${adress}`, options)
        .then(response => response.json())
        .then(response => {
            let cityName = response[0].name
            let latitude = response[0].coordinates.latitude
            let longitude = response[0].coordinates.longitude
            console.log(response);


            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`)
                .then(rep => rep.json())
                .then(rep => {
                    elCity.innerText = cityName

                    currentDate.innerText = currentTime

                    let currentTemp = rep.hourly.temperature_2m[hour] + "°C"
                    let time = rep.hourly.time[hour]

                    forecastToday.innerText = currentTemp
                    currentWeather.innerText = weatherCode(rep.current_weather.weathercode)
                    currentHumidity.innerText = rep.hourly.relativehumidity_2m[hour] + "% d'humidité"

                    let arrayIndex = hour

                    nextHoursContainer.innerHTML= ''
                    nextHoursContainer.classList.add("active")

                    for (let index = 0; index <= 5; index++) {
                        arrayIndex = arrayIndex + 3
                        if (arrayIndex >= 24) {
                            arrayIndex = 0
                            day++
                        }

                        elDiv = document.createElement("div")
                        elDiv.classList.add("nextHourForecast")
                        elDiv.innerHTML = `
                            <div class='time'>
                                <p>${date}/${month} à ${arrayIndex}:00</p>
                                <p>${weatherCode(rep.hourly.weathercode[arrayIndex])}</p>
                            </div>
                            <img class="imageWeather" src="${weatherIcon(rep.hourly.weathercode[arrayIndex])}" alt="Icone de prévision météo">
                            <div class="temp">
                                <p>${rep.hourly.temperature_2m[arrayIndex]}°C</p>
                                <p>${rep.hourly.relativehumidity_2m[arrayIndex]}% d'humidité</p>
                            </div>
                        `
                        nextHoursContainer.append(elDiv)
                    }
                })
        })
        .catch(err => console.error(err));
})

function weatherCode(code) {
    let weatherResponse = ""

    if (code === 0) {
        weatherResponse = "Ciel dégagé"
        return weatherResponse
    }
    if (code > 0 && code < 4) {
        weatherResponse = "ciel légerement couvert"
        return weatherResponse
    }
    if (code > 45 && code < 49) {
        weatherResponse = "broullard"
        return weatherResponse
    }
    if (code > 50 && code < 56) {
        weatherResponse = "Bruine"
        return weatherResponse
    }
    if (code > 55 && code < 58) {
        weatherResponse = "Bruine verglaçante"
        return weatherResponse
    }
    if (code > 60 && code < 68) {
        weatherResponse = "Pluie"
        return weatherResponse
    }
    if (code > 70 && code < 76) {
        weatherResponse = "Pluie verglaçante"
        return weatherResponse
    }
    if (code === 77) {
        weatherResponse = "Neige en grain"
        return weatherResponse
    }
    if (code > 79 && code < 83) {
        weatherResponse = "Averse"
        return weatherResponse
    }
    if (code > 84 && code < 87) {
        weatherResponse = "Averse de neige"
        return weatherResponse
    }
    if (code === 95) {
        weatherResponse = "Orage"
        return weatherResponse
    }
    if (code > 95 && code < 100) {
        weatherResponse = "Orage avec grêle"
        return weatherResponse
    }
}

function weatherIcon(code) {
    if (code === 0) {
        backGroundImage.style.backgroundImage = "url('https://st3.depositphotos.com/1000152/13529/i/600/depositphotos_135294716-stock-photo-blue-sky-background.jpg')";
        imageWeather = "./img/meteo-icons/sun.png"
        return imageWeather
    }
    if (code > 0 && code < 4) {
        backGroundImage.style.backgroundImage = "url('https://t4.ftcdn.net/jpg/03/11/92/15/360_F_311921589_r95JHhDAG9Qi2RSnzIMqAZWspQ2vgMWO.jpg')";
        imageWeather = "./img/meteo-icons/cloudy.png"
        return imageWeather
    }
    if (code > 45 && code < 49) {
        backGroundImage.style.backgroundImage = "url('https://st3.depositphotos.com/2949325/32634/i/450/depositphotos_326344060-stock-photo-dark-foggy-autumn-countriside-view.jpg')";
        imageWeather = "./img/meteo-icons/foggy.png"
        return imageWeather
    }
    if (code > 50 && code < 56) {
        backGroundImage.style.backgroundImage = "url('https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/odeur-pluie.jpg')";
        imageWeather = "./img/meteo-icons/rain.png"
        return imageWeather
    }
    if (code > 55 && code < 58) {
        backGroundImage.style.backgroundImage = "url('https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/odeur-pluie.jpg')";
        imageWeather = "./img/meteo-icons/rain.png"
        return imageWeather
    }
    if (code > 60 && code < 68) {
        backGroundImage.style.backgroundImage = "url('https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/odeur-pluie.jpg')";
        imageWeather = "./img/meteo-icons/rainy.png"
        return imageWeather
    }
    if (code > 70 && code < 76) {
        backGroundImage.style.backgroundImage = "url('https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/odeur-pluie.jpg')";
        imageWeather = "./img/meteo-icons/rainy.png"
        return imageWeather
    }
    if (code === 77) {
        backGroundImage.style.backgroundImage = "url('https://resize-parismatch.lanmedia.fr/var/pm/public/media/image/2022/04/01/15/Les-images-de-la-France-sous-la-neige.jpg?VersionId=LWbX13lKu3RO.NdFuZoeL9I3seWEF2Pz')";
        imageWeather = "./img/meteo-icons/snow.png"
        return imageWeather
    }
    if (code > 79 && code < 83) {
        backGroundImage.style.backgroundImage = "url('https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/odeur-pluie.jpg')";
        imageWeather = "./img/meteo-icons/rainy.png"
        return imageWeather
    }
    if (code > 84 && code < 87) {
        backGroundImage.style.backgroundImage = "url('https://resize-parismatch.lanmedia.fr/var/pm/public/media/image/2022/04/01/15/Les-images-de-la-France-sous-la-neige.jpg?VersionId=LWbX13lKu3RO.NdFuZoeL9I3seWEF2Pz')";
        imageWeather = "./img/meteo-icons/snow.png"
        return imageWeather
    }
    if (code === 95) {
        backGroundImage.style.backgroundImage = "url('https://img.fotocommunity.com/eclair-de-mon-balcon-cecf85e0-76b4-4f07-9a80-e86396b68b99.jpg?height=1080')";
        imageWeather = "./img/meteo-icons/thunder.png"
        return imageWeather
    }
    if (code > 95 && code < 100) {
        backGroundImage.style.backgroundImage = "url('https://img.fotocommunity.com/eclair-de-mon-balcon-cecf85e0-76b4-4f07-9a80-e86396b68b99.jpg?height=1080')";
        imageWeather = "./img/meteo-icons/thunder.png"
        return imageWeather
    }
}
