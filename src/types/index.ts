export interface data<Data> {
  status: string
  message: string
  data: Data
}

export type option = {
  items: { name: string; slug: string; _id: string }[]
}

export type items = {
  modified: {
    time: string
  }
  _id: string
  name: string
  slug: string
  origin_name: string
  type: string
  thumb_url: string
  poster_url: string
  sub_docquyen: boolean
  chieurap: boolean
  time: string
  episode_current: string
  quality: string
  lang: string
  year: number
  category: {
    id: string
    name: string
    slug: string
  }[]
  country: {
    id: string
    name: string
    slug: string
  }[]
}

export type list = {
  seoOnPage: {
    og_type: string
    titleHead: string
    descriptionHead: string
    og_image: [string]
    og_url: string
  }
  breadCrumb: {
    name: string
    slug: string
    isCurrent: boolean
    position: number
  }[]
  titlePage: string
  items: items[]
  params: {
    type_slug: string
    filterCategory: string[]
    filterCountry: string[]
    filterYear: string
    filterType: string
    sortField: string
    sortType: string
    pagination: {
      totalItems: number
      totalItemsPerPage: number
      currentPage: number
      pageRanges: number
    }
  }
}

export type film = {
  seoOnPage: {
    og_type: string
    titleHead: string
    seoSchema: {
      name: string
      dateModified: string
      dateCreated: string
      url: string
      datePublished: string
      image: string
      director: string
    }
    descriptionHead: string
    og_image: string[]
    updated_time: number
    og_url: string
  }
  breadCrumb: {
    name: string
    slug: string
    isCurrent: boolean
    position: number
  }[]
  params: {
    slug: string
  }
  item: {
    created: {
      time: string
    }
    modified: {
      time: string
    }
    _id: string
    name: string
    origin_name: string
    content: string
    type: string
    status: string
    thumb_url: string
    poster_url: string
    is_copyright: boolean
    sub_docquyen: boolean
    chieurap: boolean
    trailer_url: string
    time: string
    episode_current: string
    episode_total: string
    quality: string
    lang: string
    notify: string
    showtimes: string
    slug: string
    year: number
    view: number
    actor: string[]
    director: string[]
    category: {
      id: string
      name: string
      slug: string
    }[]
    country: {
      id: string
      name: string
      slug: string
    }[]
    episodes: {
      server_name: string
      server_data: {
        name: string
        slug: string
        filename: string
        link_embed: string
        link_m3u8: string
      }[]
    }[]
  }
}
