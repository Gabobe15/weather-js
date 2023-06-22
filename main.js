const apiKey = "7d5fb9f6db87ecdd173ec6cac38f6e5d";
    // we ommit city name so that we can add throught the input field 
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input")
    const searchBtn = document.querySelector(".search button")
    const weatherIcon = document.querySelector(".weather-icon")
    const condition = document.querySelector(".condition")
    const country = document.querySelector(".country")
    

    

    async function checkWeather(city){
        let response = await fetch(apiUrl + city + `&appid=${apiKey}`);
     
        if(response.status == 404){
            document.querySelector(".error").style.display = "block"
            document.querySelector(".weather").style.display = "none"
        }
        else {
                // console.log(data);
                let data = await response.json();
                // putting images using if statement 
                document.querySelector(".error").style.display = "none"

                if(data.weather[0].main == "Clouds"){
                    weatherIcon.src = "../images/clouds.png"
                }
                else if(data.weather[0].main == "Clear"){
                    weatherIcon.src = "../images/clear.png"
                }
                else if(data.weather[0].main == "Drizzle"){
                    weatherIcon.src = "../images/drizzle.png"
                }
                else if(data.weather[0].main == "Mist"){
                    weatherIcon.src = "../images/mist.png"
                }
                else if(data.weather[0].main == "Rain"){
                    weatherIcon.src = "../images/rain.png"
                }
                else if(data.weather[0].main == "Snow"){
                    weatherIcon.src = "../images/snow.png"
                }
        
                // get country name from country code in javascript
                let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
                country.innerHTML = regionNames.of(data.sys.country)


                condition.innerHTML = data.weather[0].main;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; 
                document.querySelector(".city").innerHTML = data.name; 
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"

                // css style using js 
                document.querySelector(".weather").style.display = "block"
        }


    }

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value)
    })
    

    
  