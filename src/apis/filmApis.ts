import { data, list, option } from 'src/types'
import PATH from '../utils/path'
import { axiosClients } from './axiosClients'

export type paramOption = {
  page?: string
  sort_field?: string
  category?: string
  country?: string
  year?: string
  keyword?: string
}

const filmApis = {
  getGenres() {
    const url = PATH.genres
    return axiosClients.get<data<option>>(url)
  },
  getCountry() {
    const url = PATH.country
    return axiosClients.get<data<option>>(url)
  },
  getListFilm(type: string, params?: paramOption) {
    const url = `${PATH.list}/${type}`
    return axiosClients.get<data<list>>(url, { params })
  }
}
export default filmApis
