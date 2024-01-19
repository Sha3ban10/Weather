var search = document.querySelector('#search')
var day = document.querySelector('.day')
var date = document.querySelector('.date')
var city = document.querySelector('.card-title')
var degree = document.querySelector('.card-text h2')
var icon = document.querySelector('.icon')
var statu = document.querySelector('.status')
var forecastday = document.querySelector('.forecastday')
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


search.addEventListener("keyup", a => {
    weather(a.target.value)
});
async function weather(a) {
    var w = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=45ae35795d2b4ef6842125716240301&q=${a}&days=3`)
    if (w.ok && 400 != w.status) {
        let weatherdata = await w.json()
        displayCurrent(weatherdata.location, weatherdata.current)
        displayForeCast(weatherdata.forecast.forecastday)
    }
}

function displayCurrent(l, c) {
    var d = new Date()
    day.innerHTML = `${days[d.getDay()]}`
    date.innerHTML = `${d.getDate() + month[d.getMonth()]} `
    city.innerHTML = `${l.name} <span class="fs-6 text-info">${l.country}</span>`
    degree.innerHTML = `${c.temp_c}<sup>o</sup>C `;
    icon.innerHTML = `<img src="https:${c.condition.icon}" alt="" width="90">`
    statu.innerHTML = `${c.condition.text}`;
}
function displayForeCast(forecast) {
    var d = new Date();
    for (i = 1; i <= 2; i++) {
        document.querySelector(`.day-${i}`).innerHTML = `${days[d.getDay() + i]}`
        document.querySelector(`.icon-${i}`).innerHTML = ` <img src="https://${forecast[i].day.condition.icon}" alt="">`
        document.querySelector(`.Max-T-${i}`).innerHTML = ` ${forecast[i].day.maxtemp_c}<sup>o</sup>C`
        document.querySelector(`.Min-T-${i}`).innerHTML = ` ${forecast[i].day.mintemp_c}<sup>o</sup>C`
        document.querySelector(`.Condition-${i}`).innerHTML = ` ${forecast[i].day.condition.text}`
    }

}

weather("cairo")