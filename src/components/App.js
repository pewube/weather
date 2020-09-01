import React, { Component } from "react";
import apiKey from "./config";
import "../scss/App.scss";
import Form from "./Form";
import ResultCurrent from "./ResultCurrent";
import ResultDaily from "./ResultDaily";
import ResultHourly from "./ResultHourly";
import Footer from "./Footer";

class App extends Component {
  state = {
    value: "",
    city: "",
    country: "",
    date: "",
    sunrise: "",
    sunset: "",
    temp: "",
    tempFeelsLike: "",
    description: "",
    iconWeather: "start",
    pressure: "",
    windSpeed: "",
    windDeg: "",
    windGust: "",
    humidity: "",
    clouds: "",
    visibility: "",
    latitude: "",
    longitude: "",
    err: "",
    errInfo: "",
    daily: [],
    hourly: [],
  };

  handleFormInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const apiCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${apiKey}&units=metric&lang=pl`;

    if (this.state.value.length > 1) {
      fetch(apiCurrent)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error("apiCurrent error");
        })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            date: data.dt * 1000,
            sunrise: data.sys.sunrise * 1000,
            sunset: data.sys.sunset * 1000,
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp.toFixed(),
            tempFeelsLike: data.main.feels_like.toFixed(),
            description: data.weather[0].description,
            iconWeather: data.weather[0].icon,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed,
            windDeg: data.wind.deg,
            windGust: data.wind.gust,
            humidity: data.main.humidity,
            clouds: data.clouds.all,
            visibility: data.visibility,
            latitude: data.coord.lat,
            longitude: data.coord.lon,
            value: "",
            err: false,
            errInfo: "",
          });

          const apiForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.latitude}&lon=${this.state.longitude}&%20exclude=hourly&appid=${apiKey}&units=metric&lang=pl`;

          return fetch(apiForecast);
        })
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error("apiForecast error");
        })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            daily: data.daily,
            hourly: data.hourly,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            city: "",
            err: true,
            errInfo: `Brak takiej miejscowości w bazie danych.`,
          });
        });
    } else {
      this.setState({
        err: true,
        value: "",
        errInfo: "Nazwa miejscowości musi być dłuższa",
      });
    }
  };

  windDirection = (windDeg) => {
    let direction = "";

    const directions = {
      n1: [0, 11.25],
      nne: [11.26, 33.75],
      ne: [33.76, 56.25],
      ene: [56.26, 78.75],
      e: [78.76, 101.25],
      ese: [101.26, 123.75],
      se: [123.76, 146.25],
      sse: [146.26, 168.75],
      s: [168.76, 191.25],
      ssw: [191.26, 213.75],
      sw: [213.76, 236.25],
      wsw: [236.26, 258.75],
      w: [258.76, 281.25],
      wnw: [281.26, 303.75],
      nw: [303.76, 326.25],
      nnw: [326.26, 348.75],
      n2: [348.76, 360],
    };

    for (const [key, value] of Object.entries(directions)) {
      if (windDeg >= value[0] && windDeg <= value[1]) {
        direction = key;
        return direction === "n1" || direction === "n2"
          ? "N"
          : direction.toUpperCase();
      }
    }
  };

  weekDay = (dayNumber) => {
    switch (dayNumber) {
      case 1:
        return "poniedziałek";
      case 2:
        return "wtorek";
      case 3:
        return "środa";
      case 4:
        return "czwartek";
      case 5:
        return "piątek";
      case 6:
        return "sobota";
      case 0:
        return "niedziela";
      default:
        return null;
    }
  };

  render() {
    const bgSrcValue = `/assets/img/bg-${this.state.iconWeather}.jpg`;

    if ((!this.state.city && !this.state.err) || this.state.err) {
      return (
        <div
          className="app"
          style={{
            backgroundImage: `url(${bgSrcValue})`,
            backgroungRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          }}>
          <div className="app-start-container">
            <header className="app-start__header">
              <ResultCurrent
                state={this.state}
                windDirection={this.windDirection}
              />
            </header>
            <main className="app-start__main">
              <Form
                value={this.state.value}
                onChange={this.handleFormInput}
                onSubmit={this.handleSubmit}
              />
            </main>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="app"
          style={{
            backgroundImage: `url(${bgSrcValue})`,
            backgroungRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          }}>
          <div className="app-container">
            <header className="app__header">
              <Form
                value={this.state.value}
                onChange={this.handleFormInput}
                onSubmit={this.handleSubmit}
              />
            </header>
            <main className="app__main">
              <ResultCurrent
                state={this.state}
                windDirection={this.windDirection}
              />
              <ResultDaily
                state={this.state}
                windDirection={this.windDirection}
                weekDay={this.weekDay}
              />
              <ResultHourly
                state={this.state}
                windDirection={this.windDirection}
                weekDay={this.weekDay}
              />
            </main>
            <footer className="app__footer">
              <Footer />
            </footer>
          </div>
        </div>
      );
    }
  }
}

export default App;
