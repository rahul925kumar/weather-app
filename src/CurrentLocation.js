import React, { useEffect, useState } from "react";
import apiKeys from "./ApiKey";
import Clock from "react-live-clock";
import Forcast from "./Forecast";
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";

const dateBuilder = (d) => {
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
};
const defaults = {
    color: "white",
    size: 112,
    animate: true,
};
const Weather = () => {

    const [data, setData] = useState({
        lat: undefined,
        lon: undefined,
        errorMessage: undefined,
        temperatureC: undefined,
        temperatureF: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: "CLEAR_DAY",
        sunrise: undefined,
        sunset: undefined,
        errorMsg: undefined,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            getPosition().then((position) => {
                getWeather(position.coords.latitude, position.coords.longitude);
            }).catch((err) => {
                getWeather(28.67, 77.22);
                alert("You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather.");
            });
        } else {
            alert("Geolocation not available");
        }
    });

    const timerID = setInterval(
        () => getWeather(this.state.lat, this.state.lon),
        600000
    );
    clearInterval(timerID);


    const tick = () => {
        getPosition()
            .then((position) => {
                getWeather(position.coords.latitude, position.coords.longitude)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const getPosition = (options) => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    };
    const getWeather = async (lat, lon) => {
        const api_call = await fetch(
            `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
        );
        const api_data = await api_call.json();

        setData({ ...data, ['lat']: lat });


        // setData({ ...data, ['lon']: lon });
        // setData({ ...data, ['city']: api_data.name });
        // setData({ ...data, ['temperatureC']: Math.round(api_data.main.temp) });
        // setData({ ...data, ['temperatureF']: Math.round(api_data.main.temp * 1.8 + 32) });
        // setData({ ...data, ['humidity']: api_data.main.humidity });
        // setData({ ...data, ['main']: api_data.weather[0].main });
        // setData({ ...data, ['country']: api_data.sys.country });
        // console.log("=======", data)
        // this.setState({
        //     lat: lat,
        //     lon: lon,
        //     city: data.name,
        //     temperatureC: Math.round(data.main.temp),
        //     temperatureF: Math.round(data.main.temp * 1.8 + 32),
        //     humidity: data.main.humidity,
        //     main: data.weather[0].main,
        //     country: data.sys.country,
        //     // sunrise: this.getTimeFromUnixTimeStamp(data.sys.sunrise),

        //     // sunset: this.getTimeFromUnixTimeStamp(data.sys.sunset),
        // });
        // switch (this.state.main) {
        //     case "Haze":
        //         this.setState({ icon: "CLEAR_DAY" });
        //         break;
        //     case "Clouds":
        //         this.setState({ icon: "CLOUDY" });
        //         break;
        //     case "Rain":
        //         this.setState({ icon: "RAIN" });
        //         break;
        //     case "Snow":
        //         this.setState({ icon: "SNOW" });
        //         break;
        //     case "Dust":
        //         this.setState({ icon: "WIND" });
        //         break;
        //     case "Drizzle":
        //         this.setState({ icon: "SLEET" });
        //         break;
        //     case "Fog":
        //         this.setState({ icon: "FOG" });
        //         break;
        //     case "Smoke":
        //         this.setState({ icon: "FOG" });
        //         break;
        //     case "Tornado":
        //         this.setState({ icon: "WIND" });
        //         break;
        //     default:
        //         this.setState({ icon: "CLEAR_DAY" });
        // }
    };

    // render() {
    //     if (this.state.temperatureC) {
            return (
                <>
                    <div className="city">
                        <div className="title">
                            <h2>this.state.city</h2>
                            <h3>this.state.country</h3>
                        </div>
                        <div className="mb-icon">
                            <ReactAnimatedWeather
                                icon={data.icon}
                                color={defaults.color}
                                size={defaults.size}
                                animate={defaults.animate}
                            />
                            <p>this.state.main</p>
                        </div>
                        <div className="date-time">
                            <div className="dmy">
                                <div id="txt"></div>
                                <div className="current-time">
                                    <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                                </div>
                                <div className="current-date">{dateBuilder(new Date())}</div>
                            </div>
                            <div className="temperature">
                                <p>
                                    {/* this.state.temperature C°<span>C</span> */}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Forcast icon={data.icon} weather={data.main} />
                </>
            );
        // } else {
            // return (
                
                // <>
                //     <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} />
                //     <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
                //         Detecting your location
                //     </h3>
                //     <h3 style={{ color: "white", marginTop: "10px" }}>
                //         Your current location wil be displayed on the App <br></br> & used
                //         for calculating Real time weather.
                //     </h3>
                // </>
            // );
    //     }
    // }
}

export default Weather;
