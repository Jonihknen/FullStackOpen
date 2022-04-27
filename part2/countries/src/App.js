import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";

const Filter = (props) => {
  return (
  <div>
      find countries <input value={props.value} onChange={props.onChange} />
  </div>
  )
}

const Country = ({country}) => {

  const [weather, setWeather] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (Object.keys(weather).length !== 0) {
  const c = country
  return (
    <div>
      <h1>{c.name.common}</h1>
      <div>capital {c.capital}</div>
      <div>area {c.area}</div>
      <h3>languages:</h3>
      <div>
      <ul>
        {Object.keys(c.languages).map((key, i) => (
          <li key={i}>{c.languages[key]}</li>
        ))}
      </ul>
      </div>
      <img src={c.flags.png} alt="flag"></img>
      <h2>Weather in {c.capital}</h2>
      <div>temperature {weather.main["temp"]} Celsius</div>
      <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weathericon"/>
      <div>wind {weather.wind["speed"]} m/s</div>
    </div>
  )
        }
}


const CountryList = ({displayCountries, setDisplayCountries}) => {
  if (Object.keys(displayCountries).length > 10) {
    return "Too many matches, specify another filter"
  }
  if (Object.keys(displayCountries).length === 1) {
    return (
      <Country country={displayCountries[0]}/>
    )
  }
  if (Object.keys(displayCountries).length < 10 && Object.keys(displayCountries).length > 1) {
  return (
    <div>
      <ul>
            {displayCountries.map(country =>
            <li key={country.name.common}> {country.name.common} 
            <button onClick={() => setDisplayCountries([country])}>show</button></li>
            )}
        </ul>
    </div>
    )
  }
}

function App() {

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const [countries, setCountries] = useState([])
  const [findString, setFindString] = useState('')
  const [displayCountries, setDisplayCountries] = useState([])


  const handleFindStringChange = (event) => {
    setFindString(event.target.value)
    const findCountries = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setDisplayCountries(findCountries)
  }

  return (
    <div className="App">
        <Filter value={findString} onChange={handleFindStringChange} />
        <CountryList displayCountries={displayCountries} setDisplayCountries={setDisplayCountries} />
    </div>
  );
}

export default App;
