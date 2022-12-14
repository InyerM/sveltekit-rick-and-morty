export type character = {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: 'Human' | 'Alien' | 'unknown'
  type: string
  gender: 'Male' | 'Female' | 'Genderless' | 'unknown'
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
  favorite?: boolean
}

export type characters = character[]
export type characterId = number

export type charactersResponse = {
  info: {
    count: number
    pages: number
    next: string
    prev: string
  }
  results: characters
}

export type episode = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}