import moment from 'moment';
import 'moment/locale/de'  // without this line it didn't work
moment.locale('de')


function Weathercard({ weathercarddata }) {
    return (
        <div className="card">
            <h3>
                {weathercarddata.name ? (<>{weathercarddata.name}</>) : (<>Vorschau</>)}
            </h3>
            <p>
                {weathercarddata.dt_txt ? (moment(weathercarddata.dt * 1000).calendar()) : (moment(weathercarddata.dt * 1000).format("dddd Do MMMM YYYY"))}
            </p>
            <div className="row">
                <div className="column">
                    <img src={`/icons/${weathercarddata.weather[0].icon}.svg`} alt="Weather SVG" />
                </div>
                <div className="column">
                    <h1>
                        {weathercarddata.main.temp_max}°C
                    </h1>
                    <h2>
                        {weathercarddata.main.temp_min}°C
                    </h2>
                    <p>
                        {weathercarddata.weather[0].description}
                    </p>
                    <p>
                        Gefühlte Temperatur: {weathercarddata.main.feels_like}°C
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Weathercard