import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import Weathercard from '../components/weathercard';

import moment from 'moment';
import 'moment/locale/de'  
moment.locale('de')

const inter = Inter({ subsets: ['latin'] })



export async function getServerSideProps() {
  const res = await fetch("http://api.openweathermap.org/data/2.5/forecast?lat=47.069833054&lon=15.437831582&appid=4201d719335a7872d1697d14ea0bd133&units=metric&lang=de")
  const data = await res.json();

  const currentweatherres = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=47.069833054&lon=15.437831582&appid=4201d719335a7872d1697d14ea0bd133&units=metric&lang=de");
  const currentweatherdata = await currentweatherres.json();

  return {
    props: {
      forecast: data.list,
      //city: data.city,
      currentweather: currentweatherdata
    }
  }
}





export default function Home({ forecast, currentweather}) {
  /*const [todos, setTodos] = useState([]);

  useEffect(() => {
import { useEffect, useState } from 'react';


const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps() {
  const res = await fetch("http://api.openweathermap.org/data/2.5/forecast?lat=47.069833054&lon=15.437831582&appid=4201d719335a7872d1697d14ea0bd133&units=metric")
  const data = await res.json();

  return {
    props: {
      todos: data.list,
      city: data.city
    }
  }
}





export default function Home({ todos, city}) {
  /*const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await res.json();
      setTodos(data);
    }

    fetchTodos();
  }, []);
*/

  return (
   

    <div>

      <Weathercard weathercarddata={currentweather}/>

      {currentweather?.name}
      <p>
        {moment(currentweather.dt*1000).format("dddd Do MMMM YYYY")}
      </p>
      <img src={`https://openweathermap.org/img/wn/${currentweather.weather[0].icon}@2x.png`}></img>
      <h1>
        {currentweather.main.temp_max}°C
      </h1>
      <h2>
        {currentweather.main.temp_min}°C
      </h2>
      <p>
        {currentweather.main.feels_like}°C
      </p>
        {currentweather.weather[0].description}

      {forecast?.length === 0 ? (
        <div>Loading...</div>
      ): (
        forecast?.map((todo) => (
          <div key={todo.dt}>
            <p>
              {todo.dt_txt}
            </p>
            <img src={`https://openweathermap.org/img/wn/${todo.weather[0].icon}@2x.png`}></img>
            <p>
            {todo.main.temp_max}°C
            </p>
            <p>
            {todo.main.temp_min}°C
            </p>
            <p>
            {todo.main.feels_like}°C
            </p>
            {todo.weather[0].description}



          </div>
        ))
      )}
      

      {forecast?.length === 0 ? (
        <div>Loading...</div>
      ): (
        forecast?.map((todo) => (
          <div key={todo.dt}>

            <Weathercard weathercarddata={todo}/>
          </div>
        ))
      )}

    </div>


  )
}
