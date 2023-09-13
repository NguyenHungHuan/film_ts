import { data, film, list, option } from 'src/types'
import PATH from '../utils/path'
import { axiosClients } from './axiosClients'

export type paramOption = {
  page?: string
  sort_field?: string
  category?: string
  country?: string
  year?: string
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
  },
  getSearchFilm(params: { keyword: string; page: string }) {
    const url = PATH.search
    return axiosClients.get<data<list>>(url, { params })
  },
  getFilm(slug: string) {
    const url = `${PATH.film}/${slug}`
    return axiosClients.get<data<film>>(url)
  }
}
export default filmApis
