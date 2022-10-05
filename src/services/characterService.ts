/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { baseUrl } from '../config'

export const getRecentCharacters = async () => {
  let error, characters
  try {
    const { data } = await axios.get(`${baseUrl}/character?page=42`)
    characters = data.results?.slice(0, 10)
  } catch (err: any) {
    error = err.message || 'Something went wrong'
  } 

  return { 
    characters, 
    error, 
  }
}

export const getCharacter = async (id: number) => {
  let error, character, info, status, episodes
  try {
    const response = await axios.get(`${baseUrl}/character/${id}`)
    console.log("🚀 ~ file: characterService.ts ~ line 24 ~ getCharacter ~ response", response)
    const { data } = response
    character = data
    info = data.info
    status = data.status

    const mainEpisodes = character?.episode?.sort(() => Math.random() - 0.5).slice(0, 3).map((url: string) => {
      return url.toString().split('/').pop()
    })
    console.log("🚀 ~ file: characterService.ts ~ line 33 ~ mainEpisodes ~ mainEpisodes", mainEpisodes)
    episodes = await (await getEpisodes(mainEpisodes)).episodes
  } catch (err: any) {
    error = err.message || 'Something went wrong'
    status = err.status
  } 

  return { 
    character, 
    error, 
    info,
    status,
    episodes,
  }
}

export const searchCharacters = async (page: number, query: string) => {
  let error, characters, info, status = 0
  try {
    const response = await axios.get(`${baseUrl}/character/?name=${query}&page=${page}`)
    const { data } = response
    info = data.info
    characters = data.results
    status = response.status
  } catch (err: any) {
    error = err.message || 'Something went wrong'
    status = err.response?.status || 500
  } 

  return { 
    info,
    characters, 
    error, 
    status,
  }
}

export const getEpisodes = async (episodesUrl: number[]) => {
  let error, episodes, info, status
  try {
    const response = await axios.get(`${baseUrl}/episode/${episodesUrl.join(',')}`)
    const { data } = response
    episodes = data
    info = data.info
    status = data.status
  } catch (err: any) {
    error = err.message || 'Something went wrong'
    status = err.status
  } 

  return { 
    episodes, 
    error, 
    info,
    status
  }
}
