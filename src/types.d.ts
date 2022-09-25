export type episode = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export type episodes = episode[]
export type episodeId = number

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
}

export type characters = character[]
export type characterId = number

export type location = {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export type locations = location[]
export type locationId = number