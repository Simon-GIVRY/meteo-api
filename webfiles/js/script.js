const form = document.querySelector("form")
const ville = document.querySelector("input")
const forecastToday = document.querySelector("div.forecast p.temperature");

const d = new Date();
let hour = d.getHours();

// console.log(d);
// console.log(hour) 

form.addEventListener("submit", e=> {
    e.preventDefault()

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
            // console.log(response[0].coordinates);
            // console.log(response[0].coordinates.latitude);
            // console.log(response[0].coordinates.longitude);

            let latitude = response[0].coordinates.latitude
            let longitude = response[0].coordinates.longitude

            fetch(` https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`)
            .then( rep => rep.json())
            .then( rep => {
                const d = new Date();
                let hour = d.getHours();

                console.log(rep);

                // current temp
                console.log(rep.current_weather.temperature);
                // current time
                console.log(rep.current_weather.time);

                // max temp day
                console.log(rep.daily.temperature_2m_max[0]);

                //min temp day
                console.log(rep.daily.temperature_2m_min[0]);

                //hourly temp
                console.log(rep.hourly.temperature_2m[0]);

                // hourly time
                console.log(rep.hourly.time[0]);

                //hourly humidity
                console.log(rep.hourly.relativehumidity_2m[0]);



                let temp = rep.hourly.temperature_2m[hour]
                let time = rep.hourly.time[hour]

                // console.log(rep.hourly)
                // console.log(rep.hourly.temperature_2m[hour])
                // console.log(rep.hourly.time[hour])

                forecastToday.innerText = temp


            })
        })
        .catch(err => console.error(err));
})




