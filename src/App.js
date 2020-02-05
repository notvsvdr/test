import React from 'react';
import { connect } from 'react-redux';
import { getWeatherAction } from './actions';
import moment from 'moment';

class App extends React.Component {

    componentDidMount () {
        this.props.loadWeather();
        if ('geolocation' in navigator) {
            const options = { enableHighAccuracy: true, maximumAge: 100, timeout: 60000 };
            var watchID = navigator.geolocation.watchPosition((position) => {alert(`${position.coords.latitude}`)}, () => {alert('error')}, options );
            var timeout = setTimeout( function() { navigator.geolocation.clearWatch( watchID ); }, 5000 );
        }
    }

    kelvToCels = (kelv) => Math.floor(kelv - 273.15);
    
    render () {
        return (
            <div className='app'>
                <ul>
                    {
                        this.props.weather && this.props.weather.list.map(item => {
                            const {dt, main: { temp, humidity }} = item;
                            return (
                                <li key={item.dt}>
                                    <div className='time'>time: {moment.unix(dt).format('HH:MM - DD/MM/YYYY')}</div> {/* there is a gap (2 mins) */}
                                    <div className='temp'>temperature: {this.kelvToCels(temp)}</div>
                                    <div className='humidity'>humidity: {humidity}%</div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadWeather: () => dispatch(getWeatherAction())
});

const mapStateToProps = (state) => ({
    weather: state.weather
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
