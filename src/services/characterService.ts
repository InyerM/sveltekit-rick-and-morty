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

export const getCharacters = async (page: number) => {
  let error, characters
  try {
    const { data } = await axios.get(`${baseUrl}/character?page=${page}`)
    characters = data.results
  } catch (err: any) {
    error = err.message || 'Something went wrong'
  } 

  return { 
    characters, 
    error, 
  }
}