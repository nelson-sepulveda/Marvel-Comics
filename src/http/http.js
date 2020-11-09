import axios from 'axios'

const configCreate = {
  baseURL: 'https://gateway.marvel.com:443/v1/public/',
  headers: {
    'accept': 'application/json'
  },
  params: {
    ts: 1,
    apikey: '0953bd4efaeb806cd4731f485d224a89',
    hash: '80681e3d354d54a05f71787ff07ec443'
  }
}

const configService = axios.create(configCreate)

export default configService