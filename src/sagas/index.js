import { put, takeLatest, all } from 'redux-saga/effects';

const APP_ID = '4ce4f04a7ae3fa4edde201775f5eb98d';
const LVIV_ID = '702550';

function* fetchWeather () {
    const json = yield fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${LVIV_ID}&appid=${APP_ID}`)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            return json;
        });

    yield put({ type: 'WEATHER_RECEIVED', json: json });
}

function* weatherWatcher () {
    yield takeLatest('GET_WEATHER', fetchWeather);
}

export default function* rootSaga() {
    yield all([
        weatherWatcher(),
    ]);
}
