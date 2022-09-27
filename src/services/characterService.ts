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
  let error, character
  try {
    const { data } = await axios.get(`${baseUrl}/character/${id}`)
    character = data
  } catch (err: any) {
    error = err.message || 'Something went wrong'
  } 

  return { 
    character, 
    error, 
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
