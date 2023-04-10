import Weathercard from '../components/weathercard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import moment from 'moment';
import 'moment/locale/de'
moment.locale('de')


//coordinates of Graz
const lat = "47.069833054";
const lon = "15.437831582";

//Openweather API token
const apitoken = "4201d719335a7872d1697d14ea0bd133";


//fetching data
export async function getServerSideProps() {
  const forecastres = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apitoken}&units=metric&lang=de`);
  const forecastdata = await forecastres.json();

  const currentweatherres = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apitoken}&units=metric&lang=de`);
  const currentweatherdata = await currentweatherres.json();

  return {
    props: {
      forecast: forecastdata.list,
      currentweather: currentweatherdata
    }
  }
}


//SwiperSlide containing the Weathercards
export default function Home({ forecast, currentweather }) {

  return (

    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide><Weathercard weathercarddata={currentweather} /></SwiperSlide>
        {forecast?.length === 0 ? (
          <div>Loading...</div>
        ) : (
          forecast?.map((data) => (
            <div key={data.dt}>
              <SwiperSlide>
                <Weathercard weathercarddata={data} />
              </SwiperSlide>
            </div>
          ))
        )}
      </Swiper>
    </div>

  )
}
