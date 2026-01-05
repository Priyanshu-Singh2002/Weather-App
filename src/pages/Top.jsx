import { useState } from 'react'
import MyNavbar from '../components/MyNavbar'
import WeatherCard from '../components/WeatherCard'
import SearchBar from '../components/SearchBar'
import ForecastCard from '../components/ForecastCard'


const Top = () => {
  const [CW, setCW] = useState(null) // CW => City Weather
  const [CF, setCF] = useState([]) // CF => City Forecast
  const [theme, setTableTheme] = useState("style_TW");

  const onSearch = async (city) => {
    console.log("Searching weather for:", city);
    const apiKey = import.meta.env.VITE_WEATHER_KEY;
    console.log("API KEY:", apiKey);
    // City Weather
    let res1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    let Data1 = await res1.json();
    console.log(Data1);
    setCW(Data1);
    // City Forecast
    let res2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    let Data2 = await res2.json();
    console.log("City Forecast : ")
    console.log(Data2.list);
    setCF(Data2.list);
  }

  return (
    <div className='theme app-bg' style={{height:"99vh"}}>
      <MyNavbar />
      <SearchBar onSearch={onSearch} setTheme={setTableTheme} />
      <WeatherCard CW={CW} theme={theme} />
      <ForecastCard CF={CF} theme={theme} setTheme={setTableTheme} />
    </div>
  )
}

export default Top