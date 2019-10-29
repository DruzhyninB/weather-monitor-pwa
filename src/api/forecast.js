import axios from "axios";
import {settings, URL} from 'config';

export function getForecast(id) {
    return axios.get(URL.forecast, {
        params: {
            id: id,
            appid: settings.openWeatherKey,
            units: 'metric'
        }
    })
}