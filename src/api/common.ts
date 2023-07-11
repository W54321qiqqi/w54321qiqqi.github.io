import request from '/@/utils/request'
export enum Api {
  GET_WEATHER_INFO = 'https://devapi.qweather.com/v7/weather/now',
}

export const getWeatherInfo = (data?: any) =>
  request.get(Api.GET_WEATHER_INFO, data, { loading: false })
