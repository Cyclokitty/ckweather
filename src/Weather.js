import React from 'react';
import axios from 'axios';
import './Weather.css';

class Weather extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      lat: 0,
      lon: 0,
      date : new Date()
    }
  }

  async componentDidMount() {
    const location = await axios.get('https://ipinfo.io/json');
    const coords = location.data.loc.split(',');
    this.setState({
      lat: parseFloat(coords[0]),
      lon: parseFloat(coords[1]),
    });
    const weather = await axios.get(`https://fcc-weather-api.glitch.me/api/current?lon=${this.state.lon}&lat=${this.state.lat}`);

    this.setState({
      weather: weather.data,
      name: weather.data.name.toUpperCase(),
      temp: Math.floor(weather.data.main.temp),
      icon: weather.data.weather[0].icon,
      descrp: weather.data.weather[0].description
    });
  }

  render() {
    var style = {
      color: '#795548'
    }

    if (this.state.temp >= 22) {
      style = {
        color: '#ff3d00'
      }
    } else if (this.state.temp > 5 && this.state.temp <= 21) {
      style = {
        color: '#69f0de'
      }
    } else if (this.state.temp <= 4) {
      style = {
        color: '#40c4ff'
      }
    }
    return (
      <div className='Weather'>
        <h4>{this.state.name}</h4>
        <img src={this.state.icon} alt='weather icon' width='50'/>
        <h1 style={style}>{this.state.temp}&deg;C</h1>
        <h2>{this.state.descrp}</h2>
        <div className='OwnerInfo'>
          <p>made with love by <a href='https://cyclokitty.github.io' target='_blank'><span style={style}>Laura Veee</span></a> &copy; {this.state.date.getFullYear()}</p>
          <p>source code for this project can be found <a href='https://github.com/Cyclokitty/ckweather' target='_blank'><span style={style}>here</span></a></p>
        </div>
      </div>
    )
  }
}



export default Weather;
