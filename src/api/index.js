import axios from 'axios'

export function getAxios(data) {
  let url = 'api';
  return axios.get(url+data)
}


export function getMore(data) {
  let url = 'https://zhihu-daily.leanapp.cn/api/v1/contents/';
  return axios.get(url+data)
}
