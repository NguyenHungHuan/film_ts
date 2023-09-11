import { useQueryParams } from '.'

export default function useQueryConfig() {
  const queryParams = useQueryParams()
  const queryConfig = {
    page: queryParams.page || '1',
    sort_field: queryParams.sort_field || 'modified.time',
    category: queryParams.category || '',
    country: queryParams.country || '',
    year: queryParams.year || '',
    keyword: queryParams.keyword
  }
  return queryConfig
}
