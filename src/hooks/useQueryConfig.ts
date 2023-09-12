import { useQueryParams } from '.'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

export default function useQueryConfig() {
  const queryParams = useQueryParams()
  const queryConfig = omitBy(
    {
      page: queryParams.page || '1',
      sort_field: queryParams.sort_field || 'modified.time',
      category: queryParams.category || '',
      country: queryParams.country || '',
      year: queryParams.year || '',
      keyword: queryParams.keyword
    },
    isUndefined
  )
  return queryConfig
}
export type paramOption = {
  page?: string
  sort_field?: string
  category?: string
  country?: string
  year?: string
  keyword?: string
}
