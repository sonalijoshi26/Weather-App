import searchbu from "./search.png"
import clean from "./clear.png"
import cloud from "./cloud.png"
import drizzle from "./drizzle.png"
import rain from "./rain.png"
import snow from "./snow.png"
import wind from "./wind.png"
import humidity from"./humidity.png"
import "./Main.css"
import { useEffect, useRef, useState } from "react"

const Weather1 =()=>{
    const inputRef=useRef()

       const[weatherData,setWeatherData]=useState(false);
       const allIcons={
        "01d":clean,
        "01n":clean,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow,
       }
    
    const search=async(city)=>{
        try{
            const url= `https://api.openweathermap.org/data/2.5/weather?q=${city }&units=metric&appid=${`f514c18f601513d4e0771aade58e0586`
}` ;
            const response= await fetch(url);
             const data=await response.json();
             console.log(data);
             const icon=allIcons[data.weather[0].icon] || clean;

             setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location: data.name,
                icon: icon
             })
        }catch(error){

        }

    }
    useEffect(()=>{
        search("New York");
    },[])
    return(
    <div className="weather">
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder="Search" className="search  "/>
            <img src={searchbu} alt="search but" onClick={()=>search(inputRef.current.value)} />
        </div>
             <img  className="weather-icon"src={weatherData.icon} alt="clean pic" />   
        <p className="temperature">{weatherData.temperature}°C</p>
        <p className="location">{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity} alt="" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind} alt="" />
                <div>
                    <p>{weatherData.windSpeed}km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
 </div>
    
)}
export default Weather1