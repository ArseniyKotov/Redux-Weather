import React, { Component } from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/googleMap';


class WeatherList extends Component {
  constructor(props) {
    super(props);
  }


  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = cityData.list.map( (weather) => weather.main.temp );
    const pressures = cityData.list.map( (weather) => weather.main.pressure );
    const humidities = cityData.list.map( (weather) => weather.main.humidity );
    const { lon, lat } = cityData.city.coord;


    return (
      <tr key={name}>
        <td><GoogleMap lon={lon} lat={lat} /></td>
        <td><Chart color='orange' data={temps} units="K" /></td>
        <td><Chart color='green' data={pressures} units="hPA" /></td>
        <td><Chart color='black' data={humidities} units="%"/></td>
      </tr>
    )
  }
  
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temprature (K)</th>
            <th>Pressure (hPA)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map( this.renderWeather )}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);